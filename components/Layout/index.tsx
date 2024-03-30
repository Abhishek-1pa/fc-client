// components/Layout.js
import { PropsWithChildren } from "react";
import Navbar from "../Navbar/navbar";
import Footer from "./footer";
import { Box, Stack } from "@mui/material";
import Trending from "../Trending";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ flex: 1 }}>
        <Navbar />
        <Stack direction={"row"}>
          <Trending/>
          
          <div style={{ flex: 1, paddingTop: '50px' , paddingLeft:"250px"}}> {/* Adjust 60px according to your navbar height */}
        {children}
      </div>
          </Stack>

      </div>
      <Footer />
    </div>
  );
};

export default Layout;
