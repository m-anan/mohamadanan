import daisyui from "daisyui";
import plugin from "tailwindcss/plugin";

function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `hsl(var(${variable}))`;
    }
    return `hsl(var(${variable}) / ${opacityValue})`;
  };
}

const backfaceVisibility = plugin(function ({ addUtilities }) {
  addUtilities({
    ".backface-visible": {
      "backface-visibility": "visible",
      "-moz-backface-visibility": "visible",
      "-webkit-backface-visibility": "visible",
      "-ms-backface-visibility": "visible",
    },
    ".backface-hidden": {
      "backface-visibility": "hidden",
      "-moz-backface-visibility": "hidden",
      "-webkit-backface-visibility": "hidden",
      "-ms-backface-visibility": "hidden",
    },
  });
});

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: { raw: "(max-width: 768px)" }, // max-widht:768px
      },
      colors: {
        text: {
          primary: withOpacityValue("--text-primary"),
          secondary: withOpacityValue("--text-secondary"),},
          background: {
            primary: withOpacityValue("--background"),
            secondary:withOpacityValue("--background-secondary"),
 
          },
      },
     
    },
  },
  plugins: [backfaceVisibility, daisyui],
  daisyui: {
    themes: [
      {
        glamlight: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
       //text colors
       "--text-primary": "189 100% 17%",
       "--text-secondary": "221 100% 88%",
       // background colors
       "--background": "189 100% 17%",
       "--background-secondary":"221 100% 88%",

        },
      },
      {
        glamdark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
    //text colors
    "--text-primary": "189 100% 17%",
    "--text-secondary": "221 100% 88%",
    // background colors
    "--background": "189 100% 17%",
    "--background-secondary":"221 100% 88%",

        },
      },
    ], 
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
};
export default config;
