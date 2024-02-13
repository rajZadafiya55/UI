// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import "../Styles/contact.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Swal from "sweetalert2";
import { APIHttp } from "../helper/API";

const Contact = () => {
  const [validated, setValidated] = useState(false);

  const [data, setdata] = useState({
    name: "",
    email: "",
    message: "",
  });

  const resetForm = () => ({
    name: "",
    email: "",
    message: "",
  });
  // get All Input Values
  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const getContacts = () => {
    axios
      .get(`${APIHttp}/contact/getAll`)
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getContacts();
  }, []);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    await axios
      .post(`${APIHttp}/contact/add`, data)
      .then((res) => {
        getContacts();
        console.log(res.data.data);

        if (res.data.isSuccess === true) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 2500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.message,
            timer: 2500,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    resetForm();
  };

  return (
    <div className="w-100">
      <div className="container row mt-5 contact">
        <div className="container row mt-0 contact">
          <div className="col-lg-5 d-flex justify-content-center align-items-center">
            <img src="/photos/contact.jpg" />
          </div>

          <div className="col-lg-7 conForm">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter Your Name"
                    name="name"
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter Name !
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="abc@gmail.com"
                    name="email"
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter Email !
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  md="12"
                  className="mb-3"
                  controlId="validationCustom03"
                >
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Message.."
                    name="message"
                    required
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter Message !
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Button type="submit">Submit</Button>
            </Form>
          </div>
        </div>
        <div className="mt-5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.1031416629216!2d72.63615587510566!3d23.23933350820489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2b933477ba9f%3A0xe440409e66bea08a!2sLDRP%20Institute%20of%20Technology%20and%20Research!5e0!3m2!1sen!2sin!4v1701001682848!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
