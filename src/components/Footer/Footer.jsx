import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

import "../../styles/footer.css";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";
import { PiArrowSquareRightFill } from "react-icons/pi";
import { useState } from "react";
import axios from 'axios';

const Footer = () => {
  const [email, setEmail] = useState('');
console.log(email);
  const sendEmail = () => {
    const imageUrl = 'https://assets-global.website-files.com/5daaade3e3e3f04da71daa8e/60c9d40039e3533cb7d9373f_GIFs%20in%20Emails.gif';
    const emailContent = `
    <img src="${imageUrl}"  alt="Email Image"  style="max-width: 100%; height: 30vh;"/> <br/>
    Hello, this is an email from Chili-Restaurant..! Your Subscription is Successful..!`;

    axios.post('https://food-server.cyclic.app/send-email', {
      to: email,
      subject: 'Subscription',
      html: emailContent,
    })
    .then(response => {
      console.log(response.data);
      console.log('email data',email)
    })
    .catch(error => {
      console.error('Error:', error);
    });
    setEmail('');
  };
  return (
    <footer className="footer mt-5">
      <Container>
        <Row>
          <Col lg="3" md="4" sm="6">
            <div className=" footer__logo text-start">
              <h4>Address</h4>
              <p className="fw-bold fs-6">
                A/201 Zadafiya Complex<br />
                Hirabg Surat 395006 India
              </p>
              <div>
                <h5>Phone: +91 8849230410</h5>
                <h5>Email: zadafiyaraj395@gmail.com</h5>
              </div>
            </div>
          </Col>

          <Col lg="3" md="4" sm="6">
            <h5 className="footer__title">Restaurant Time</h5>
            <ListGroup className="deliver__time-list">
              <ListGroupItem className=" delivery__time-item border-0 ps-0">
                <span>Sunday - Thursday</span>
                <p>9:00am - 12:00pm</p>
              </ListGroupItem>

              <ListGroupItem className=" delivery__time-item border-0 ps-0">
                <span>Friday - Saturday</span>
                <p>Off day</p>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg="3" md="4" sm="6">
            <h5 className="footer__title">Newsletter</h5>
            <p>Subscribe our newsletter</p>
            <div className="newsletter">
              <input type="email"  
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email" />
              <button>
                <PiArrowSquareRightFill className="arrwoicon" onClick={sendEmail}/>
              </button>
            </div>
          </Col>

          <Col lg="3" md="4" sm="6">
            <h5 className="footer__title">Follow Us On</h5>
            <ListGroup className="deliver__time-list">
              <ListGroupItem className=" delivery__time-item border-0 ps-0">
                <div className="icdiv">
                  <FaTwitter className="icons" />

                </div>
              </ListGroupItem>
              <ListGroupItem className=" delivery__time-item border-0 ps-0">
                <div className="icdiv">
                  <FaFacebookF className="icons" />

                </div>
              </ListGroupItem>

              <ListGroupItem className=" delivery__time-item border-0 ps-0">
                <div className="icdiv">
                  <FaInstagram className="icons" />

                </div>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col lg="12" md="12" sm="6">
            <h2 className="copyright__text">
              © Copyright - 2023, website made by my Team. All Rights Reserved.
            </h2>
          </Col>

        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
