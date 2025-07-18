tAt
// Iconify Support for Home Assistant
// Injects Iconify icons into all Home Assistant icon pickers
(function() {
  // Load Iconify script
  if (!window.Iconify) {
    const script = document.createElement('script');
    script.src = 'https://code.iconify.design/3/3.1.0/iconify.min.js';
    script.onload = () => {
      console.info('[iconify-support] Iconify loaded');
    };
    document.head.appendChild(script);
  }

  // Patch all ha-icon-picker instances
  customElements.whenDefined('ha-icon-picker').then(() => {
    const HaIconPicker = customElements.get('ha-icon-picker');
    if (HaIconPicker.patchedWithIconify) return;

    const originalRender = HaIconPicker.prototype.render;
    HaIconPicker.prototype.render = function() {
      const original = originalRender.call(this);
      try {
        const root = this.shadowRoot || this.renderRoot;
        if (!root) return original;
        let tabs = root.querySelector('.tabs');
        if (!tabs) {
          tabs = document.createElement('div');
          tabs.className = 'tabs';
          root.appendChild(tabs);
        }
        if (!root.querySelector('.iconify-tab')) {
          const iconifyTab = document.createElement('button');
          iconifyTab.textContent = 'Iconify';
          iconifyTab.className = 'iconify-tab';
          iconifyTab.style.marginLeft = '8px';
          tabs.appendChild(iconifyTab);

          const iconifyContent = document.createElement('div');
          iconifyContent.className = 'iconify-content';
          iconifyContent.style.display = 'none';
          iconifyContent.style.marginTop = '8px';
          root.appendChild(iconifyContent);

          const searchInput = document.createElement('input');
          searchInput.type = 'text';
          searchInput.placeholder = 'Search Iconify icons...';
          searchInput.style.width = '100%';
          searchInput.style.marginBottom = '8px';
          iconifyContent.appendChild(searchInput);

          const iconsGrid = document.createElement('div');
          iconsGrid.style.display = 'grid';
          iconsGrid.style.gridTemplateColumns = 'repeat(auto-fill, 32px)';
          iconsGrid.style.gap = '8px';
          iconifyContent.appendChild(iconsGrid);

          iconifyTab.addEventListener('click', () => {
            Array.from(root.querySelectorAll('.tab-content')).forEach(e => e.style.display = 'none');
            iconifyContent.style.display = '';
          });

          async function searchIcons(query) {
            iconsGrid.innerHTML = '';
            if (!query) return;
            try {
              const resp = await fetch(`https://api.iconify.design/search?query=${encodeURIComponent(query)}&limit=24`);
              if (!resp.ok) {
                console.error('[iconify-support] Iconify API request failed:', resp.status, resp.statusText);
                iconsGrid.innerHTML = '<span style="color: red;">Failed to load icons. Please try again later.</span>';
                return;
              }
              const data = await resp.json();
              if (!data.icons || data.icons.length === 0) {
                iconsGrid.innerHTML = '<span style="color: gray;">No icons found.</span>';
                return;
              }
              data.icons.forEach(iconName => {
                const iconEl = document.createElement('iconify-icon');
                iconEl.setAttribute('icon', iconName);
                iconEl.style.fontSize = '24px';
                iconEl.style.cursor = 'pointer';
                iconEl.title = iconName;
                iconEl.addEventListener('click', () => {
                  this.icon = `iconify:${iconName}`;
                  this.dispatchEvent(new CustomEvent('value-changed', { detail: { value: this.icon } }));
                });
                iconsGrid.appendChild(iconEl);
              });
            } catch (err) {
              console.error('[iconify-support] Error searching icons:', err);
              iconsGrid.innerHTML = '<span style="color: red;">Error searching icons. Please check your connection.</span>';
            }
          }

          searchInput.addEventListener('input', (e) => {
            searchIcons(e.target.value);
          });
        }
      } catch (e) {
        console.warn('[iconify-support] UI patch error:', e);
      }
      return original;
    };
    HaIconPicker.patchedWithIconify = true;
    console.info('[iconify-support] ha-icon-picker patched for Iconify icons');
  });
})();
