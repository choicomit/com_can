(() => {
  const button=document.getElementById('choiLogoZoom');if(!button)return;
  const dialog=document.createElement('dialog');dialog.id='choiLogoDialog';dialog.setAttribute('aria-labelledby','choiLogoZoomTitle');
  dialog.innerHTML='<div class="logo-zoom-head"><h2 id="choiLogoZoomTitle">초이 로고</h2><button type="button">닫기</button></div><img src="assets/logos/choi-character-logo.png" alt="안경과 긴 머리의 여성 선생님 웹툰 초상과 초이 손글씨"><p>안경과 긴 머리의 선생님 캐릭터에 ‘초이’ 손글씨를 담았습니다.</p>';
  document.body.append(dialog);
  button.addEventListener('click',()=>dialog.showModal());
  dialog.querySelector('button').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog){const b=dialog.getBoundingClientRect();if(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom)dialog.close()}});
  dialog.addEventListener('close',()=>button.focus());
})();
