import { ShoppingCart } from "@mui/icons-material"
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material"
import { Link, NavLink } from "react-router-dom"
import { useAppSelector } from "../store/configureStore"

interface Props {
  toggleMode: () => void,
  darkMode: boolean
}

const midLinks = [
  { title: 'catalog', path: '/catalog' },
  { title: 'contact', path: '/contact' },
  { title: 'about', path: '/about' }
]

const rightLinks = [
  { title: 'login', path: '/login' },
  { title: 'register', path: '/register' },

]

const navStyles = {
  textDecoration: 'none',
  color: 'inherit',
  typography: 'p',
  '&:hover': {
    color: 'grey.500'
  },
  '&.active': {
    color: 'text.secondary'
  }
}

const Header = ({ toggleMode, darkMode }: Props) => {
  const { basket } = useAppSelector(state => state.basket)
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0)
  return (
    <AppBar position="static" sx={{ mb: 4 }}>

      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        <Box display='flex' alignItems='center'>
          <Typography variant="h6" component={NavLink} to="/" sx={navStyles}>D-NETSTORE</Typography>
          <Switch
            checked={darkMode}
            onChange={toggleMode}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Box>


        <List sx={{ display: 'flex' }}>
          {midLinks.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={navStyles}
            >
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box display='flex' alignItems='center'>
          <IconButton size="large" component={Link} to="/basket" edge="start" color="inherit" sx={{ mr: 2 }}>
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: 'flex' }}>
            {rightLinks.map(({ title, path }) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={navStyles}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header