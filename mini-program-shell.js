/* Visual mini-program system chrome shared by both mobile clients. */
(() => {
  const shell = document.querySelector('.phone-shell, .manager-shell');
  if (!shell || shell.querySelector('.mini-system-status')) return;
  const status = document.createElement('div');
  status.className = 'mini-system-status';
  status.setAttribute('aria-label', '系统状态栏：9:41，信号与电量');
  status.innerHTML = '<span>9:41</span><svg width="68" height="16" viewBox="0 0 68 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g fill="currentColor"><rect x="0" y="10" width="3" height="4" rx=".7"/><rect x="5" y="7" width="3" height="7" rx=".7"/><rect x="10" y="4" width="3" height="10" rx=".7"/><rect x="15" y="1" width="3" height="13" rx=".7"/></g><path d="M24 5a11 11 0 0 1 14 0M27 8a6.5 6.5 0 0 1 8 0M30 11a2 2 0 0 1 2 0" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/><rect x="43" y="2" width="22" height="12" rx="3" fill="none" stroke="currentColor" opacity=".5"/><rect x="45" y="4" width="18" height="8" rx="1.5" fill="currentColor"/><path d="M67 6v4" stroke="currentColor" stroke-width="2"/></svg>';
  const capsule = document.createElement('div');
  capsule.className = 'mini-system-capsule';
  capsule.setAttribute('role', 'img');
  capsule.setAttribute('aria-label', '微信小程序胶囊');
  capsule.innerHTML = '<svg width="87" height="32" viewBox="0 0 87 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect class="capsule-background" x=".5" y=".5" width="86" height="31" rx="15.5"/><path d="M43.5 6v20" stroke="currentColor" opacity=".14"/><g fill="currentColor"><circle cx="16" cy="16" r="1.8"/><circle cx="24" cy="16" r="2.4"/><circle cx="32" cy="16" r="1.8"/></g><circle cx="65" cy="16" r="7" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="65" cy="16" r="3" fill="currentColor"/></svg>';
  const home = document.createElement('div');
  home.className = 'mini-home-safe-area';
  home.setAttribute('aria-hidden', 'true');
  home.innerHTML = '<span></span>';
  shell.prepend(status);
  shell.append(capsule, home);
})();
