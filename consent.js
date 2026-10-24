/* DECODE consent manager — non-essential Meta Pixel is strictly opt-in. */
(function () {
  'use strict';

  const PIXEL_ID = '1432853895037254';
  const KEY = 'decode_tracking_consent_v1';
  const VALID_FOR = 180 * 24 * 60 * 60 * 1000;
  let choice = 'unset';
  let pixelStarted = false;

  function readChoice() {
    try {
      const value = JSON.parse(window.localStorage.getItem(KEY) || 'null');
      const age = Date.now() - Date.parse(value && value.updatedAt);
      if ((value && (value.status === 'accepted' || value.status === 'rejected')) &&
          Number.isFinite(age) && age >= 0 && age < VALID_FOR) {
        return value.status;
      }
    } catch (_) { /* localStorage may be unavailable; default to no tracking */ }
    return 'unset';
  }

  function storeChoice(value) {
    try {
      window.localStorage.setItem(KEY, JSON.stringify({
        status: value,
        updatedAt: new Date().toISOString(),
        version: 1
      }));
    } catch (_) { /* The choice still applies for this page view. */ }
  }

  function removeMetaCookies() {
    // Best-effort first-party cookie cleanup. It does not delete data already held by Meta.
    ['_fbp', '_fbc'].forEach(function (name) {
      const domains = ['', window.location.hostname, '.' + window.location.hostname, 'decode.com.tw', '.decode.com.tw'];
      const paths = ['/', window.location.pathname];
      domains.forEach(function (domain) {
        paths.forEach(function (path) {
          document.cookie = name + '=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=' + path +
            (domain ? '; domain=' + domain : '') + '; SameSite=Lax';
        });
      });
    });
  }

  function canTrack() {
    return choice === 'accepted';
  }

  function startPixel() {
    if (!canTrack() || pixelStarted) return;
    // No Facebook script, pixel initialization, or PageView before explicit consent.
    if (typeof window.fbq === 'function') {
      // Refuse to initialize a second Pixel if an external integration already did so.
      return;
    }
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq.disablePushState = true; // Avoid duplicate PageView on same-page anchors.
    window.fbq('set', 'autoConfig', false, PIXEL_ID); // Avoid automatic SubscribedButtonClick.
    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
    pixelStarted = true;
  }

  function sendEvent(method, name, params) {
    if (!canTrack() || !pixelStarted || typeof window.fbq !== 'function') return;
    if (params) {
      window.fbq(method, name, params);
    } else {
      window.fbq(method, name);
    }
  }

  function showBanner(show) {
    const banner = document.getElementById('decode-consent-banner');
    if (banner) banner.hidden = !show;
  }

  function setChoice(value) {
    if (value !== 'accepted' && value !== 'rejected') return;
    const wasTracking = pixelStarted || typeof window.fbq === 'function';
    choice = value;
    storeChoice(value);
    if (value === 'accepted') {
      startPixel();
      showBanner(false);
    } else {
      removeMetaCookies();
      if (wasTracking) {
        // Fully stop the third-party SDK on this page after withdrawal of consent.
        window.location.reload();
        return;
      }
      showBanner(false);
    }
  }

  function onClick(event) {
    const target = event.target instanceof Element ? event.target : event.target.parentElement;
    if (!target) return;

    if (target.closest('[data-consent-accept]')) {
      setChoice('accepted');
      return;
    }
    if (target.closest('[data-consent-reject]')) {
      setChoice('rejected');
      return;
    }
    if (target.closest('[data-cookie-settings]')) {
      event.preventDefault();
      showBanner(true);
      document.querySelector('#decode-consent-banner [data-consent-reject]')?.focus();
      return;
    }

    const link = target.closest('a[href]');
    if (!link || !canTrack()) return;

    if (link.getAttribute('href') === '#contact') {
      sendEvent('trackCustom', 'ContactSectionClick');
    } else if (link.getAttribute('href')?.toLowerCase().startsWith('mailto:contact@decode.com.tw')) {
      sendEvent('track', 'Contact', {contact_method: 'email'});
    } else if (link.href === 'https://www.instagram.com/decode.tw/' ||
               link.href === 'https://www.instagram.com/decode.tw') {
      sendEvent('trackCustom', 'InstagramClick', {
        destination: 'instagram',
        link_location: link.closest('.contact-actions') ? 'contact_button' : 'contact_details'
      });
    }
  }

  choice = readChoice();
  if (choice !== 'accepted') removeMetaCookies();

  function init() {
    document.addEventListener('click', onClick);
    showBanner(choice === 'unset');
    if (choice === 'accepted') startPixel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, {once: true});
  } else {
    init();
  }

  window.DECODE_CONSENT = {
    canTrack: canTrack,
    getChoice: function () { return choice; },
    openSettings: function () { showBanner(true); }
  };
})();
