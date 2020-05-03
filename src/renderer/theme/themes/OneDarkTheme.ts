import { Theme } from "../Theme";
import { lighten } from "@material-ui/core/styles";
import { cyan, blueGrey } from "@material-ui/core/colors";

export const OneDarkTheme = new Theme("One Dark", "one-dark", {
  palette: {
    common: { black: "#000", white: "#fff" },
    background: {
      paper: lighten("#282c34", 0.05),
      default: "#282c34",
    },
    primary: cyan,
    secondary: blueGrey,
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "rgba(197, 197, 197, 1)",
    },
    divider: "#222",
    text: {
      primary: "#ccc",
      secondary: "rgba(180, 180, 180, 1)",
      disabled: "rgba(121, 7, 7, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
    action: {
      disabled: "#353535",
    },
  },
}, 'os-theme-light')
