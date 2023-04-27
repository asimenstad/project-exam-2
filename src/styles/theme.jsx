import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
    background: {
      default: "#f2f2f2",
      paper: "#f2f2f2",
    },
  },
  typography: {
    fontFamily: ["Source Sans Pro", "Roboto", "sans-serif"].join(","),
    h1: {
      fontFamily: "Comfortaa",
      fontSize: "3rem",
    },
    h2: {
      fontSize: "1.5rem",
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        color: "background",
        elevation: 0,
      },
      styleOverrides: {
        root: {
          maxWidth: "1200px",
          margin: "auto",
        },
      },
    },

    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: "1200px",
          margin: "auto",
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
        },
      },
    },
  },
});
