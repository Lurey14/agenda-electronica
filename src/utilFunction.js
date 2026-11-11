export const esColorClaro = (hexColor) => {
  if (!hexColor || !/^#([A-Fa-f0-9]{3}){1,2}$/.test(hexColor)) return false;
  let c = hexColor.substring(1);
  if (c.length === 3)
    c = c
      .split("")
      .map((char) => char + char)
      .join("");
  const num = parseInt(c, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
};
