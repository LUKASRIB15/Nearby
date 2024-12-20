/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.tsx"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "green-light": "#3B9B62",
        "green-base": "#257F49",
        "green-dark": "#052914",

        "red-light": "#FDEDED",
        "red-base": "#F94144",
        
        "gray-100": "#FCFDFE",
        "gray-200": "#E1EBF4",
        "gray-300": "#C4D0DB",
        "gray-400": "#73808C",
        "gray-500": "#45525F",
        "gray-600": "#1A1F24"
      },
      fontFamily: {
        "app-regular": "Rubik_400Regular",
        "app-medium": "Rubik_500Medium",
        "app-semibold": "Rubik_600SemiBold",
        "app-bold": "Rubik_700Bold"
      }
    },
  },
  plugins: [],
}