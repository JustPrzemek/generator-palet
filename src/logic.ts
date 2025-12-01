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

export const rgbToHsl = (rgb: RgbColor): HslColor => {
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
};

export const hslToRgb = (hsl: HslColor): RgbColor => {
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
};

export const generatePalette = (baseHex: string, type: PaletteType): string[] => {
    const baseHsl = rgbToHsl(hexToRgb(baseHex));
    const palette: HslColor[] = [baseHsl];

    const wrapHue = (h: number): number => (h + 360) % 360;

    switch (type) {
        case 'monochromatic':
            palette.push({ ...baseHsl, l: Math.max(0, baseHsl.l - 20) });
            palette.push({ ...baseHsl, l: Math.max(0, baseHsl.l - 10) });
            palette.push({ ...baseHsl, l: Math.min(100, baseHsl.l + 10) });
            palette.push({ ...baseHsl, l: Math.min(100, baseHsl.l + 20) });
            break;

        case 'analogous':
            palette.push({ ...baseHsl, h: wrapHue(baseHsl.h - 30) });
            palette.push({ ...baseHsl, h: wrapHue(baseHsl.h - 15) });
            palette.push({ ...baseHsl, h: wrapHue(baseHsl.h + 15) });
            palette.push({ ...baseHsl, h: wrapHue(baseHsl.h + 30) });
            break;

        case 'triadic':
            palette.push({ ...baseHsl, h: wrapHue(baseHsl.h + 120) });
            palette.push({ ...baseHsl, h: wrapHue(baseHsl.h + 240) });
            palette.push({ ...baseHsl, h: wrapHue(baseHsl.h + 120), l: Math.min(100, baseHsl.l + 15) });
            palette.push({ ...baseHsl, h: wrapHue(baseHsl.h + 240), l: Math.max(0, baseHsl.l - 15) });
            break;

        case 'complementary':
            const complementHue = wrapHue(baseHsl.h + 180);
            palette.push({ ...baseHsl, h: complementHue });
            palette.push({ ...baseHsl, l: Math.min(100, baseHsl.l + 20) });
            palette.push({ h: complementHue, s: baseHsl.s, l: Math.min(100, baseHsl.l + 15) });
            palette.push({ h: complementHue, s: baseHsl.s, l: Math.max(0, baseHsl.l - 15) });
            break;
    }

    return palette
        .sort((a, b) => a.h - b.h)
        .map(hslToRgb)
        .map(rgbToHex);
};