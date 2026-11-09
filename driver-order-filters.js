(() => {
  const defaults = { date: 'all', customer: '', progress: '', taskType: '', route: '' };
  let applied = { ...defaults }, draft, records = [], changed, panel, anchor;
  const titles = { date: '时间范围', customer: '客户', progress: '任务进度', taskType: '任务类型', route: '线路' };
  const esc = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  function options(key) {
    if (key === 'date') return [['all', '全部时间'], ['today', '今日'], ['yesterday', '昨日'], ['last7', '近7天'], ['month', '近一月']];
    if (key === 'progress') return [['', '全部进度'], ...[0, 30, 50, 60, 70, 80, 90, 100].map(value => [String(value), `进度 ≥ ${value}%`])];
    const source = key === 'route' && (draft || applied).customer ? records.filter(item => item.customerName === (draft || applied).customer) : records;
    const field = { customer: 'customerName', taskType: 'taskType', route: 'routeName' }[key];
    return [[ '', `全部${titles[key]}` ], ...[...new Set(source.map(item => item[field]).filter(Boolean))].map(value => [value, value])];
  }
  const label = (key, values) => options(key).find(([value]) => value === values[key])?.[1] || `全部${titles[key]}`;
  function updateToolbar() {
    document.querySelectorAll('[data-order-picker]').forEach(button => {
      button.querySelector('span').textContent = label(button.dataset.orderPicker, applied);
      button.title = label(button.dataset.orderPicker, applied);
    });
    document.querySelector('[data-order-more]')?.classList.toggle('is-filtered', Object.keys(defaults).some(key => applied[key] !== defaults[key]));
  }
  function close() {
    if (panel?.matches(':popover-open')) panel.hidePopover();
    draft = null;
    anchor?.setAttribute('aria-expanded', 'false');
  }
  function renderPanel() {
    panel.innerHTML = '<header><strong>全部筛选</strong><button type="button" data-order-close aria-label="关闭筛选"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button></header>' + Object.keys(titles).map(key => `<button class="order-filter-row" type="button" data-order-draft="${key}"><span>${titles[key]}</span><span>${esc(label(key, draft))}</span><span aria-hidden="true">›</span></button>`).join('') + '<footer><button type="button" data-order-reset>重置</button><button type="button" data-order-apply>确定</button></footer>';
  }
  function position() {
    if (!panel?.matches(':popover-open') || !anchor?.isConnected) return;
    const shell = document.querySelector('.phone-shell').getBoundingClientRect();
    const toolbar = anchor.closest('.order-filter-toolbar').getBoundingClientRect();
    panel.style.left = `${shell.left}px`;
    panel.style.top = `${toolbar.bottom}px`;
    panel.style.width = `${shell.width}px`;
    panel.style.maxHeight = `${Math.max(100, shell.bottom - toolbar.bottom - 34)}px`;
  }
  function pick(key, button, isDraft) {
    const values = isDraft ? draft : applied;
    window.openMobileSelect(options(key), titles[key], values[key], value => {
      values[key] = value;
      if (key === 'customer') values.route = '';
      if (isDraft) renderPanel();
      else { changed?.(); updateToolbar(); }
    }, button);
  }
  document.addEventListener('click', event => {
    const picker = event.target.closest('[data-order-picker]');
    if (picker) { close(); pick(picker.dataset.orderPicker, picker, false); return; }
    const more = event.target.closest('[data-order-more]');
    if (more) {
      if (panel?.matches(':popover-open')) { close(); return; }
      if (!panel) { panel = document.createElement('div'); panel.className = 'order-filter-popover'; panel.setAttribute('popover', 'manual'); panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', '全部筛选'); document.body.append(panel); }
      anchor = more; draft = { ...applied }; renderPanel(); panel.showPopover(); more.setAttribute('aria-expanded', 'true'); position(); panel.querySelector('header button').focus({ preventScroll: true }); return;
    }
    const row = event.target.closest('[data-order-draft]');
    if (row) { pick(row.dataset.orderDraft, row, true); return; }
    if (event.target.closest('[data-order-close]')) { close(); anchor?.focus({ preventScroll: true }); }
    if (event.target.closest('[data-order-reset]')) { draft = { ...defaults }; renderPanel(); }
    if (event.target.closest('[data-order-apply]')) { applied = { ...draft }; close(); changed?.(); updateToolbar(); anchor?.focus({ preventScroll: true }); }
  });
  document.addEventListener('pointerdown', event => { if (!event.target.closest('.order-filter-popover, .order-filter-toolbar, #mobileSelectSheet')) close(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !document.querySelector('#mobileSelectSheet[open]')) close(); });
  window.addEventListener('resize', close);
  document.addEventListener('scroll', event => { if (event.target?.id === 'subpageContent') position(); }, true);
  window.DriverOrderFilters = {
    toolbar(items, onChange) {
      records = items; changed = onChange;
      return `<div class="order-filter-toolbar" aria-label="运单筛选">${['date', 'customer', 'progress'].map(key => `<button type="button" data-order-picker="${key}" aria-label="${titles[key]}" aria-haspopup="dialog" aria-expanded="false"><span>${esc(label(key, applied))}</span><i aria-hidden="true"></i></button>`).join('')}<button type="button" data-order-more aria-label="全部筛选" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 4h16v3l-6 6v6l-4 2v-8L4 7z"/></svg></button></div>`;
    },
    update: updateToolbar,
    close,
    matches(item) {
      if (applied.customer && item.customerName !== applied.customer) return false;
      if (applied.route && item.routeName !== applied.route) return false;
      if (applied.taskType && item.taskType !== applied.taskType) return false;
      if (applied.progress !== '' && Number(item.progress) < Number(applied.progress)) return false;
      if (applied.date !== 'all') {
        const raw = item.orderDate || item.dispatchTime?.slice(0, 10);
        if (!raw) return false;
        const now = new Date(); now.setHours(0, 0, 0, 0);
        const date = new Date(`${raw}T00:00:00`);
        const day = Math.round((now - date) / 86400000);
        if (applied.date === 'today' && day !== 0) return false;
        if (applied.date === 'yesterday' && day !== 1) return false;
        if (applied.date === 'last7' && (day < 0 || day > 6)) return false;
        if (applied.date === 'month') { const start = new Date(now); start.setMonth(start.getMonth() - 1); if (date < start || date > now) return false; }
      }
      return true;
    },
  };
})();
