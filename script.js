(()=>{
 const video=document.getElementById('background-video');
 const toggle=document.getElementById('motion-toggle');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const saveData=Boolean(navigator.connection?.saveData);
 let manuallyPaused=false, optedIn=false, playing=false;
 const apple=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
 document.getElementById('sms-link').href='sms:+13852833557'+(apple?'&':'?')+'body='+encodeURIComponent("Hi Elevated! I'd love some help with my landscaping project.");
 video.muted=true;video.defaultMuted=true;video.playsInline=true;
 video.setAttribute('muted','');video.setAttribute('playsinline','');video.setAttribute('webkit-playsinline','');
 function render(){
  video.classList.toggle('ready',playing);
  video.parentElement.classList.toggle('video-active',playing);
  toggle.hidden=false;
  toggle.textContent=playing?'Pause background':'Play background';
  toggle.setAttribute('aria-pressed',String(playing));
 }
 function pause(){playing=false;video.pause();render()}
 function start(){
  if(document.hidden||manuallyPaused||(!optedIn&&(reduced.matches||saveData))){pause();return}
  video.muted=true;
  if(!video.getAttribute('src'))video.src=video.dataset.src;
  if(video.error)video.load();
  // Keep play synchronous with the tap so mobile browsers accept the gesture.
  const attempt=video.play();
  if(attempt)attempt.catch(()=>{playing=false;render()});
 }
 video.addEventListener('playing',()=>{playing=true;render()});
 video.addEventListener('pause',()=>{playing=false;render()});
 video.addEventListener('error',()=>{playing=false;render()});
 toggle.addEventListener('click',()=>{
  if(playing){manuallyPaused=true;pause();return}
  optedIn=true;manuallyPaused=false;
  video.classList.add('user-motion');start();
 });
 reduced.addEventListener('change',()=>{optedIn=false;video.classList.remove('user-motion');start()});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();else start()});
 render();start();
})();

