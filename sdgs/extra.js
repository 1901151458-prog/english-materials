(function(){
  var body = document.querySelector('.essay-body');
  if(!body) return;
  var block = body.querySelector('.zh-block');
  if(!block) return;
  var meta = document.querySelector('.essay-meta');
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'zh-toggle';
  btn.textContent = '中文译文';
  btn.setAttribute('aria-expanded','false');
  if(meta) meta.appendChild(btn);
  else body.parentNode.insertBefore(btn, body);
  function set(on){
    block.classList.toggle('open', on);
    btn.classList.toggle('on', on);
    btn.textContent = on ? '收起中文' : '中文译文';
    btn.setAttribute('aria-expanded', on ? 'true' : 'false');
    try { localStorage.setItem('sdg-zh-visible', on ? '1' : '0'); } catch(e){}
  }
  var saved = false;
  try { saved = localStorage.getItem('sdg-zh-visible') === '1'; } catch(e){}
  set(saved);
  btn.addEventListener('click', function(){ set(!block.classList.contains('open')); });
})();
