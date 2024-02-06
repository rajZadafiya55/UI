import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../Styles/header.css";
// import logo from "/photos/logo.png";
import { FaCartPlus } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";


const Header = () => {
  const naviget = useNavigate();
  const auth = JSON.parse(localStorage.getItem("AdminData"));
  const qty = JSON.parse(localStorage.getItem("totalQuantity"));
  const logOut = () => {
    localStorage.clear();
    naviget("/login");
  };

  let sel = document.getElementById("header");
  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 250) {
      sel.style.cssText = " box-shadow: 0 1px 1px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.16), 0 8px 8px rgba(0,0,0,0.20);";
    }
    else if (window.pageYOffset < 250) {
      sel.style.cssText = "background-color:white";
    }
  });

  return (
    <div className="main" id="header">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            {/* <h4>Restauraunt</h4> */}
            <img src="/photos/logo.png" className="res-logo"  alt="logo"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="ms-auto">
              <div className="d-flex justify-contect-md-center align-items-center fs-5">
                {auth ? (
                  <ul className="nav-ul">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/foods">Foods</Link>
                    </li>
                    <li>
                      <Link to="/cart">Cart</Link>
                    </li>
                    <li>
                      <Link to="/review">Review</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                      <Link to="/login" onClick={logOut}>
                        Logout ( {auth.firstName} )
                      </Link>
                    </li>
                  </ul>
                ) : (
                  <ul className="nav-ul nav-right">
                    <li>
                      <Link to="/register">Register</Link>
                    </li>
                    <li>
                      <Link to="/login">LogIn</Link>
                    </li>
                  </ul>
                )}
              </div>

              {auth ? (
                <ul className="d-flex align-items-center fs-5">
                  <li className="mt-3 fixed-cart-icon">
                    <NavLink to="/cart" className="cart d-flex mb-2 align-items-center">
                      <FaCartPlus />
                      <span className="qty"> {qty || 0} </span>
                    </NavLink>  
                  </li>
                </ul>
               
              ) : (
              <></>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
export default Header;
