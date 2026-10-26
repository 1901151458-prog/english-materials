(function(){
  var cards = Array.prototype.slice.call(document.querySelectorAll('.rd-card'));
  var filters = Array.prototype.slice.call(document.querySelectorAll('.rd-filter:not(.rd-pick-filter)'));
  var count = document.getElementById('rdCount');
  var search = document.getElementById('rdSearch');
  var favOnly = document.getElementById('rdFavOnly');
  var unreadOnly = document.getElementById('rdUnreadOnly');
  var pickOnly = document.getElementById('rdPickOnly');
  var KEY_R = 'sdg-read-v1', KEY_F = 'sdg-fav-v1';
  function load(k){ try { var a = JSON.parse(localStorage.getItem(k) || '[]'); return Array.isArray(a) ? a : []; } catch (e) { return []; } }
  function save(k, set){ try { localStorage.setItem(k, JSON.stringify(Array.from(set))); } catch (e) {} }
  var read = new Set(load(KEY_R)), fav = new Set(load(KEY_F));
  var activeSrc = 'all', query = '', onlyFav = false, onlyUnread = false, onlyPick = false;
  function urlOf(card){ var a = card.querySelector('h3 a'); return a ? a.href : ''; }
  function markRead(card){ var u = urlOf(card); if (!u) return; read.add(u); save(KEY_R, read); card.classList.add('is-read'); }
  cards.forEach(function(card){
    var u = urlOf(card);
    if (read.has(u)) card.classList.add('is-read');
    var top = card.querySelector('.rd-top');
    if (top) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'rd-fav';
      b.setAttribute('aria-pressed', fav.has(u) ? 'true' : 'false');
      b.textContent = fav.has(u) ? '★ 已收藏' : '☆ 收藏';
      b.addEventListener('click', function(){
        if (fav.has(u)) { fav.delete(u); b.textContent = '☆ 收藏'; b.setAttribute('aria-pressed','false'); }
        else { fav.add(u); b.textContent = '★ 已收藏'; b.setAttribute('aria-pressed','true'); }
        save(KEY_F, fav); apply();
      });
      top.appendChild(b);
    }
    card.querySelectorAll('h3 a, .rd-open a').forEach(function(a){
      a.addEventListener('click', function(){ markRead(card); apply(); });
    });
  });
  function apply(){
    var q = query.trim().toLowerCase(), n = 0;
    cards.forEach(function(card){
      var u = urlOf(card);
      var text = (card.textContent || '').toLowerCase();
      var show = (activeSrc === 'all' || card.getAttribute('data-source') === activeSrc) &&
        (!q || text.indexOf(q) !== -1) &&
        (!onlyFav || fav.has(u)) &&
        (!onlyUnread || !read.has(u)) &&
        (!onlyPick || card.getAttribute('data-pick') === '1');
      card.style.display = show ? '' : 'none';
      if (show) n++;
      card.classList.toggle('is-read', read.has(u));
    });
    if (count) count.textContent = n + ' 篇';
  }
  filters.forEach(function(b){
    b.addEventListener('click', function(){
      activeSrc = b.getAttribute('data-src');
      filters.forEach(function(x){ x.classList.toggle('active', x === b); });
      apply();
    });
  });
  if (search) search.addEventListener('input', function(){ query = search.value; apply(); });
  if (favOnly) favOnly.addEventListener('click', function(){
    onlyFav = !onlyFav; favOnly.classList.toggle('active', onlyFav);
    favOnly.setAttribute('aria-pressed', onlyFav ? 'true' : 'false'); apply();
  });
  if (pickOnly) pickOnly.addEventListener('click', function(){
    onlyPick = !onlyPick; pickOnly.classList.toggle('active', onlyPick);
    pickOnly.setAttribute('aria-pressed', onlyPick ? 'true' : 'false'); apply();
  });
  if (unreadOnly) unreadOnly.addEventListener('click', function(){
    onlyUnread = !onlyUnread; unreadOnly.classList.toggle('active', onlyUnread);
    unreadOnly.setAttribute('aria-pressed', onlyUnread ? 'true' : 'false'); apply();
  });
  apply();
})();
