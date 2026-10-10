// Document delegation also handles the site's existing soft navigation.
function activate(tab, focus=false) {
  const workbench = tab.closest('.exp-workbench');
  if (!workbench) return;
  for (const button of workbench.querySelectorAll('[data-skill-tab]')) {
    const selected = button === tab;
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
    workbench.querySelector('#' + button.getAttribute('aria-controls')).hidden = !selected;
  }
  if (focus) tab.focus();
}
document.addEventListener('click', event => {
  const tab = event.target.closest('[data-skill-tab]');
  if (tab) activate(tab);
});
document.addEventListener('keydown', event => {
  const tab = event.target.closest('[data-skill-tab]');
  if (!tab || !['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key)) return;
  event.preventDefault();
  const tabs = [...tab.closest('[role=tablist]').querySelectorAll('[role=tab]')];
  const index = tabs.indexOf(tab);
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (['ArrowRight','ArrowDown'].includes(event.key) ? 1 : -1) + tabs.length) % tabs.length;
  activate(tabs[next], true);
});
