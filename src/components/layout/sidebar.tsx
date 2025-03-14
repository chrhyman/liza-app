import { Link } from 'react-router'
import {
  Avatar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { DarkMode, LightMode } from '@mui/icons-material'
import { useAppTheme } from '@/app/theme/theme-context'

const Sidebar = () => {
  const { toggleTheme, mode } = useAppTheme()
  // use store to determine if authenticated

  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
      <List sx={{ width: 240 }}>
        <ListItem>
          <Avatar sx={{ bgcolor: 'primary.main' }}>U</Avatar>
          <ListItemText primary="User" />
        </ListItem>

        <ListItemButton component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton component={Link} to="/lobby">
          <ListItemText primary="Lobbies" />
        </ListItemButton>

        <ListItemButton component={Link} to="/login">
          <ListItemText primary="Login" />
        </ListItemButton>

        <ListItem>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === 'light' ? <DarkMode /> : <LightMode />}
          </IconButton>
        </ListItem>
      </List>
    </Drawer>
  )
}

export default Sidebar
