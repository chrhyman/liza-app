import { useState } from 'react'
import { useAppSelector } from '@/store'
import {
  AccountCircle,
  DarkMode,
  LightMode,
  MenuOutlined,
  Search,
} from '@mui/icons-material'
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useAppTheme } from '@/app/theme/theme-context'
import { selectUser } from '@/features/auth/auth-selector'

const Navbar = () => {
  const { toggleTheme, mode } = useAppTheme()
  const theme = useTheme()
  const user = useAppSelector(selectUser)

  const belowMediumWidth = useMediaQuery(theme.breakpoints.down('md'))
  const belowSmallWidth = useMediaQuery(theme.breakpoints.down('sm'))

  const [searchQuery, setSearchQuery] = useState('')
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleUserMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleUserMenuClose = () => {
    setAnchorEl(null)
  }

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen)

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          {/* Primary navigation */}
          <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
            {belowMediumWidth && (
              <IconButton onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                <MenuOutlined />
              </IconButton>
            )}
            <Typography variant="h6" sx={{ mr: 2 }}>
              Home
            </Typography>
            {!belowSmallWidth && (
              <>
                <Typography variant="h6" sx={{ mr: 2 }}>
                  Games
                </Typography>
                <Typography variant="h6" sx={{ mr: 2 }}>
                  Players
                </Typography>
                <Typography variant="h6" sx={{ mr: 2 }}>
                  Stats
                </Typography>
              </>
            )}
          </Box>

          {/* User menu button */}
          {!belowMediumWidth && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {user ? (
                <Button color="inherit" onClick={handleUserMenuOpen}>
                  <Typography sx={{ mr: 1 }}>{user.username}</Typography>
                  <AccountCircle />
                </Button>
              ) : (
                <Button color="inherit">
                  <Typography>login / register</Typography>
                </Button>
              )}

              {/* Search bar */}
              <TextField
                variant="outlined"
                size="small"
                placeholder="Find a game"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <Search
                        color={mode === 'dark' ? 'secondary' : 'inherit'}
                        sx={{ mr: 1 }}
                      />
                    ),
                  },
                }}
                sx={{
                  mx: 1,
                  borderRadius: 10,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 10,
                    color: 'inherit',
                  },
                  '& .MuiOutlinedInput-input': {
                    color: 'inherit',
                  },
                }}
              />

              {/* Theme toggle */}
              <IconButton onClick={toggleTheme} color="inherit">
                {mode === 'dark' ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* User menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleUserMenuClose}
      >
        <MenuItem onClick={handleUserMenuClose}>Profile page</MenuItem>
        <MenuItem onClick={handleUserMenuClose}>View stats</MenuItem>
        <MenuItem onClick={handleUserMenuClose}>Settings</MenuItem>
        <MenuItem onClick={handleUserMenuClose}>Log out</MenuItem>
      </Menu>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <List>
          {belowSmallWidth && (
            <>
              <ListItemButton>
                <ListItemText primary="Games" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Players" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Stats" />
              </ListItemButton>
            </>
          )}

          {user ? (
            <>
              <ListSubheader>{user.username}</ListSubheader>
              <ListItemButton>
                <ListItemText primary="Profile page" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="View stats" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Settings" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Log out" />
              </ListItemButton>
            </>
          ) : (
            <ListItemButton>
              <ListItemText primary="Log in or sign up" />
            </ListItemButton>
          )}

          <ListItemButton onClick={toggleTheme}>
            <ListItemIcon>
              {mode === 'dark' ? <LightMode /> : <DarkMode />}
            </ListItemIcon>
            <ListItemText primary={mode === 'dark' ? 'Light UI' : 'Dark UI'} />
          </ListItemButton>
        </List>
      </Drawer>
    </Box>
  )
}

export default Navbar
