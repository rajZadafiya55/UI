import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import AppRouter from "../../routes/Routers";

const Layout = () => {

  return (
    <>
      <div>
      
      <Header />
      <div>
        <AppRouter />
      </div>
      <Footer />
    </div>
    </>
  )
};

export default Layout;
