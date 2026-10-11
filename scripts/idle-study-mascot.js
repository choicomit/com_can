(() => {
  const screen=document.getElementById('singleScreen'),description=document.getElementById('qDesc');
  if(!screen||!description)return;
  const mascot=document.createElement('button');mascot.type='button';mascot.id='idleStudyMascot';mascot.hidden=true;
  mascot.setAttribute('aria-label','푸는중일까요? 찍는중일까요? 클릭하면 안내가 사라집니다.');
  mascot.innerHTML=`<span class="idle-mascot-bubble">푸는중일까요? 찍는중일까요?</span>
  <svg class="idle-mascot-character" viewBox="0 0 180 220" width="144" height="176" aria-hidden="true">
    <defs><linearGradient id="idle-jacket" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#85788f"/><stop offset="1" stop-color="#5e5269"/></linearGradient><linearGradient id="idle-paper" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#faf5e9"/><stop offset="1" stop-color="#e8dfcc"/></linearGradient></defs>
    <ellipse cx="90" cy="211" rx="43" ry="5" fill="#304b4212"/>
    <g class="idle-mascot-person" stroke-linecap="round" stroke-linejoin="round">
      <g class="idle-mascot-legs"><path d="M73 169L72 186L70 199L80 200L86 173" fill="#d1b5a3"/><path d="M96 173L103 190L110 199L119 195L109 170" fill="#d1b5a3"/><path d="M70 197L80 197L82 205H60Q60 200 70 197Z" fill="#413c47"/><path d="M109 196L119 192L128 202L126 206L105 202Z" fill="#413c47"/><path d="M78 204V209M120 204V209" stroke="#413c47" stroke-width="3"/></g>
      <path d="M69 131Q91 140 111 131L115 174Q91 182 65 174Z" fill="#65556f"/><path d="M92 145L94 174" stroke="#8b7c93" stroke-width="1"/>
      <path d="M80 63V76L99 78V59" fill="#d8ad91"/><path d="M73 77L88 71L104 77L110 132Q91 144 69 132Z" fill="#f2ece0"/>
      <path d="M79 73L67 77Q58 83 59 100L64 139L85 137L88 79Z" fill="url(#idle-jacket)"/><path d="M97 73L109 77Q115 84 115 101L111 139L91 137L89 80Z" fill="url(#idle-jacket)"/>
      <path d="M79 75L75 89L83 94L85 133M99 76L103 89L96 96L94 135" fill="none" stroke="#b5a6c0" stroke-width="1.2"/><circle cx="91" cy="119" r="1.6" fill="#c6c4ae"/>
      <g class="idle-mascot-writing-arm"><path d="M66 81Q53 88 53 106L62 124L75 117L66 102L72 85" fill="#796b84"/><path d="M63 116Q71 111 76 115L82 119L80 125L71 126L65 123" fill="#dfb699"/><path d="M76 115L87 99" stroke="#c8a96b" stroke-width="3"/><path d="M86 100L89 96" stroke="#3d4942" stroke-width="2"/></g>
      <g class="idle-mascot-reading-arm"><path d="M108 79Q118 80 122 91L126 113L115 117L106 95" fill="#65566f"/><g transform="rotate(-9 117 118)"><rect x="105" y="97" width="24" height="37" rx="2" fill="url(#idle-paper)" stroke="#bdb7a9"/><path d="M109 98V133M114 108H124M114 113H124M114 118H122" stroke="#b0b8ac" stroke-width="1"/></g><path d="M118 113Q129 109 129 115L128 121Q119 126 115 121" fill="#dfb699"/></g>
      <g class="idle-mascot-head">
      <path d="M72 30Q71 13 91 13Q111 12 114 32L117 84Q112 92 103 87L101 52L79 52L78 88Q67 89 65 82L69 42Z" fill="#433b3b"/><path d="M72 52L71 81M109 49L112 81" fill="none" stroke="#6d5e58" stroke-width="1.2"/>
      <path d="M74 39Q73 24 89 21Q106 20 107 39L104 55Q100 66 91 70Q81 66 77 55Z" fill="#e4bda0"/>
      <path d="M73 43Q65 29 73 21Q80 11 93 14Q109 14 112 30L109 54L102 48L101 31Q89 38 78 32L77 49Z" fill="#433b3b"/><path d="M80 23Q90 18 102 24" fill="none" stroke="#6d5e58" stroke-width="1.5"/>
      <path d="M73 43Q67 41 69 49Q70 54 75 53M105 42Q111 41 109 48Q108 52 105 52" fill="#dfb498"/>
      <circle cx="74" cy="55" r="2" fill="#c9af77"/><circle cx="106" cy="54" r="2" fill="#c9af77"/><g fill="none" stroke="#46554f" stroke-width="1.3"><rect x="76" y="41" width="12" height="9" rx="3"/><rect x="93" y="41" width="12" height="9" rx="3"/><path d="M88 44H93M73 42L76 43"/></g>
      <path d="M79 38Q82 36 86 38M94 38Q98 36 102 38" fill="none" stroke="#675049" stroke-width="1.2"/><g class="idle-mascot-eyes"><path d="M79 44Q83 41 86 44M95 44Q99 41 102 44" fill="none" stroke="#493d3d" stroke-width="1.4"/><path d="M79 44L78 42M101 44L103 42" fill="none" stroke="#493d3d" stroke-width="1"/><ellipse cx="83" cy="45" rx="1.4" ry="2" fill="#493d3d"/><ellipse cx="98" cy="45" rx="1.4" ry="2" fill="#493d3d"/></g><ellipse cx="80" cy="54" rx="3.6" ry="1.8" fill="#dba49e" opacity=".45"/><ellipse cx="101" cy="53" rx="3.6" ry="1.8" fill="#dba49e" opacity=".45"/><path d="M91 48L90 53L93 54" fill="none" stroke="#b48878" stroke-width=".8"/><path d="M86 60Q89 58 91 60Q94 58 96 60Q91 65 86 60Z" fill="#b66e79"/><path d="M87 60Q91 62 95 60" fill="none" stroke="#8f515e" stroke-width=".6"/>
      </g>
    </g>
    <text class="idle-mascot-thought" x="130" y="40" fill="#8a9b91" font-family="Arial,sans-serif" font-size="20">…</text>
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
