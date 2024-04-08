import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Link,
} from "@mui/material";
import MyBox from "../MyBox";
import { MyDrawerProps } from "./types";
import { useNavigate } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";

const Drawer = ({ navItems, handleDrawerToggle }: MyDrawerProps) => {
  const navigate = useNavigate();

  return (
    <MyBox onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <img
          style={{
            height: 100,
            width: 120,
          }}
          alt="Logo"
          src="https://www.app.akka.finance/static/media/akka-colorfull1.e14f6961870541109dba75ec1c36da0e.svg"
        />
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => {
                navigate(item.path);
              }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <Link
            href="https://github.com/Akka-Finance/akka-interface-sdk-example"
            color="#000000"
            sx={{ mx: "auto" }}
          >
            <GitHubIcon />
          </Link>
        </ListItem>
      </List>
    </MyBox>
  );
};

export default Drawer;
