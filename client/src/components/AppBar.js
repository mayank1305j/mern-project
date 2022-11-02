import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const logout = () => {
    Cookies.remove("token");
    navigate("/login");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" className="text-white">
              Expensor
            </Link>
          </Typography>
          <Button color="inherit">
            <Link to="/" className="text-white">
              Home
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/login" className="text-white">
              Login
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/register" className="text-white">
              Register
            </Link>
          </Button>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
