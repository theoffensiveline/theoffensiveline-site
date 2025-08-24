import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "../ThemeContext";
import { leagueIds } from "./constants/LeagueConstants";

function NavBar() {
  const { theme, toggleTheme } = useTheme();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [leagueId, setLeagueId] = React.useState(null);

  // Update leagueId state when localStorage changes or URL changes
  React.useEffect(() => {
    const handleStorageChange = () => {
      const storedLeagueId = localStorage.getItem("selectedLeagueId");
      setLeagueId(storedLeagueId);
    };

    // Initial check and URL-based updates
    handleStorageChange();

    // Listen for changes in other tabs/windows
    window.addEventListener("storage", handleStorageChange);
    // Listen for URL changes
    window.addEventListener("popstate", handleStorageChange);
    // Listen for custom league change event
    window.addEventListener("leagueChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("popstate", handleStorageChange);
      window.removeEventListener("leagueChange", handleStorageChange);
    };
  }, []);

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

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const getPages = () => {
    if (!leagueId) {
      return ["Select League"];
    }
    if (
      leagueId !== leagueIds.mainLeague
    ) {
      return ["Home", "Change League"];
    }
    return [
      "Home",
      "Submit",
      "Bylaws",
      "Leaderboards",
      "Survivor",
      "Hot Dogs",
      "Change League",
    ];
  };

  const pages = getPages();

  const redirect = (page) => {
    if (page === "Select League" || page === "Change League") {
      window.location.href = "/";
    } else if (page === "Home") {
      window.location.href = `/home/${leagueId}`;
    } else if (page === "Hot Dogs") {
      window.location.href = `/league/${leagueId}/hot-dogs`;
    } else {
      window.location.href = `/${page.toLowerCase()}/${leagueId}`;
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        top: isVisible ? "0" : "-100px",
        transition: "top 0.3s",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="a"
            href="/"
            sx={{
              height: 40,
              mr: 2,
              display: { xs: "none", md: "flex" },
              cursor: "pointer",
            }}
          >
            <Box
              component="img"
              sx={{ height: "100%" }}
              alt="Logo"
              src="/logo.png"
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
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
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            The Offensive Line
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => redirect(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <IconButton onClick={toggleTheme} color="inherit">
            {theme === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
