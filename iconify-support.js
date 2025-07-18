class IconifyIconPatch extends HTMLElement {
  connectedCallback() {
    if (customElements.get("ha-icon")) {
      this.patch();
    } else {
      customElements.whenDefined("ha-icon").then(() => this.patch());
    }
  }

  patch() {
    const HaIcon = customElements.get("ha-icon");
    if (HaIcon.patchedWithIconify) return;

    const originalRender = HaIcon.prototype.render;
    HaIcon.prototype.render = function () {
      const icon = this.icon;
      if (icon?.startsWith("iconify:")) {
        const iconName = icon.replace("iconify:", "");
        return window.LitHtml.html`
          <iconify-icon icon="${iconName}" style="font-size: inherit;"></iconify-icon>
        `;
      }
      return originalRender.call(this);
    };

    HaIcon.patchedWithIconify = true;
    console.info("[iconify-support] ha-icon patched for Iconify icons");
  }
}

customElements.define("iconify-icon-patch", IconifyIconPatch);
document.body.appendChild(document.createElement("iconify-icon-patch"));