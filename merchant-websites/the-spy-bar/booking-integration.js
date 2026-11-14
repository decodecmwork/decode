/** 皇城司訂位系統 v2.1：公開頁預設為無資料寫入的展示流程；店家可在 ?booking=live 啟用受權限保護的 Apps Script 嵌入驗收。 */
(function () {
  'use strict';
  const GAS_EXEC_URL = 'https://script.google.com/macros/s/AKfycbzwXFsLS7raSwlCqx3tCicb0Rj7Bg9jK04cDR3so8BP6fuVmUyRuyz_MS1Q5EGfDgfpxg/exec';
  // 店家未核准實際接待容量、通知信箱及開放權限前，不可將此值改成 true。
  const PUBLIC_BOOKING_ENABLED = false;
  const OWNER_PREVIEW = new URLSearchParams(window.location.search).get('booking') === 'live';
  if (!PUBLIC_BOOKING_ENABLED && !OWNER_PREVIEW) return;
  if (!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(GAS_EXEC_URL)) return;

  function mount(){
    const section=document.getElementById('booking');
    const oldForm=section && section.querySelector('main');
    if(!section || !oldForm)return;

    const banner=document.getElementById('systemBanner');
    if(banner)banner.style.display='none';
    oldForm.style.display='none';

    const wrapper=document.createElement('div');
    wrapper.style.cssText='width:100%;max-width:960px;margin:0 auto;padding:0 16px 25px;';
    const note=document.createElement('p');
    note.style.cssText='color:#c5ac7b;font-size:12px;line-height:1.6;text-align:center;padding:12px;';
    note.textContent=OWNER_PREVIEW && !PUBLIC_BOOKING_ENABLED
      ? '店家授權驗收模式：目前僅開放原 Apps Script 授權帳號操作；非正式對外接單。'
      : '訂位資料將由皇城司管理，送出後須經店家確認。';
    const frame=document.createElement('iframe');
    frame.id='spyBookingApp';
    frame.title='皇城司餐酒館 Google Apps Script 線上訂位表單';
    frame.src=GAS_EXEC_URL;
    frame.loading='eager';
    frame.setAttribute('referrerpolicy','strict-origin-when-cross-origin');
    frame.style.cssText='display:block;width:100%;height:1080px;border:0;background:#0b0b0e;border-radius:16px;';

    const fallback=document.createElement('p');
    fallback.style.cssText='color:#a99a81;font-size:12px;text-align:center;margin:16px 0 0;line-height:1.7;';
    fallback.append('如果因 Google 登入限制而無法顯示嵌入頁面，請使用 ');
    const link=document.createElement('a');
    link.href=GAS_EXEC_URL;
    link.target='_blank';
    link.rel='noopener noreferrer';
    link.textContent='開啟經授權的訂位測試頁';
    link.style.cssText='color:#d4af37;text-decoration:underline;';
    fallback.appendChild(link);
    wrapper.append(note,frame,fallback);
    section.appendChild(wrapper);
    window.addEventListener('message',event=>{
      if (!/^https:\/\/(?:[a-z0-9-]+\.)*(?:googleusercontent\.com|google\.com)$/.test(event.origin)) return;
      if (!event.data || event.data.type!=='spy-booking-height') return;
      const height=Number(event.data.height);
      if (Number.isFinite(height) && height>=400 && height<=5000) frame.style.height=(height+30)+'px';
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);
  else mount();
})();