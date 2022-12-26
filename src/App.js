import logo from "./logo.svg";
import "./App.css";
import QuoteBox from "./QuoteBox.js";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CSSTransition } from "react-transition-group";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <header className="App-header">
          <QuoteBox />
        </header>
      </ThemeProvider>
    </div>
  );
}

export default App;
