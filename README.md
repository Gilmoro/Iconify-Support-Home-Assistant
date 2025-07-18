# Iconify Support for Home Assistant

This HACS integration enables the use of thousands of icons from [Iconify](https://iconify.design/) everywhere in Home Assistant.

## Features
- Use any Iconify icon in entities, cards, automations, and more
- Just specify the icon as `iconify:iconname` (e.g., `iconify:mdi:home`, `iconify:logos:github`)
- No need for a custom Lovelace card or frontend patch

## Installation
1. Add this repository to HACS as a custom repository (category: integration).
2. Install the integration via HACS.
3. Restart Home Assistant.

## Usage
- In any icon field (entity, card, automation, etc.), use the format `iconify:iconname`.
- Example: To use the GitHub logo, set the icon to `iconify:logos:github`.
- Browse available icons at [Iconify Gallery](https://iconify.design/icon-sets/).

## License
MIT License