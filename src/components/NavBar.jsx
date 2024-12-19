import * as React from 'react';
import { useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '../ThemeContext';

const pages = ['Home', 'Submit', 'Bylaws', 'Leaderboard', 'Survivor'];

function NavBar() {
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const [isVisible, setIsVisible] = React.useState(true);
    const [lastScrollY, setLastScrollY] = React.useState(0);

    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Hide navbar when scrolling down after 100px
                setIsVisible(false);
            } else {
                // Show navbar when scrolling up
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const redirect = (page) => {
        window.location.href = page.toLowerCase();
    };

    const shouldHidePages = location.pathname === '/' ||
        location.pathname === '/coming-soon' ||
        location.pathname === '/walterPicks' ||
        location.pathname === '/newsletterWalterPicks';

    return (
        <AppBar
            position="fixed"
            sx={{
                top: isVisible ? '0' : '-100px',
                transition: 'top 0.3s',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {!shouldHidePages && (
                        <Box
                            component="img"
                            sx={{
                                height: 40,
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                            }}
                            alt="Logo"
                            src="/logo.png"
                        />
                    )}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        The Offensive Line
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {!shouldHidePages && pages.map((page) => (
                                <MenuItem key={page} onClick={() => redirect(page)}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        The Offensive Line
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {!shouldHidePages && pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => redirect(page)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <IconButton onClick={toggleTheme} color="inherit">
                        {theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;
