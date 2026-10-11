(() => {
  const screen=document.getElementById('singleScreen'),description=document.getElementById('qDesc');
  if(!screen||!description)return;
  const mascot=document.createElement('button');mascot.type='button';mascot.id='idleStudyMascot';mascot.hidden=true;
  mascot.setAttribute('aria-label','푸는중일까요? 찍는중일까요? 클릭하면 안내가 사라집니다.');
  mascot.innerHTML=`<span class="idle-mascot-bubble">푸는중일까요? 찍는중일까요?</span>
  <svg class="idle-mascot-character" viewBox="0 0 180 220" width="144" height="176" aria-hidden="true">
    <defs><linearGradient id="idle-jacket" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#61786f"/><stop offset="1" stop-color="#344f46"/></linearGradient><linearGradient id="idle-paper" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#faf5e9"/><stop offset="1" stop-color="#e8dfcc"/></linearGradient></defs>
    <ellipse cx="90" cy="211" rx="43" ry="5" fill="#304b4212"/>
    <g class="idle-mascot-person" stroke-linecap="round" stroke-linejoin="round">
      <g class="idle-mascot-legs"><path d="M72 132L68 166L65 197L79 198L88 164L93 134" fill="#333f4b"/><path d="M92 132L95 167L108 197L121 192L111 162L108 131" fill="#44515e"/><path d="M65 195L80 195L82 205L58 205Q57 199 65 195" fill="#24332f"/><path d="M108 194L120 191L130 202Q130 206 124 206L104 202Z" fill="#24332f"/><path d="M59 206H82M106 203L127 207" fill="none" stroke="#e4e4db" stroke-width="2"/><path d="M89 140L82 170M102 139L105 167" fill="none" stroke="#ffffff13" stroke-width="2"/></g>
      <path d="M80 63V76L99 78V59" fill="#d8ad91"/><path d="M73 77L88 71L104 77L110 132Q91 144 69 132Z" fill="#f2ece0"/>
      <path d="M79 73L67 77Q58 83 59 100L64 139L85 137L88 79Z" fill="url(#idle-jacket)"/><path d="M97 73L109 77Q115 84 115 101L111 139L91 137L89 80Z" fill="url(#idle-jacket)"/>
      <path d="M79 75L75 89L83 94L85 133M99 76L103 89L96 96L94 135" fill="none" stroke="#95aaa0" stroke-width="1.2"/><circle cx="91" cy="119" r="1.6" fill="#c6c4ae"/>
      <path d="M66 81Q53 88 53 106L62 124L75 117L66 102L72 85" fill="#526d62"/><path d="M108 79Q118 80 122 91L126 113L115 117L106 95" fill="#405d51"/>
      <g transform="rotate(-9 117 118)"><rect x="105" y="97" width="24" height="37" rx="2" fill="url(#idle-paper)" stroke="#bdb7a9"/><path d="M109 98V133M114 108H124M114 113H124M114 118H122" stroke="#b0b8ac" stroke-width="1"/></g>
      <path d="M118 113Q129 109 129 115L128 121Q119 126 115 121" fill="#dfb699"/><path d="M63 116Q71 111 76 115L82 119L80 125L71 126L65 123" fill="#dfb699"/>
      <path d="M76 115L87 99" stroke="#c8a96b" stroke-width="3"/><path d="M86 100L89 96" stroke="#3d4942" stroke-width="2"/>
      <path d="M72 39Q70 23 88 20Q108 19 108 40L105 57Q100 70 90 70Q78 68 74 57Z" fill="#e4bda0"/>
      <path d="M74 43Q66 32 73 23Q78 12 91 14Q102 13 110 24L107 44L102 41L100 30Q87 35 77 31L76 45Z" fill="#35413b"/><path d="M79 24Q88 19 100 24" fill="none" stroke="#56635a" stroke-width="1.5"/>
      <path d="M73 43Q67 41 69 49Q70 54 75 53M105 42Q111 41 109 48Q108 52 105 52" fill="#dfb498"/>
      <g fill="none" stroke="#46554f" stroke-width="1.3"><rect x="76" y="41" width="12" height="9" rx="3"/><rect x="93" y="41" width="12" height="9" rx="3"/><path d="M88 44H93M73 42L76 43"/></g>
      <path d="M81 44H84M96 44H99" stroke="#343f38" stroke-width="1.6"/><path d="M91 47L90 54L94 54M86 60Q91 62 96 59" fill="none" stroke="#aa7b62" stroke-width="1.2"/>
    </g>
  </svg>`;
  description.before(mascot);
  let trackedId=null,started=0,dismissed=false;
  const wait=60*1000;
  function canShow(){return !document.hidden&&screen.style.display!=='none'&&!document.getElementById('quizOverlay')?.classList.contains('show');}
  function sync(){
    const id=typeof currentQ==='function'?currentQ()?.id:null;
    if(id!==trackedId){trackedId=id;started=Date.now();dismissed=false;mascot.hidden=true;}
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
  // Recheck elapsed time continuously; a delayed or early timer cannot lose the reminder.
  setInterval(sync,1000);
})();
