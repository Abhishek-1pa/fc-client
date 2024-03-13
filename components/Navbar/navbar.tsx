// components/Navbar.js
import { AuthState } from "@/redux/authSlice";
import { RootState } from "@/redux/store";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  styled,
  Stack,
  Box,
} from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import AccountMenu from "./AccountMenu";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/blog", label: "Blog" },
  { path: "/about", label: "About" },
];

const Title = styled(Typography)({
  color: "white", // Set text color to white
});
const StickyAppBar = styled(AppBar)({
  position: "fixed",
  top: 0,
  backgroundColor: "#333", // Change background color if needed
});
const Navbar = () => {
  const auth: AuthState = useSelector((state: RootState) => state.auth);

  return (
    <StickyAppBar>
      <Box sx={{ boxShadow: 0, margin: 1 }}>
        <Stack
          direction={"row"}
          spacing={2}
          height={"35px"}
          alignItems={"center"}
          justifyContent={"space-around"}
        >
          <Stack direction={"row"}>
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} passHref>
                <Button color="inherit" variant="text" sx={{ color: "white" }}>
                  {item.label}
                </Button>
              </Link>
            ))}
          </Stack>
          {auth.user ? (
            <AccountMenu />
          ) : (
            <Stack direction={"row"} spacing={1}>
              <Link href={"login"}>
                <Button color="inherit" sx={{ color: "white" }}>
                  Login
                </Button>
              </Link>
              <Link href="register">
                <Button color="inherit" sx={{ color: "white" }}>
                  Register
                </Button>
              </Link>
            </Stack>
          )}
        </Stack>
      </Box>
    </StickyAppBar>
  );
};

export default Navbar;
