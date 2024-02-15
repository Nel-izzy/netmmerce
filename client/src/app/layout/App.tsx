
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Header from "./Header";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.css"
import { getCookie } from '../utils/util';
import agent from '../api/agent';
import Loader from './Loader';
import { useAppDispatch } from '../store/configureStore';
import { setBasket } from '../../features/basket/basketSlice';



function App() {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.get()
        .then(basket => dispatch(setBasket(basket)))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [dispatch])


  const toggleMode = () => setDarkMode(!darkMode)

  if (loading) return <Loader message='Initialising App...' />

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
