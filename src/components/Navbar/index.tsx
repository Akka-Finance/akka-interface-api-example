import React from "react";
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import MyBox from "../MyBox";
import MenuIcon from "@mui/icons-material/Menu";
import MyDrawer from "./MyDrawer";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import GitHubIcon from "@mui/icons-material/GitHub";

const drawerWidth = 240;

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <>
      <AppBar component="nav" color="default">
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: "left",
              display: { xs: "none", sm: "block" },
            }}
          >
            <img
              style={{
                width: 100,
              }}
              alt="logo"
              src="logo-with-text.png"
            />
          </Typography>
          <MyBox
            sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
          >
            {routes.map((route) => (
              <Button
                key={route.name}
                color="primary"
                onClick={() => {
                  navigate(route.path);
                }}
              >
                {route.name}
              </Button>
            ))}

            <Link
              href="https://github.com/Akka-Finance/akka-interface-api-example"
              color="#000000"
              sx={{ ml: 2 }}
            >
              <GitHubIcon />
            </Link>
          </MyBox>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <MyDrawer navItems={routes} handleDrawerToggle={handleDrawerToggle} />
        </Drawer>
      </nav>
    </>
  );
};

export default Navbar;
