"""
Iconify integration for Home Assistant
"""

from homeassistant.core import HomeAssistant
from homeassistant.helpers.icon import register_icon_provider

DOMAIN = "iconify"

async def async_setup(hass: HomeAssistant, config: dict):
    def iconify_icon(icon_name: str) -> str | None:
        if icon_name.startswith("iconify:"):
            # Return the icon name for frontend rendering
            return icon_name
        return None
    register_icon_provider(DOMAIN, iconify_icon)
    return True
