/* Shared accessible picker. Native modal dialogs keep it above form dialogs. */
(() => {
  let sheet, choices, title, callback, opener;
  const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';

  function ensureSheet() {
    if (sheet) return;
    sheet = document.createElement('dialog');
    sheet.id = 'mobileSelectSheet';
    sheet.className = 'mobile-select-sheet';
    sheet.setAttribute('aria-labelledby', 'mobileSelectTitle');
    sheet.innerHTML = '<header class="mobile-select-header"><strong id="mobileSelectTitle"></strong><button type="button" aria-label="关闭选择"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button></header><div id="mobileSelectOptions" class="mobile-select-options" role="listbox"></div>';
    document.body.append(sheet);
    title = sheet.querySelector('strong');
    choices = sheet.querySelector('[role="listbox"]');
    sheet.querySelector('header button').addEventListener('click', () => sheet.close());
    sheet.addEventListener('click', event => { if (event.target === sheet) { const r = sheet.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) sheet.close(); } });
    sheet.addEventListener('close', () => {
      callback = null;
      opener?.setAttribute('aria-expanded', 'false');
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    });
    choices.addEventListener('keydown', event => {
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
      const buttons = [...choices.querySelectorAll('button:not(:disabled)')];
      const index = buttons.indexOf(document.activeElement);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length;
      event.preventDefault(); buttons[next]?.focus();
    });
  }

  window.openMobileSelect = (options, label, value, onSelect, anchor = document.activeElement) => {
    ensureSheet();
    if (sheet.open) sheet.close();
    opener = anchor; callback = onSelect;
    title.textContent = label || '请选择';
    choices.replaceChildren();
    for (const option of options) {
      const [key, text, disabled = false] = Array.isArray(option) ? option : [option, option];
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'mobile-select-option';
      button.textContent = text; button.dataset.value = key;
      button.disabled = disabled;
      button.setAttribute('role', 'option');
      button.setAttribute('aria-selected', String(String(key) === String(value)));
      button.classList.toggle('selected', String(key) === String(value));
      button.addEventListener('click', () => {
        const selected = callback;
        sheet.close();
        selected?.(String(key));
      });
      choices.append(button);
    }
    if (!options.length) { const empty = document.createElement('p'); empty.textContent = '暂无可选内容'; choices.append(empty); }
    const shell = document.querySelector('.phone-shell, .manager-shell');
    const bounds = shell?.getBoundingClientRect();
    sheet.style.setProperty('--select-left', `${bounds?.left || 0}px`);
    sheet.style.setProperty('--select-width', `${bounds?.width || innerWidth}px`);
    sheet.style.setProperty('--select-bottom', `${Math.max(0, innerHeight - (bounds?.bottom || innerHeight))}px`);
    opener?.setAttribute('aria-expanded', 'true');
    sheet.showModal();
    (choices.querySelector('[aria-selected="true"]:not(:disabled)') || choices.querySelector('button:not(:disabled)'))?.focus({ preventScroll: true });
  };
  window.closeMobileSelect = () => { if (sheet?.open) sheet.close(); };

  function sync(select, display) {
    const selected = select.selectedOptions[0];
    display.querySelector('.select-display-text').textContent = selected?.textContent || '请选择';
    display.classList.toggle('placeholder', !select.value);
    display.setAttribute('aria-disabled', String(select.disabled));
    display.tabIndex = select.disabled ? -1 : 0;
  }
  window.openFieldSelect = display => {
    const select = [...display.parentElement.querySelectorAll('select')].find(item => !display.dataset.fieldName || item.name === display.dataset.fieldName);
    if (!select || select.disabled) return;
    window.openMobileSelect([...select.options].map(option => [option.value, option.textContent, option.disabled]), display.dataset.fieldLabel || '请选择', select.value, value => {
      select.value = value;
      select.dispatchEvent(new Event('input', { bubbles: true }));
      select.dispatchEvent(new Event('change', { bubbles: true }));
      if (display.isConnected) sync(select, display);
    }, display);
  };
  function init() {
    document.querySelectorAll('form select, .mobile-field select, select[data-mobile-select]').forEach(select => {
      const field = select.parentElement;
      let display = [...field.children].find(node => node.classList.contains('mobile-select-display') && (!node.dataset.fieldName || node.dataset.fieldName === select.name));
      if (!display) {
        display = document.createElement('div');
        display.className = 'mobile-select-display';
        display.dataset.fieldName = select.name;
        const directLabel = [...field.childNodes].filter(node => node.nodeType === 3).map(node => node.textContent).join('').trim();
        display.dataset.fieldLabel = (directLabel || field.querySelector('span')?.textContent || '请选择').replace(/^\s*\*\s*/, '');
        display.innerHTML = '<span class="select-display-text"></span>' + arrow;
        field.insertBefore(display, select);
      }
      if (!display.querySelector('.select-display-text')) display.innerHTML = '<span class="select-display-text"></span>' + arrow;
      if (!display.dataset.pickerReady) {
        display.dataset.pickerReady = 'true';
        display.removeAttribute('onclick');
        display.setAttribute('role', 'button');
        display.setAttribute('aria-haspopup', 'dialog');
        display.setAttribute('aria-expanded', 'false');
        display.setAttribute('aria-label', display.dataset.fieldLabel || '请选择');
        display.addEventListener('click', event => { event.preventDefault(); window.openFieldSelect(display); });
        display.addEventListener('keydown', event => { if (['Enter', ' '].includes(event.key)) { event.preventDefault(); window.openFieldSelect(display); } });
        select.addEventListener('change', () => sync(select, display));
        select.addEventListener('invalid', event => {
          event.preventDefault();
          display.setAttribute('aria-invalid', 'true');
          display.focus({ preventScroll: false });
        });
        select.addEventListener('change', () => display.removeAttribute('aria-invalid'));
      }
      select.dataset.mobileSelectInit = 'true';
      select.classList.add('mobile-native-select');
      select.tabIndex = -1;
      sync(select, display);
    });
  }
  const observer = new MutationObserver(records => {
    if (records.some(record => [...record.addedNodes].some(node => node.nodeType === 1 && (node.matches('select, option') || node.querySelector('select'))))) init();
  });
  observer.observe(document.body, { subtree: true, childList: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  window.addEventListener('resize', window.closeMobileSelect);
})();
