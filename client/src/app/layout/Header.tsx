import { AppBar, Switch, Toolbar, Typography } from "@mui/material"

interface Props{
  toggleMode: () => void,
  darkMode: boolean
}

const Header = ({toggleMode, darkMode}: Props) => {
  return (
    <AppBar position="static" sx={{mb:4}}>
    
   <Toolbar>
   <Typography variant="h6">Netmmerce</Typography>
   <Switch
  checked={darkMode}
  onChange={toggleMode}
  inputProps={{ 'aria-label': 'controlled' }}
/>
   </Toolbar>
    </AppBar>
  )
}

export default Header