import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';

import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../../context/AuthContext';

import { ListItemIcon } from '@mui/material';
import Person from '@mui/icons-material/Person';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Transaction from './transaction';
import Withdrawal from '../../pages/withdrawal';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));

export default function NavBar({ drawerWidth, handleDrawerToggle }) {
	const [open, setOpen] = useState(false)
	const [view, setView] = useState(false)
	const { logout } = useAuth()
	const theme = useTheme();
	const isDownSm = useMediaQuery(theme.breakpoints.up('md'))
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			id="account-menu"
			open={isMenuOpen}
			onClose={handleMenuClose}
			onClick={handleMenuClose}
			PaperProps={{
				elevation: 0,
				sx: {
					overflow: 'visible',
					filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
					mt: 1.5,
					'& .MuiAvatar-root': {
						width: 32,
						height: 32,
						ml: -0.5,
						mr: 1,
					},
					'&:before': {
						content: '""',
						display: 'block',
						position: 'absolute',
						top: 0,
						right: 14,
						width: 10,
						height: 10,
						bgcolor: 'background.paper',
						transform: 'translateY(-50%) rotate(45deg)',
						zIndex: 0,
					},
				},
			}}
			transformOrigin={{ horizontal: 'right', vertical: 'top' }}
			anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
		>

			<MenuItem component={Link} to="/profile">
				<ListItemIcon>
					<Person fontSize="small" />
				</ListItemIcon>
				Profile
			</MenuItem>
			<MenuItem>
				<ListItemIcon>
					<Settings fontSize="small" />
				</ListItemIcon>
				Settings
			</MenuItem>
			<MenuItem onClick={()=>setView(true)}>
				<ListItemIcon>
					<PublishedWithChangesIcon fontSize="small" />
				</ListItemIcon>
				Withdrawal Request
			</MenuItem>
			<MenuItem onClick={logout}>
				<ListItemIcon>
					<Logout fontSize="small" />
				</ListItemIcon>
				Logout
			</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton size="large" aria-label="show 4 new mails" color="inherit">
					<Badge badgeContent={4} color="error">
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem onClick={() => { setOpen(true) }}>
				<IconButton
					size="large"
					aria-label="show 17 new notifications"
					color="inherit"
				>
					<Badge color="error">
						{/* badgeContent={17} */}
						<NotificationsIcon  />
					</Badge>
				</IconButton>
				<p>Transactions</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					size="large"
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);

	const mobileScreen = useMediaQuery(theme.breakpoints.down('sm'))

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="fixed" sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` }
				}}
			>
				<Toolbar>
					{!mobileScreen &&
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							// onClick={()=>setMobileOpen(true)}
							sx={{ mr: 2, display: { sm: 'none' } }}
						>
							<MenuIcon />
						</IconButton>}
					{/* <Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ display: { xs: 'none', sm: 'block' } }}
					>
						SOCIAL APP
					</Typography> */}
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Search>
					{isDownSm &&
						<React.Fragment>
							<Box sx={{ flexGrow: 0.1 }} />
							<Box sx={{ '& > :not(style)': { m: 1 } }}>
								<Fab size="small" aria-label="add">
									<AddIcon />
								</Fab>
								<Fab size="small" aria-label="edit">
									<EditIcon />
								</Fab>
								<Fab size="small" >
									<NavigationIcon />
								</Fab>
								{/* <Fab variant="extended">
								<NavigationIcon sx={{ mr: 1 }} />
								Navigate
							</Fab> */}
								<Fab size="small" aria-label="like">
									<FavoriteIcon />
								</Fab>
							</Box>
						</React.Fragment>
					}
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						<IconButton size="large" aria-label="show 4 new mails" color="inherit">
							<Badge badgeContent={4} color="error">
								<MailIcon />
							</Badge>
						</IconButton>
						<IconButton
							size="large"
							aria-label="show 17 new notifications"
							color="inherit"
						>
							<Badge color="error">
								{/* badgeContent={17} */}
								<NotificationsIcon onClick={() => { setOpen(true) }} />
							</Badge>
						</IconButton>
						<IconButton
							size="large"
							edge="end"
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
							sx={{ mr: 1 }}
						>
							<AccountCircle />
						</IconButton>
					</Box>
					<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
			<Transaction open={open} setOpen={setOpen} />
			<Withdrawal open={view} setOpen={setView} />
		</Box>
	);
}
