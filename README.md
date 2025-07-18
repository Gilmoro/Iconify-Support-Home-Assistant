# Iconify Support for Home Assistant

This custom module enables support for using [Iconify](https://icon-sets.iconify.design) icons in Home Assistant via:

```yaml
icon: iconify:simple-icons:github
```

## How it works

- Patches `ha-icon` to detect `iconify:` prefix
- Uses the Iconify Web Component to render any supported icon

## Installation (Manual or HACS)

1. Install this module
2. Add this resource in **Settings → Dashboards → Resources**:

```
URL: /hacsfiles/iconify-support/iconify-support.js
Type: JavaScript Module
```

3. Also add the Iconify web component:

> **Security Note:** Loading external JavaScript from a CDN may pose security risks. Consider downloading and bundling the Iconify library locally, or ensure you understand the implications of loading third-party scripts.

**Option 1: Load from CDN (less secure):**

```
URL: https://code.iconify.design/3/3.1.0/iconify.min.js
Type: JavaScript Module
```

4. Restart Home Assistant

## Usage

```yaml
icon: iconify:simple-icons:github
```