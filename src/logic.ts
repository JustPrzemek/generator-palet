import * as R from 'ramda';

export interface RgbColor {
    r: number;
    g: number;
    b: number;
}

export interface HslColor {
    h: number;
    s: number;
    l: number;
}

export type PaletteType = 'analogous' | 'monochromatic' | 'triadic' | 'complementary';

export const hexToRgb = (hex: string): RgbColor => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
};

export const rgbToHex = (rgb: RgbColor): string => {
    const toHex = (c: number): string => {
        const hex = Math.round(c).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
};

export const rgbToHsl = R.memoizeWith(JSON.stringify, (rgb: RgbColor): HslColor => {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
});

export const hslToRgb = R.memoizeWith(JSON.stringify, (hsl: HslColor): RgbColor => {
    const h = hsl.h / 360;
    const s = hsl.s / 100;
    const l = hsl.l / 100;
    let r: number, g: number, b: number;

    const hue2rgb = (p: number, q: number, t: number): number => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };

    if (s === 0) {
        r = g = b = l;
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return { r: r * 255, g: g * 255, b: b * 255 };
});

const wrapHue = (h: number): number => (h + 360) % 360;
const adjustLightness = (l: number, amount: number) => Math.max(0, Math.min(100, l + amount));

const getMonochromaticPalette = (base: HslColor): HslColor[] => [
    { ...base },
    { ...base, l: adjustLightness(base.l, -20) },
    { ...base, l: adjustLightness(base.l, -10) },
    { ...base, l: adjustLightness(base.l, 10) },
    { ...base, l: adjustLightness(base.l, 20) }
];

const getAnalogousPalette = (base: HslColor): HslColor[] => [
    { ...base },
    { ...base, h: wrapHue(base.h - 30) },
    { ...base, h: wrapHue(base.h - 15) },
    { ...base, h: wrapHue(base.h + 15) },
    { ...base, h: wrapHue(base.h + 30) }
];

const getTriadicPalette = (base: HslColor): HslColor[] => [
    { ...base },
    { ...base, h: wrapHue(base.h + 120) },
    { ...base, h: wrapHue(base.h + 240) },
    { ...base, h: wrapHue(base.h + 120), l: adjustLightness(base.l, 15) },
    { ...base, h: wrapHue(base.h + 240), l: adjustLightness(base.l, -15) }
];

const getComplementaryPalette = (base: HslColor): HslColor[] => {
    const complementHue = wrapHue(base.h + 180);
    return [
        { ...base },
        { ...base, h: complementHue },
        { ...base, l: adjustLightness(base.l, 20) },
        { h: complementHue, s: base.s, l: adjustLightness(base.l, 15) },
        { h: complementHue, s: base.s, l: adjustLightness(base.l, -15) }
    ];
};

const strategies = {
    'monochromatic': getMonochromaticPalette,
    'analogous': getAnalogousPalette,
    'triadic': getTriadicPalette,
    'complementary': getComplementaryPalette
};

export const generatePalette = (baseHex: string, type: PaletteType): string[] => {
    return R.pipe(
        hexToRgb,
        rgbToHsl,
        strategies[type] || strategies['monochromatic'],
        R.sort((a: HslColor, b: HslColor) => a.h - b.h),
        R.map(hslToRgb),
        R.map(rgbToHex)
    )(baseHex);
};
