// components/Layout.js
import { PropsWithChildren } from "react";
import Navbar from "../Navbar/navbar";
import Footer from "./footer";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ flex: 1 }}>
        <Navbar />
        <div style={{ flex: 1, paddingTop: '50px' }}> {/* Adjust 60px according to your navbar height */}
        {children}
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
