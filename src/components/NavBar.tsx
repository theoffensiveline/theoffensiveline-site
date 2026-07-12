import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useTheme } from "../ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useLeagueDoc } from "../hooks/useLeagueDoc";
import { useNewsletterDoc } from "../hooks/useNewsletterDoc";
import type { LeagueFeature } from "../types/firestore";

/** Nav items gated by league feature flags, in display order. */
const FEATURE_PAGES: [LeagueFeature, string][] = [
  ["submit", "Submit"],
  ["bylaws", "Bylaws"],
  ["leaderboards", "Leaderboards"],
  ["survivor", "Survivor"],
  ["hotdogs", "Hot Dogs"],
];

export default function NavBar() {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [leagueId, setLeagueId] = React.useState<string | null>(null);
  const [newsletterId, setNewsletterId] = React.useState<string | null>(null);

  // Update selection state when localStorage changes or URL changes.
  // selectedNewsletterId is the primary key (#108); selectedLeagueId remains
  // for leagues without a newsletter context until sub-issue C.
  React.useEffect(() => {
    const handleStorageChange = () => {
      setLeagueId(localStorage.getItem("selectedLeagueId"));
      setNewsletterId(localStorage.getItem("selectedNewsletterId"));
    };

    // Initial check and URL-based updates
    handleStorageChange();

    // Listen for changes in other tabs/windows
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("popstate", handleStorageChange);
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
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
    handleCloseUserMenu();
  };

  // Newsletter mode when a newsletter is selected; league mode otherwise.
  // Feature links stay on league-keyed routes pointed at the newsletter's
  // activeLeagueId — the /n/... route migration is deferred to #103 E.
  const { data: newsletterDoc } = useNewsletterDoc(newsletterId ?? undefined);
  const { data: leagueDoc } = useLeagueDoc(!newsletterId ? (leagueId ?? undefined) : undefined);
  const inNewsletterMode = !!newsletterId && !!newsletterDoc;
  const featureLeagueId = inNewsletterMode ? newsletterDoc.activeLeagueId : leagueId;

  const getPages = () => {
    // No page nav on the picker itself — every button would either point
    // back here or at the selection the user is switching away from.
    if (location.pathname === "/league-picker") {
      return [];
    }
    if (!newsletterId && !leagueId) {
      return ["Select Newsletter"];
    }
    const features = (inNewsletterMode ? newsletterDoc.features : leagueDoc?.features) ?? [];
    return [
      "Home",
      ...FEATURE_PAGES.filter(([feature]) => features.includes(feature)).map(([, page]) => page),
      inNewsletterMode ? "Change Newsletter" : "Change League",
    ];
  };

  const pages = getPages();

  const redirect = (page: string) => {
    if (page === "Select Newsletter" || page === "Change Newsletter" || page === "Change League") {
      navigate("/league-picker");
    } else if (page === "Home") {
      navigate(inNewsletterMode ? `/n/${newsletterId}` : `/home/${leagueId}`);
    } else if (page === "Survivor") {
      navigate(`/survivorHome/${featureLeagueId}`);
    } else if (page === "Hot Dogs") {
      navigate(`/league/${featureLeagueId}/hot-dogs`);
    } else {
      navigate(`/${page.toLowerCase()}/${featureLeagueId}`);
    }
    handleCloseNavMenu();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        transition: "transform 0.3s ease-in-out",
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Mobile menu button */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {pages.length > 0 && (
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            )}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
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

          {/* Desktop menu */}
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

          {/* Theme toggle and user menu */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton sx={{ ml: 1, color: "white" }} onClick={toggleTheme}>
              {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            {currentUser ? (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenUserMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    onClick={() => {
                      navigate("/profile");
                      handleCloseUserMenu();
                    }}
                  >
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Button color="inherit" onClick={() => navigate("/login")} sx={{ ml: 2 }}>
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
