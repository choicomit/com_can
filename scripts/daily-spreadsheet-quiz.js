(() => {
  const overlay=document.getElementById('quizOverlay'),button=document.getElementById('quizMenuBtn');
  if(!overlay||!button) return;
  const card=document.getElementById('quizCard'),questionEl=document.getElementById('quizQ'),optionsEl=document.getElementById('quizOpts'),resultEl=document.getElementById('quizResult'),noteEl=document.getElementById('quizNote'),metaEl=document.getElementById('quizMeta'),next=document.getElementById('quizNext'),close=document.getElementById('quizClose');
  const diagramEl=document.createElement('div');diagramEl.id='dailyQuizDiagram';questionEl.after(diagramEl);
  const previous=document.createElement('button');previous.type='button';previous.id='dailyQuizPrevious';previous.textContent='이전';next.before(previous);
  const dateKey=(date=new Date())=>new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).format(date);
  const hash=text=>{let h=2166136261;for(let i=0;i<text.length;i++){h^=text.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
  function selectForDate(date){
    const pool=questions.filter(q=>q.subject==='스프레드시트').slice().sort((a,b)=>hash(a.id)-hash(b.id)||a.id.localeCompare(b.id));
    const day=Math.floor((Date.parse(`${date}T00:00:00Z`)-Date.UTC(2026,0,1))/86400000);
    const start=((day*5)%pool.length+pool.length)%pool.length;
    return Array.from({length:Math.min(5,pool.length)},(_,i)=>pool[(start+i)%pool.length]);
  }
  let daily=[],answers={},position=0,date='',storageKey='',lastFocus;
  function persist(){try{localStorage.setItem(storageKey,JSON.stringify(answers))}catch{}}
  function load(){date=dateKey();daily=selectForDate(date);position=0;storageKey=`daily-sheet-quiz-v1:${date}`;try{answers=JSON.parse(localStorage.getItem(storageKey)||'{}')||{}}catch{answers={}}for(const q of daily){if(!Number.isInteger(answers[q.id])||answers[q.id]<0||answers[q.id]>3)delete answers[q.id]}}
  function render(){
    const q=daily[position];if(!q){questionEl.textContent='출제할 문제가 없습니다.';return;}
    document.getElementById('quizTitle').textContent=`오늘의 스프레드시트 QUIZ · ${date}`;
    card.querySelector('.sub').textContent='전체 2과목 기출에서 매일 다른 5문제 · 한국 날짜 기준';
    questionEl.textContent=q.desc;diagramEl.replaceChildren();
    if(q.diagram)appendQuestionDiagram(diagramEl,q.diagram);
    if(q.image){const wrap=document.createElement('div');wrap.className='qimg-wrap';const img=document.createElement('img');img.className='qimg';img.src=q.image;img.alt='문제에 제시된 표 또는 그림';img.onerror=()=>showImageError(img);wrap.append(img);diagramEl.append(wrap);}
    optionsEl.replaceChildren();optionsEl.classList.toggle('diagram-options-grid',!!q.optionDiagrams||q.id==='2026-1-36-스프레드시트');
    const selected=answers[q.id],answered=Number.isInteger(selected);
    q.options.forEach((raw,i)=>{
      const option=document.createElement('button');option.type='button';option.className='quizOpt';option.disabled=answered;option.setAttribute('aria-label',`${i+1}번 보기`);
      const number=document.createElement('strong');number.textContent=`${i+1}. `;const body=document.createElement('div');body.className='optBody';
      if(q.optionDiagrams?.[i])appendQuestionDiagram(body,q.optionDiagrams[i]);else fillOptionContent(body,raw);
      option.append(number,body);
      if(answered&&i===q.answerIndex)option.classList.add('correct');if(answered&&i===selected&&i!==q.answerIndex)option.classList.add('wrong');
      option.addEventListener('click',()=>{answers[q.id]=i;persist();render()});optionsEl.append(option);
    });
    const completed=daily.filter(q=>Number.isInteger(answers[q.id])).length,score=daily.filter(q=>answers[q.id]===q.answerIndex).length;
    resultEl.textContent=answered?(selected===q.answerIndex?'정답입니다.':`오답입니다. 정답은 ${q.answerIndex+1}번입니다.`):'보기를 선택하면 정답을 확인할 수 있습니다.';
    noteEl.textContent=`${q.yearLabel} · ${q.number}번 · 스프레드시트 일반`;
    if(completed===daily.length)resultEl.textContent+=` 오늘의 결과: ${score} / ${daily.length}문제 정답`;
    metaEl.textContent=`문제 ${position+1} / ${daily.length} · 완료 ${completed} / ${daily.length}`;
    previous.disabled=position===0;next.disabled=!answered||position===daily.length-1;next.textContent=position===daily.length-1?'마지막 문제':'다음';
  }
  function hide(){overlay.classList.remove('show');overlay.setAttribute('aria-hidden','true');document.body.style.overflow=oldOverflow;lastFocus?.focus()}
  let oldOverflow='';
  button.addEventListener('click',()=>{lastFocus=document.activeElement;load();render();oldOverflow=document.body.style.overflow;document.body.style.overflow='hidden';overlay.classList.add('show');overlay.setAttribute('aria-hidden','false');close.focus()});
  close.addEventListener('click',hide);overlay.addEventListener('click',e=>{if(e.target===overlay)hide()});
  next.addEventListener('click',()=>{if(position<daily.length-1){position++;render();card.scrollTop=0}});previous.addEventListener('click',()=>{if(position){position--;render();card.scrollTop=0}});
  overlay.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();hide()}if(e.key==='Tab'){const nodes=[...card.querySelectorAll('button:not(:disabled),a[href]')].filter(e=>e.getClientRects().length);const first=nodes[0],last=nodes.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
  // Shared selection function also permits verification across dates and the full bank.
  window.dailySpreadsheetQuiz={selectForDate,dateKey};
})();
