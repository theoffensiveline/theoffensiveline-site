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
import Avatar from "@mui/material/Avatar";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useTheme } from "../ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useFeedback } from "../contexts/FeedbackContext";
import { useLeagueDoc } from "../hooks/useLeagueDoc";
import { useNewsletterDoc } from "../hooks/useNewsletterDoc";
import { ColorConstants } from "./constants/ColorConstants";
import type { LeagueFeature } from "../types/firestore";

/** Nav items gated by league feature flags, in display order. */
const FEATURE_PAGES: [LeagueFeature, string][] = [
  ["submit", "Submit"],
  ["bylaws", "Bylaws"],
  ["leaderboards", "Leaderboards"],
  ["survivor", "Survivor"],
  ["hotdogs", "Hot Dogs"],
];

/** Pages that represent navigation actions, not content. */
const ACTION_PAGES = new Set(["Select Newsletter", "Change Newsletter", "Change League"]);

export default function NavBar() {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, signOut } = useAuth();
  const { openFeedback } = useFeedback();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [isVisible, setIsVisible] = React.useState(true);
  const lastScrollYRef = React.useRef(0);
  const [leagueId, setLeagueId] = React.useState<string | null>(null);
  const [newsletterId, setNewsletterId] = React.useState<string | null>(null);

  const colors = ColorConstants[theme as "light" | "dark"];

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

  // Hide-on-scroll using a ref so we don't re-bind the listener on every scroll.
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Newsletter mode whenever a newsletter is selected (features pop in once
  // the doc loads, same as league mode always behaved). Feature links stay on
  // league-keyed routes pointed at the newsletter's activeLeagueId — the
  // /n/... route migration is deferred to #103 E.
  const { data: newsletterDoc, isFetched: newsletterFetched } = useNewsletterDoc(
    newsletterId ?? undefined
  );
  const { data: leagueDoc } = useLeagueDoc(!newsletterId ? (leagueId ?? undefined) : undefined);
  const inNewsletterMode = !!newsletterId;
  const featureLeagueId = inNewsletterMode ? newsletterDoc?.activeLeagueId : leagueId;

  // Self-heal a stale selection: if the selected newsletter no longer exists
  // (deleted), drop back to bare-league mode so feature nav can recover.
  React.useEffect(() => {
    if (newsletterId && newsletterFetched && newsletterDoc === null) {
      localStorage.removeItem("selectedNewsletterId");
      setNewsletterId(null);
    }
  }, [newsletterId, newsletterFetched, newsletterDoc]);

  const getPages = () => {
    // No page nav on the picker itself — every button would either point
    // back here or at the selection the user is switching away from.
    if (location.pathname === "/league-picker") {
      return [];
    }
    if (!newsletterId && !leagueId) {
      return ["Select Newsletter"];
    }
    const features = (inNewsletterMode ? newsletterDoc?.features : leagueDoc?.features) ?? [];
    const featureLabels = FEATURE_PAGES.filter(([feature]) => features.includes(feature)).map(
      ([feature, page]) =>
        // In newsletter mode the `submit` flag powers the newsletter-submission
        // page, not the legacy standalone Submit page.
        feature === "submit" && inNewsletterMode ? "Newsletter Submit" : page
    );
    return ["Home", ...featureLabels, inNewsletterMode ? "Change Newsletter" : "Change League"];
  };

  const pages = getPages();

  // Resolve a page label to its target path (mirror of redirect() without the
  // side effects, so we can highlight the active route and reuse for nav).
  const pathFor = (page: string): string => {
    if (ACTION_PAGES.has(page)) {
      return "/league-picker";
    }
    if (page === "Home") {
      return inNewsletterMode ? `/n/${newsletterId}` : `/home/${leagueId}`;
    }
    if (page === "Survivor") {
      return `/survivorHome/${featureLeagueId}`;
    }
    if (page === "Hot Dogs") {
      return `/league/${featureLeagueId}/hot-dogs`;
    }
    if (page === "Newsletter Submit") {
      return `/newsletter-submit/${featureLeagueId}`;
    }
    return `/${page.toLowerCase()}/${featureLeagueId}`;
  };

  const isActive = (page: string): boolean => {
    const target = pathFor(page);
    if (!target || target === "/league-picker") return false;
    // Exact match for Home (newsletter home has sub-routes like /settings);
    // prefix match for content pages so sub-routes keep the parent active.
    if (page === "Home") return location.pathname === target;
    return location.pathname === target || location.pathname.startsWith(`${target}/`);
  };

  const redirect = (page: string) => {
    navigate(pathFor(page));
    handleCloseNavMenu();
  };

  // Close the mobile menu whenever the route changes.
  React.useEffect(() => {
    setAnchorElNav(null);
  }, [location.pathname]);

  const navTextColor = "#ECECDF";
  const activeColor = colors.newsBlue;
  const hoverBg = "rgba(255,255,255,0.08)";

  const desktopButtonSx = (page: string) => {
    const active = isActive(page);
    const base: Record<string, unknown> = {
      my: 2,
      color: navTextColor,
      display: "block",
      px: 1.5,
      borderRadius: 1,
      position: "relative",
      fontWeight: active ? 600 : 400,
      opacity: active ? 1 : 0.85,
      transition: "background-color 0.15s ease, opacity 0.15s ease",
      "&:hover": {
        backgroundColor: hoverBg,
        opacity: 1,
      },
    };
    if (active) {
      base["&::after"] = {
        content: '""',
        position: "absolute",
        left: 8,
        right: 8,
        bottom: 4,
        height: 2,
        borderRadius: 1,
        backgroundColor: activeColor,
      };
    }
    return base;
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        transition: "transform 0.3s ease-in-out",
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#3A404C",
        boxShadow: "none",
        borderBottom: "3px solid transparent",
        borderImage: "linear-gradient(90deg, #FF3366 0%, #20A4F4 100%) 1",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ gap: 1 }}>
          {/* Brand logo + wordmark — doubles as Home link */}
          <Box
            onClick={() => pages.length > 0 && redirect("Home")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: pages.length > 0 ? "pointer" : "default",
              mr: 2,
              userSelect: "none",
            }}
          >
            <Box
              component="img"
              src="/logo.png"
              alt="The Offensive Line"
              sx={{
                width: 36,
                height: 36,
                borderRadius: 1,
                objectFit: "contain",
              }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                display: { xs: "none", md: "block" },
                color: navTextColor,
                fontWeight: 700,
                letterSpacing: 0.3,
              }}
            >
              The Offensive Line
            </Typography>
          </Box>

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
                "& .MuiPaper-root": {
                  backgroundColor: colors.componentBackground,
                },
                "& .MuiMenuItem-root": {
                  color: colors.text,
                  "&:hover": {
                    backgroundColor: hoverBg,
                  },
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => redirect(page)}
                  sx={{
                    fontWeight: isActive(page) ? 600 : 400,
                    color: isActive(page) ? colors.newsBlue : colors.text,
                    borderLeft: isActive(page)
                      ? `3px solid ${colors.newsBlue}`
                      : "3px solid transparent",
                  }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop menu — content pages left, action pages pushed right */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 0.5 }}>
            {pages
              .filter((page) => !ACTION_PAGES.has(page))
              .map((page) => (
                <Button key={page} onClick={() => redirect(page)} sx={desktopButtonSx(page)}>
                  {page}
                </Button>
              ))}
            {pages
              .filter((page) => ACTION_PAGES.has(page))
              .map((page) => (
                <Button
                  key={page}
                  onClick={() => redirect(page)}
                  size="small"
                  sx={{
                    my: 2,
                    ml: "auto",
                    color: navTextColor,
                    border: "1px solid transparent",
                    borderImage: "linear-gradient(90deg, #FF3366 0%, #20A4F4 100%) 1",
                    borderRadius: 999,
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: hoverBg,
                    },
                  }}
                >
                  {page}
                </Button>
              ))}
          </Box>

          {/* Theme toggle and user menu */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              sx={{ ml: 1, color: navTextColor }}
              onClick={toggleTheme}
              aria-label="toggle theme"
            >
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
                  {currentUser.photoURL ? (
                    <Avatar
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || "account"}
                      sx={{ width: 32, height: 32 }}
                    />
                  ) : (
                    <AccountCircle />
                  )}
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
                  sx={{
                    "& .MuiPaper-root": {
                      backgroundColor: colors.componentBackground,
                    },
                    "& .MuiMenuItem-root": {
                      color: colors.text,
                      "&:hover": {
                        backgroundColor: hoverBg,
                      },
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      navigate("/profile");
                      handleCloseUserMenu();
                    }}
                  >
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      openFeedback();
                      handleCloseUserMenu();
                    }}
                  >
                    <Typography textAlign="center">Feedback</Typography>
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
