/* 英语资料站 · 深色/浅色主题切换 */
(function () {
  var KEY = 'em-theme';
  var html = document.documentElement;
  var stored = 'dark';
  try { stored = localStorage.getItem(KEY) || 'dark'; } catch (e) {}
  if (stored !== 'light' && stored !== 'dark') stored = 'dark';
  html.setAttribute('data-theme', stored);
  html.style.colorScheme = stored === 'dark' ? 'dark' : 'light';

  function updateButton(btn) {
    if (!btn) return;
    var dark = html.getAttribute('data-theme') === 'dark';
    btn.textContent = dark ? '☀ 浅色' : '☾ 深色';
    btn.setAttribute('aria-label', dark ? '切换到浅色背景' : '切换到深色背景');
    btn.setAttribute('title', dark ? '切换到浅色背景' : '切换到深色背景');
    btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    html.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
    try { localStorage.setItem(KEY, theme); } catch (e) {}
    document.querySelectorAll('.theme-toggle').forEach(updateButton);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0b131b' : '#1a365d');
  }

  function inject() {
    var nav = document.querySelector('.site-nav');
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'theme-toggle';
    btn.addEventListener('click', function () {
      setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
    if (nav) {
      nav.appendChild(btn);
    } else {
      document.body.appendChild(btn);
    }
    updateButton(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
