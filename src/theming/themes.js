import { createMuiTheme } from "@material-ui/core/styles";


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#8be3ff",
    },
    secondary: {
      main: "#7908be",
    },
    background: {
      paper: "#fff",
      default: "#fafafa",
      appBar: "linear-gradient(to right, #8be3ff, #7908be)",
      stepIcon: "linear-gradient(136deg, #8be3ff, #7908be)",
      stepLine: "linear-gradient(95deg, #8be3ff, #7908be)",
    },
  },
  typography: {
    fontFamily: {
      title: "Audiowide",
      intro: "Londrina Solid",
    },
  },
});

export default theme;