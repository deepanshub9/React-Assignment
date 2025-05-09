import React, { useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const styles = { title: { flexGrow: 1 } };
const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dropdown, setDropdown] = useState<null | HTMLElement>(null);
  const [dropdown2, setDropdown2] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const handleDropdown = (event: MouseEvent<HTMLElement>) => setDropdown(event.currentTarget);
  const handleDropdownClose = () => setDropdown(null);

  const handleDropdown2 = (event: MouseEvent<HTMLElement>) => setDropdown2(event.currentTarget);
  const handleDropdown2Close = () => setDropdown2(null);

  const handleMenuSelect = (pageURL: string) => {
    navigate(pageURL);
    setAnchorEl(null);
    setDropdown(null);
    setDropdown2(null);
  };

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" elevation={0} color="primary">
        <Toolbar>
          <span
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
            onClick={() => navigate("/")}
            aria-label="Go to Home"
          >
            <img
              src="/now-logo1.png"
              alt="NowFlix Logo"
              style={{ height: 38, marginRight: 16, marginLeft: 18, marginTop: 20, marginBottom: 20 }}
            />
          </span>
          <Typography variant="h6" sx={styles.title}>
            Brilliant simplicity meets brilliant entertainment!
          </Typography>
          {isMobile ? (
            <>
              <IconButton aria-label="menu" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit" size="large">
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => handleMenuSelect("/")}>Home</MenuItem>
                <MenuItem onClick={() => handleMenuSelect("/movies/favourites")}>Favourite Movies</MenuItem>
                <MenuItem onClick={() => handleMenuSelect("/actors/favourites")}>Favourite Actors</MenuItem>
                <MenuItem onClick={() => handleMenuSelect("/tv-series/favourites")}>Favourite TV Series</MenuItem>
                <MenuItem onClick={() => handleMenuSelect("/movies/upcoming")}>Upcoming</MenuItem>
                <MenuItem onClick={() => handleMenuSelect("/movies/popular")}>Popular Movies</MenuItem>
                <MenuItem onClick={() => handleMenuSelect("/actors")}>Popular Actors</MenuItem>
                <MenuItem onClick={() => handleMenuSelect("/tv-series")}>Popular TV Series</MenuItem>
                <MenuItem onClick={() => handleMenuSelect("/fantasy/create")}>Create Fantasy Movie</MenuItem>
                <MenuItem onClick={() => handleMenuSelect("/fantasy")}>My Fantasy Movie</MenuItem>
                <MenuItem onClick={() => handleMenuSelect("/playlists")}>Playlists</MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button color="inherit" onClick={() => handleMenuSelect("/")}>Home</Button>
              <Button
                color="inherit"
                endIcon={<ArrowDropDownIcon />}
                onClick={handleDropdown2}
              >
                Browse
              </Button>
              <Menu
                anchorEl={dropdown2}
                open={Boolean(dropdown2)}
                onClose={handleDropdown2Close}
              >
                <MenuItem onClick={() => handleMenuSelect("/movies/upcoming")}>Upcoming Movies</MenuItem>
                <MenuItem onClick={() => handleMenuSelect("/movies/popular")}>Popular Movies</MenuItem>
                <MenuItem onClick={() => handleMenuSelect("/actors")}>Popular Actors</MenuItem>
                <MenuItem onClick={() => handleMenuSelect("/tv-series")}>Popular TV Series</MenuItem>
              </Menu>
              <Button
                color="inherit"
                endIcon={<ArrowDropDownIcon />}
                onClick={handleDropdown}
              >
                Favourites
              </Button>
              <Menu
                anchorEl={dropdown}
                open={Boolean(dropdown)}
                onClose={handleDropdownClose}
              >
                <MenuItem onClick={() => handleMenuSelect("/movies/favourites")}>Movies</MenuItem>
                <MenuItem onClick={() => handleMenuSelect("/actors/favourites")}>Actors</MenuItem>
                <MenuItem onClick={() => handleMenuSelect("/tv-series/favourites")}>TV Series</MenuItem>
              </Menu>
              <Button color="inherit" onClick={() => handleMenuSelect("/fantasy/create")}>Create Fantasy Movie</Button>
              <Button color="inherit" onClick={() => handleMenuSelect("/fantasy")}>My Fantasy Movie</Button>
              <Button color="inherit" onClick={() => handleMenuSelect("/playlists")}>Playlists</Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;