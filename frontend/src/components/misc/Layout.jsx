import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ hideFooter=false, children }) => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="container mx-auto mt-2 lg:mt-4">{children}</div>
      <Footer hidden={hideFooter} />
    </div>
  );
};
export default Layout;
