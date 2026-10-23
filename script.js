(()=>{
 const video=document.getElementById('background-video');
 const toggle=document.getElementById('motion-toggle');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 let manuallyPaused=false;
 const saveData=Boolean(navigator.connection?.saveData);
 const message="Hi Elevated! I'd love some help with my landscaping project.";
 const apple=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
 document.getElementById('sms-link').href='sms:+13852833557'+(apple?'&':'?')+'body='+encodeURIComponent(message);
 function labels(){video.classList.toggle('ready',!video.paused);video.parentElement.classList.toggle('video-active',!video.paused);toggle.textContent=video.paused?'Play background':'Pause background';toggle.setAttribute('aria-pressed',String(!video.paused))}
 function sync(){
  if(reduced.matches||saveData||manuallyPaused||document.hidden){video.pause();return}
  if(!video.getAttribute('src')){video.src=video.dataset.src;video.load()}
  video.muted=true;video.defaultMuted=true;video.playbackRate=1;
  toggle.hidden=false;video.play().catch(()=>{labels()});
 }
 video.addEventListener('playing',()=>{video.classList.add('ready');labels()});
 video.addEventListener('pause',labels);
 video.addEventListener('error',()=>{video.classList.remove('ready');video.parentElement.classList.remove('video-active');toggle.hidden=true});
 toggle.addEventListener('click',()=>{manuallyPaused=!video.paused;if(manuallyPaused)video.pause();else sync();labels()});
 reduced.addEventListener('change',()=>{toggle.hidden=reduced.matches||saveData;sync()});
 document.addEventListener('visibilitychange',sync);sync();
})();

