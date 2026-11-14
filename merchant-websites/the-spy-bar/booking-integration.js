/** 皇城司正式訂位整合設定：店家 Apps Script /exec 網址取得前請保持空白。 */
(function () {
  'use strict';
  const GAS_EXEC_URL = ''; // 請填入正式 https://script.google.com/macros/s/.../exec
  if (!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec(?:\?.*)?$/.test(GAS_EXEC_URL)) return;
  function mount() {
    const section=document.getElementById('booking');
    const oldForm=section && section.querySelector('main');
    if (!oldForm) return;
    oldForm.style.display='none';
    const banner=document.getElementById('systemBanner');
    if(banner)banner.style.display='none';
    const frame=document.createElement('iframe');
    frame.id='spyBookingApp';
    frame.title='皇城司餐酒館正式線上訂位表單';
    frame.src=GAS_EXEC_URL;
    frame.loading='lazy';
    frame.setAttribute('referrerpolicy','strict-origin-when-cross-origin');
    frame.style.cssText='display:block;width:min(100%,850px);height:1450px;border:0;margin:0 auto;background:#0b0b0e;';
    section.appendChild(frame);
    window.addEventListener('message',event=>{
      if (!/^https:\/\/(?:[a-z0-9-]+\.)*(?:googleusercontent\.com|google\.com)$/.test(event.origin)) return;
      if (!event.data || event.data.type!=='spy-booking-height') return;
      const height=Number(event.data.height);
      if (Number.isFinite(height) && height>=400 && height<=5000) frame.style.height=(height+35)+'px';
    });
  }
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount);
  else mount();
})();