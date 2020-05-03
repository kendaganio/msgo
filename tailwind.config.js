const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/ui")],
};
