(() => {
  const screen=document.getElementById('singleScreen'),description=document.getElementById('qDesc');
  if(!screen||!description)return;
  const mascot=document.createElement('button');mascot.type='button';mascot.id='idleStudyMascot';mascot.hidden=true;
  mascot.setAttribute('aria-label','푸는중일까요? 찍는중일까요? 클릭하면 안내가 사라집니다.');
  mascot.innerHTML=`<span class="idle-mascot-bubble">푸는중일까요? 찍는중일까요?</span><svg class="idle-mascot-character" viewBox="0 0 130 140" width="100" height="108" aria-hidden="true"><g fill="none" stroke="#3e5149" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><circle cx="65" cy="31" r="20" fill="#fffdf5"/><path d="M65 52V91M65 64L44 78L35 65M65 64L83 73L96 57"/><g class="idle-mascot-legs"><path d="M65 91L49 111L37 123M65 91L78 109L91 122"/></g><path d="M57 35Q65 42 73 35" stroke-width="2"/></g><circle cx="58" cy="27" r="2.5" fill="#3e5149"/><circle cx="72" cy="27" r="2.5" fill="#3e5149"/><ellipse cx="65" cy="132" rx="35" ry="3" fill="#3e51491a"/></svg>`;
  description.before(mascot);
  let trackedId=null,timer=null,started=0,dismissed=false;
  const wait=60*1000;
  function canShow(){return !document.hidden&&screen.style.display!=='none'&&!document.getElementById('quizOverlay')?.classList.contains('show');}
  function sync(){
    const id=typeof currentQ==='function'?currentQ()?.id:null;
    if(id!==trackedId){trackedId=id;started=Date.now();dismissed=false;mascot.hidden=true;clearTimeout(timer);if(id)timer=setTimeout(sync,wait);}
    const answered=typeof userAnswers!=='undefined' && userAnswers[id]!=null;
    mascot.hidden=!trackedId||dismissed||answered||Date.now()-started<wait||!canShow();
  }
  mascot.addEventListener('click',()=>{dismissed=true;mascot.hidden=true;});
  new MutationObserver(sync).observe(description,{childList:true,characterData:true,subtree:true});
  new MutationObserver(sync).observe(screen,{attributes:true,attributeFilter:['style']});
  const options=document.getElementById('options');
  if(options){options.addEventListener('click',sync);new MutationObserver(sync).observe(options,{childList:true});}
  const quiz=document.getElementById('quizOverlay');if(quiz)new MutationObserver(sync).observe(quiz,{attributes:true,attributeFilter:['class']});
  document.addEventListener('visibilitychange',sync);
  sync();
})();
