import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-1"> {/* Added padding-top to give space for header */}
        <Outlet /> {/* This is where pages will be rendered */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
  