
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Header from "./Header";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.css"



function App() {
  const [darkMode, setDarkMode] = useState(false)
  const mode = darkMode ? 'dark' : 'light'
  const theme = createTheme({
    palette: {
      mode,
      background: {
        default: mode === "light" ? "#eaeaea" : "#121212"
      }
    }
  })


  const toggleMode = () => setDarkMode(!darkMode)

  return (

    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      <CssBaseline />
      <Header toggleMode={toggleMode} darkMode={darkMode} />
      <Container>
        <Outlet />
      </Container>

    </ThemeProvider>


  )
}

export default App
