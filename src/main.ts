import { generatePalette, type PaletteType } from './logic.js';
import { Maybe } from './functional-utils.js';

const getElement = <T extends HTMLElement>(id: string): Maybe<T> =>
    Maybe.fromNullable(document.getElementById(id) as T);

const colorInputMaybe = getElement<HTMLInputElement>('base-color');
const paletteTypeSelectMaybe = getElement<HTMLSelectElement>('palette-type');
const paletteContainerMaybe = getElement<HTMLDivElement>('palette-container');
const notificationMaybe = getElement<HTMLDivElement>('copy-notification');

let notificationTimeout: number;

const showCopyNotification = (): void => {
    if (notificationTimeout) {
        clearTimeout(notificationTimeout);
    }

    notificationMaybe.map(notification => {
        notification.classList.add('show');
        notificationTimeout = window.setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    });
};

const handleColorBoxClick = (colorHex: string): void => {
    if (!navigator.clipboard) {
        alert("Twoja przeglądarka nie wspiera kopiowania do schowka.");
        return;
    }

    navigator.clipboard.writeText(colorHex)
        .then(() => showCopyNotification())
        .catch(err => {
            console.error('Nie udało się skopiować: ', err);
            alert("Nie udało się skopiować koloru.");
        });
};

const createColorBox = (color: string): HTMLElement => {
    const colorBox = document.createElement('div');
    colorBox.className = 'color-box';
    colorBox.style.backgroundColor = color;

    const colorLabel = document.createElement('span');
    colorLabel.textContent = color;
    colorBox.appendChild(colorLabel);

    colorBox.addEventListener('click', () => handleColorBoxClick(color));
    return colorBox;
};

const renderPalette = (): void => {
    const baseColor = colorInputMaybe.map(input => input.value).getOrElse('#000000');
    const paletteType = paletteTypeSelectMaybe
        .map(select => select.value as PaletteType)
        .getOrElse('monochromatic');

    const colors = generatePalette(baseColor, paletteType);

    paletteContainerMaybe.map(container => {
        container.innerHTML = '';
        colors.forEach(color => container.appendChild(createColorBox(color)));
    });
};

colorInputMaybe.map(input => input.addEventListener('input', renderPalette));
paletteTypeSelectMaybe.map(select => select.addEventListener('change', renderPalette));

document.addEventListener('DOMContentLoaded', renderPalette);
