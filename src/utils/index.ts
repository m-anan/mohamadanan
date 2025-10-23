export const _revalidate: number = 3600 as const;

export const slugify = (slug: string) =>
  slug
    ?.normalize("NFD") // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, "") // convert accented letters from uppercase to llowercase
    ?.toLowerCase() //lowercase whole string
    .replace(/^\s+|\s+$/g, "") // trim
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars like '/' '?' etc
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes into single -

export default function staticBlur() {
  const blurSVG = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'><filter id='b' color-interpolation-filters='sRGB'><feGaussianBlur stdDeviation='1'/></filter><rect preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%' stroke-width="3" stroke="#7b8487" fill="#7b8487"/></svg>`;
  const toBase64 = (str: string) => Buffer.from(str).toString("base64");

  return `data:image/svg+xml;base64,${toBase64(blurSVG)}`;
}
