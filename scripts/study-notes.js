(() => {
  const openButton = document.getElementById('studyNotesBtn');
  if (!openButton) return;
  const panel = document.createElement('section');
  panel.id = 'studyNotes'; panel.hidden = true;
  panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', '정리노트');
  panel.innerHTML = `<div class="notes-titlebar"><strong>정리노트</strong><div class="notes-window-buttons"><button type="button" data-action="save">저장</button><button type="button" data-action="minimize" aria-label="최소화" title="최소화">─</button><button type="button" data-action="maximize" aria-label="최대화" title="최대화">□</button><button type="button" data-action="restore" aria-label="이전 크기로" title="이전 크기로">❐</button><button type="button" data-action="close" aria-label="닫기" title="닫기">×</button></div></div>
  <div class="notes-content"><p class="notes-help">저장하면 오늘 날짜의 TXT 파일이 만들어집니다. 저장 창이 지원되면 ‘문서’ 폴더를 기본 위치로 제안합니다. 그 외에는 브라우저의 다운로드 설정에 따라 저장됩니다.</p>
  <div class="notes-toolbar"><label>창 색 <select aria-label="정리노트 창 색"><option value="yellow">연한 노랑</option><option value="pink">연한 분홍</option><option value="green">연한 초록</option><option value="blue">연한 파랑</option><option value="red">연한 빨강</option><option value="gray">연한 회색</option></select></label><button type="button" data-action="copy">복사</button><button type="button" data-action="cut">잘라내기</button><button type="button" data-action="paste">붙여넣기</button></div>
  <textarea aria-label="정리노트 입력" placeholder="여기에 정리노트를 입력하세요." spellcheck="false"></textarea><p class="notes-status" role="status">맑은 고딕 · 13pt · 텍스트만 입력할 수 있습니다.</p></div>
  <div class="notes-close-confirm" hidden role="alertdialog" aria-label="정리노트 저장 확인"><p>저장하시겠습니까?</p><div><button type="button" data-action="save-close">저장</button><button type="button" data-action="discard">저장 안 함</button><button type="button" data-action="cancel-close">취소</button></div></div>`;
  document.body.append(panel);
  const editor = panel.querySelector('textarea'), status = panel.querySelector('.notes-status'), confirmation = panel.querySelector('.notes-close-confirm');
  let savedText = '', saving = false;
  const dirty = () => editor.value !== savedText;
  const restore = () => { panel.classList.remove('notes-minimized', 'notes-maximized'); };
  const close = () => { panel.hidden = true; confirmation.hidden = true; };
  const filename = () => `${new Intl.DateTimeFormat('sv-SE', {timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())}.txt`;
  async function save() {
    if (saving) return false;
    saving = true;
    const text = editor.value, name = filename();
    try {
      if (typeof window.showSaveFilePicker === 'function') {
        const handle = await window.showSaveFilePicker({suggestedName:name,startIn:'documents',types:[{description:'텍스트 파일',accept:{'text/plain':['.txt']}}]});
        const stream = await handle.createWritable(); await stream.write(new Blob([text], {type:'text/plain;charset=utf-8'})); await stream.close();
        status.textContent = `${name} 저장 완료`;
      } else {
        const url = URL.createObjectURL(new Blob(['\uFEFF',text], {type:'text/plain;charset=utf-8'}));
        const link = document.createElement('a'); link.href = url; link.download = name; document.body.append(link); link.click(); link.remove(); setTimeout(()=>URL.revokeObjectURL(url), 60000);
        status.textContent = `${name} 다운로드를 요청했습니다. 브라우저의 저장 위치를 확인하세요.`;
      }
      savedText = text; return true;
    } catch(error) {
      status.textContent = error.name === 'AbortError' ? '저장을 취소했습니다.' : '저장하지 못했습니다. 다시 시도해 주세요.';
      return false;
    } finally { saving = false; }
  }
  openButton.addEventListener('click', () => {
    panel.hidden = false; if (panel.classList.contains('notes-minimized')) restore();
    editor.focus();
  });
  panel.querySelector('select').addEventListener('change', event => {
    panel.dataset.color = event.target.value;
  });
  panel.addEventListener('click', async event => {
    const action = event.target.closest('[data-action]')?.dataset.action;
    if (!action) return;
    if (action === 'save') await save();
    if (action === 'minimize') { panel.classList.remove('notes-maximized');panel.classList.add('notes-minimized'); }
    if (action === 'maximize') { panel.classList.remove('notes-minimized');panel.classList.add('notes-maximized'); }
    if (action === 'restore') restore();
    if (action === 'close') { if(dirty()){if(panel.classList.contains('notes-minimized')) restore();confirmation.hidden=false;confirmation.querySelector('button').focus();}else close(); }
    if (action === 'save-close' && await save()) close();
    if (action === 'discard') { editor.value = savedText; close(); }
    if (action === 'cancel-close') {confirmation.hidden=true;editor.focus();}
    if (['copy','cut','paste'].includes(action)) {
      editor.focus();
      try {
        if (action === 'paste') {
          const text = await navigator.clipboard.readText();editor.setRangeText(text,editor.selectionStart,editor.selectionEnd,'end');
        } else {
          const text = editor.value.slice(editor.selectionStart,editor.selectionEnd);
          if(!text){status.textContent='먼저 복사하거나 잘라낼 글자를 선택하세요.';return;}
          if(navigator.clipboard?.writeText) await navigator.clipboard.writeText(text);
          else { if(!document.execCommand('copy')) throw Error('clipboard'); }
          if(action==='cut') editor.setRangeText('',editor.selectionStart,editor.selectionEnd,'end');
        }
        status.textContent='맑은 고딕 · 13pt · 텍스트만 입력할 수 있습니다.';
      } catch {status.textContent='클립보드 권한을 허용하거나 Ctrl+C / Ctrl+X / Ctrl+V를 사용하세요.';}
    }
  });
  const titlebar = panel.querySelector('.notes-titlebar'); let drag;
  titlebar.addEventListener('pointerdown', event => {
    if(event.target.closest('button') || panel.classList.contains('notes-maximized')) return;
    const bounds=panel.getBoundingClientRect();drag={x:event.clientX,y:event.clientY,left:bounds.left,top:bounds.top};titlebar.setPointerCapture(event.pointerId);event.preventDefault();
  });
  titlebar.addEventListener('pointermove', event => {
    if(!drag) return;
    const width=panel.getBoundingClientRect().width;
    panel.style.left=`${Math.max(0,Math.min(innerWidth-width,drag.left+event.clientX-drag.x))}px`;
    panel.style.top=`${Math.max(0,Math.min(innerHeight-48,drag.top+event.clientY-drag.y))}px`;
  });
  titlebar.addEventListener('pointerup',()=>drag=null);titlebar.addEventListener('pointercancel',()=>drag=null);
  window.addEventListener('resize',()=>{if(panel.hidden||panel.classList.contains('notes-maximized'))return;const b=panel.getBoundingClientRect();panel.style.left=`${Math.max(0,Math.min(b.left,innerWidth-b.width))}px`;panel.style.top=`${Math.max(0,Math.min(b.top,innerHeight-48))}px`;});
  window.addEventListener('beforeunload',event=>{if(dirty()){event.preventDefault();event.returnValue='';}});
})();
