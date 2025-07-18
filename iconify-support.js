// Iconify Support for Home Assistant (frontend resource)
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

  // Patch ha-icon to render iconify: icons
  customElements.whenDefined('ha-icon').then(() => {
    const HaIcon = customElements.get('ha-icon');
    if (HaIcon.patchedWithIconify) return;
    const originalRender = HaIcon.prototype.render;
    HaIcon.prototype.render = function() {
      const icon = this.icon;
      if (icon && icon.startsWith('iconify:')) {
        const iconName = icon.replace('iconify:', '');
        return window.LitHtml.html`<iconify-icon icon="${iconName}" style="font-size: 24px;"></iconify-icon>`;
      }
      return originalRender.call(this);
    };
    HaIcon.patchedWithIconify = true;
    console.info('[iconify-support] ha-icon patched for Iconify icons');
  });
})();
