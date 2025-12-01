import { generatePalette, type PaletteType } from './logic.js';

const colorInput = document.getElementById('base-color') as HTMLInputElement;
const paletteTypeSelect = document.getElementById('palette-type') as HTMLSelectElement;
const paletteContainer = document.getElementById('palette-container') as HTMLDivElement;
const notification = document.getElementById('copy-notification') as HTMLDivElement;

let notificationTimeout: number;

const showCopyNotification = (): void => {
    if (notificationTimeout) {
        clearTimeout(notificationTimeout);
    }

    notification.classList.add('show');

    notificationTimeout = window.setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
};

const handleColorBoxClick = (colorHex: string): void => {
    if (!navigator.clipboard) {
        alert("Twoja przeglądarka nie wspiera kopiowania do schowka.");
        return;
    }

    navigator.clipboard.writeText(colorHex).then(() => {
        showCopyNotification();
    }).catch(err => {
        console.error('Nie udało się skopiować: ', err);
        alert("Nie udało się skopiować koloru.");
    });
};

const renderPalette = (): void => {
    const baseColor = colorInput.value;
    const paletteType = paletteTypeSelect.value as PaletteType;

    const colors = generatePalette(baseColor, paletteType);

    paletteContainer.innerHTML = '';

    for (const color of colors) {
        const colorBox = document.createElement('div');
        colorBox.className = 'color-box';
        colorBox.style.backgroundColor = color;

        const colorLabel = document.createElement('span');
        colorLabel.textContent = color;

        colorBox.appendChild(colorLabel);

        colorBox.addEventListener('click', () => handleColorBoxClick(color));

        paletteContainer.appendChild(colorBox);
    }
};

colorInput.addEventListener('input', renderPalette);
paletteTypeSelect.addEventListener('change', renderPalette);

document.addEventListener('DOMContentLoaded', renderPalette);