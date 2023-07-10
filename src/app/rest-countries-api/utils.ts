import { COLOR } from "./colors.const";

export function getGeneralDynamicStyles(darkModeState: string, element: any) {
    if (darkModeState === 'dark') {
        element.style.backgroundColor = COLOR.$dm_very_dark_blue;
        element.style.color = COLOR.$white;
    } else {
        element.style.backgroundColor = COLOR.$lm_very_light_gray;
        element.style.color = COLOR.$lm_very_dark_blue;
    }
}

export function getElementsDynamicStyles(darkModeState: string, element: any) {
    if (darkModeState === 'dark') {
        element.style.backgroundColor = COLOR.$dm_dark_blue;
        element.style.color = COLOR.$lm_dark_gray;
    } else {
        element.style.backgroundColor = COLOR.$white;
        element.style.color = COLOR.$lm_very_dark_blue;
    }
}