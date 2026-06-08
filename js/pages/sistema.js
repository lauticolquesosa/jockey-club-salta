// scroll reveal
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:.16, rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(el=>{ if(!el.classList.contains('in')) io.observe(el); });

  // topbar state
  const topbar = document.getElementById('topbar');
  const hero = document.querySelector('.hero');
  const onScroll = ()=>{
    const past = window.scrollY > hero.offsetHeight - 90;
    topbar.classList.toggle('solid', past);
    topbar.classList.toggle('on-hero', !past);
  };
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  // sound toggle
  const snd = document.getElementById('sndToggle');
  const toggleSnd = ()=>{ const on = snd.classList.toggle('on'); snd.setAttribute('aria-checked', on?'true':'false'); };
  snd.addEventListener('click', toggleSnd);
  snd.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); toggleSnd(); } });

  // constellation drifting stars
  const con = document.getElementById('constella');
  for(let i=0;i<28;i++){
    const s=document.createElement('span'); s.className='star';
    const sz=Math.random()*2+1; s.style.width=sz+'px'; s.style.height=sz+'px';
    s.style.left=Math.random()*100+'%'; s.style.top=Math.random()*100+'%';
    s.style.opacity=(Math.random()*.5+.2).toFixed(2);
    con.appendChild(s);
  }

  // staggered reveal demo
  const stage = document.getElementById('revealStage');
  const ws = [...stage.querySelectorAll('.w')];
  function playReveal(){
    ws.forEach(w=>w.classList.remove('in'));
    ws.forEach((w,i)=> setTimeout(()=>w.classList.add('in'), 120 + i*220));
  }
  const demoIO = new IntersectionObserver((es)=>{ es.forEach(e=>{ if(e.isIntersecting){ playReveal(); } }); },{threshold:.4});
  demoIO.observe(stage);
  document.getElementById('replayBtn').addEventListener('click', playReveal);
