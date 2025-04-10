import * as React from 'react';
import {
    AppBar,
    Stack,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    Paper,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useMediaQuery
} from '@mui/material';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import NavBar from '../navbar/NavBar';

import { MenuItems, ErrandMenuItems } from '../../menuItems';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useAuth } from '../../context/AuthContext';

const drawerWidth = 240;

function CustomDrawer(props) {
    const { window, children } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const location = useLocation()
    const isActiveMenu = (path) => {
        return !!matchPath({ path }, location.pathname)
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const DrawerHeader = styled('div')(({ theme }) => ({
        backgroundColor: '#1976d2',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    }));


    const { user } = useAuth()
    const drawer = (
        <React.Fragment>
            <Divider />
            <List>
                {(user.isErrand ? ErrandMenuItems : MenuItems).map(({ title, to, icon }, index) => (
                    <ListItem key={title} disablePadding component={Link} to={`/${to}`} onClick={handleDrawerToggle} selected={isActiveMenu(title.toLowerCase())}>
                        {/* <Link to={`/${text.toLowerCase()}`}> */}
                        <ListItemButton  >
                            <ListItemIcon>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={title} />
                        </ListItemButton>
                        {/* </Link> */}
                    </ListItem>
                ))}
            </List>
        </React.Fragment>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    const theme = useTheme()
    const mobileScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const [value, setValue] = React.useState(0);
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* <AppBar
                position="fixed"
                sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        // onClick={()=>setMobileOpen(true)}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Responsive drawer
                    </Typography>
                </Toolbar>
            </AppBar> */}
            <NavBar drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >

                    {drawer}
                </Drawer> */}
                {
                    mobileScreen &&
                    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100 }} elevation={3}>
                        <BottomNavigation
                            showLabels
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        >
                            {
                                MenuItems.map(({ title, icon, to }, index) => (
                                    <BottomNavigationAction label={title} icon={icon} component={Link} to={to} />
                                ))
                            }
                        </BottomNavigation>
                    </Paper>
                }
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {/* <DrawerHeader>{SvgImages['Logo']}</DrawerHeader> */}
                    <DrawerHeader>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ width: '100%' }}
                        >
                            <Typography variant='h5' >
                                {user.isErrand ? "Errand" : "Job Poster"}
                            </Typography>
                        </Stack>
                    </DrawerHeader>
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)`, minHeight: '100vh' } }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}

export default CustomDrawer;
