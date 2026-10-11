(() => {
  const button=document.getElementById('choiLogoZoom');if(!button)return;
  const dialog=document.createElement('dialog');dialog.id='choiLogoDialog';dialog.setAttribute('aria-labelledby','choiLogoZoomTitle');
  dialog.innerHTML='<div class="logo-zoom-head"><h2 id="choiLogoZoomTitle">초이 로고</h2><button type="button">닫기</button></div><img src="assets/logos/choi-wordmark-v4.png" alt="초이: 초록색 붓글씨와 펜촉, 금색 합격 체크"><p>펜촉은 필기를, 체크 표시는 합격을 담았습니다.</p>';
  document.body.append(dialog);
  button.addEventListener('click',()=>dialog.showModal());
  dialog.querySelector('button').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog){const b=dialog.getBoundingClientRect();if(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom)dialog.close()}});
  dialog.addEventListener('close',()=>button.focus());
})();
