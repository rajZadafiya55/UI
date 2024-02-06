import { Container, Row, Col } from "reactstrap";
import featimg1 from "/photos/service-01.png";
import featimg2 from "/photos/service-02.png";
import featimg3 from "/photos/service-03.png";
import { Button, TextField, TextareaAutosize } from "@mui/material";
import { ValidatorForm } from "react-material-ui-form-validator";
import { IoSendSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import QRCode from "qrcode.react";

const featureData = [
  {
    title: "Quick Service ",
    imgUrl: featimg1,
    desc: "We provide quick services and instant food delivery at your table.",
  },

  {
    title: "Super Dine In",
    imgUrl: featimg2,
    desc: "We have a good environment with Good background music.",
  },
  {
    title: "Easy to order ",
    imgUrl: featimg3,
    desc: "Just Scan Code, Select food and Make payment.",
  },
];

const Review = () => {
  // useEffect(() => {
  //   ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
  //     if (value !== data.password) return false;
  //     return true;
  //   });
  //   return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  // }, [data.password]);
  const [data, setdata] = useState({
    name: "",
    description: "",
  });

  const resetForm = () => {
    return {
      name: "",
      description: "",
    };
  };

  // get All Input Values
  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  console.log(data);
  const getReviews = () => {
    axios
      .get("http://localhost:5000/api/review/getAll")
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getReviews();
  }, []);

  const handleSubmit = async (e) => {
    await axios
      .post("http://localhost:5000/api/review/add", data)
      .then((res) => {
        getReviews();
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
    setdata(resetForm());
    // resetForm();
  };

  return (
    <div>
      <section className="features mt-5">
        <Container>
          <Row>
            <Col lg="12" className="text-center ">
              <h5 className="feature__subtitle mb-4">
                <span>What we serve</span>
              </h5>
              <h2 className="feature__title">Food is really and truly</h2>
              <h2 className="feature__title">
                the most effective <span>medicine</span>
              </h2>
              <p className="mb-1 mt-4 feature__text">
                The smell of good food, like the sound of lightly flowing water,
                <br />
                is indescribable in its evocation of innocence and delight.
              </p>
            </Col>

            <section className="reviewFormmain mt-4">
              <Container
                className="reviewForm p-1 rounded-3 col-lg-7 col-sm-12 col-md-8 col-sm-12 "
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  backgroundColor: "#de2626",
                }}
              >
                <Row className=" bg-light p-5 m-3 rounded-3">
                  <div className="text-center ">
                    <ValidatorForm
                      className="row"
                      onSubmit={handleSubmit}
                      onError={() => null}
                      autocomplete="off"
                    >
                      <TextField
                        className="col-12 bg-light"
                        type="text"
                        name="name"
                        id="standard-basic"
                        value={data.name || ""}
                        onChange={handleChange}
                        errorMessages={["Name is required"]}
                        label="Name"
                        validators={["required"]}
                      />

                      <TextareaAutosize
                        className="col-12 mt-4"
                        name="description"
                        aria-label="empty textarea"
                        onChange={handleChange}
                        validators={["required"]}
                        value={data.description || ""}
                        minRows={3}
                        placeholder="Review..."
                        style={{ width: "100%" }}
                      />

                      <Button
                        className="col-12 mt-4"
                        style={{
                          backgroundColor: "#de2626",
                        }}
                        variant="contained"
                        type="submit"
                      >
                        <IoSendSharp className="fs-4" />
                      </Button>
                    </ValidatorForm>
                  </div>
                </Row>
              </Container>
            </section>

            {featureData.map((item, index) => (
              <Col lg="4" md="6" sm="6" key={index} className="mt-5">
                <div className="feature__item text-center px-5 py-3 ">
                  <img
                    src={item.imgUrl}
                    alt="feature-img"
                    className="w-25 mb-3"
                  />
                  <h5 className=" fw-bold mb-3">{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Review;
