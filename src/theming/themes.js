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
    },
  },
  typography: {
    fontFamily: {
      title: "Audiowide",
    },
  },
});

export default theme;