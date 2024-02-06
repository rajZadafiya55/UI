// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import PaymentsIcon from "@mui/icons-material/Payments";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Button, TextField, TextareaAutosize } from "@mui/material";
import axios from "axios";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../Redux/Actions/cartAction";
import "../Styles/cart.css";
import { MdAdd } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getTableData } from "../Redux/Actions/tableAction";
import Swal from "sweetalert2";

const Cart = () => {
  const auth = JSON.parse(localStorage.getItem("AdminData"));
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  // cart TotalAmount
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const shippingCost = [0, 90, 120, 200, 500];
  const discount =
    cartTotalAmount > 0 && cartTotalAmount <= 500
      ? shippingCost[0]
      : cartTotalAmount > 500 && cartTotalAmount <= 800
      ? shippingCost[1]
      : cartTotalAmount > 800 && cartTotalAmount <= 1000
      ? shippingCost[2]
      : cartTotalAmount > 1000 && cartTotalAmount <= 2000
      ? shippingCost[3]
      : cartTotalAmount > 2000  && cartTotalAmount <= 5000
      ? shippingCost[4]
      : shippingCost[0];
  const total_amt = cartTotalAmount - Number(discount);
  useEffect(() => {
    JSON.stringify(localStorage.setItem("Total", total_amt));
  }, [total_amt]);

  // remove cartItem
  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  // get ItemQuentity
  const getItemQuantity = (itemId) => {
    const cartItem = cart.find((item) => item._id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  // table data fetch
  const table = useSelector((state) => state.table.allTableData);
  const tblData = table.map((value, index) => {
    value.id = index + 1;
    return value;
  });
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    dispatch(getTableData());
    setTableData(tblData);
  }, []);

  // order
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [data, setdata] = useState({
    order_date: Date.now(),
    username: "",
    table_no: "",
    total_amt: "",
    discount: "",
    qty: cartItems
      .map((v) => {
        return v.name + " (" + v.quantity + ")";
      })
      .join(" "),
    descreption: "",
  });

  // get All Input Values
  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  console.log(data);
  const getOrders = () => {
    axios
      .get("http://localhost:5000/api/order/getAll")
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getOrders();
  }, [cart]);
  // form Submit event
  const onFromSubmit = (e) => {
    e.preventDefault();
    let fixedData = { ...data };

    // fixed value assign to particular variable

    fixedData["discount"] = discount;
    fixedData["total_amt"] = total_amt;
    fixedData["username"] = auth.firstName;
    console.log("discount", total_amt);

    axios
      .post("http://localhost:5000/api/order/add", fixedData)
      .then((res) => {
        getOrders();
        console.log(res.data.data);
        localStorage.setItem('Order', JSON.stringify(res.data.data));
        navigate("/payment");
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

    console.log("addData", data);
  };
  // form
  return (
    <div>
      {cart.length !== 0 ? (
        // cart
        <div className="container">
          <section id="table" className="mt-5">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Category</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={item.imagename}
                        className="image"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>₹{item.price.toFixed(2)}</td>
                    <td className="w-25">
                      <MdAdd
                        className="increment"
                        onClick={() => dispatch(increaseQuantity(item._id))}
                      />
                      {getItemQuantity(item._id)}
                      <FiMinus
                        className="increment"
                        onClick={() => dispatch(decreaseQuantity(item._id))}
                      />
                    </td>
                    <td>₹ {(item.price * item.quantity).toFixed(2)}</td>
                    <td>{item.category}</td>
                    <td>
                      <MdDeleteForever
                        className="fs-4 delicon"
                        onClick={() => handleRemoveFromCart(item._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </section>

          <section className="subtot mt-4 d-flex ">
            <div>
              <h6 className="fs-5" style={{ textAlign: "left" }}>
                SubTotal:{" "}
                <span className="fs-4 ms-2 ">
                  ₹
                  {cart
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </span>
              </h6>
              <p className="fw-bold">
                Discount and Order will calculate at checkout
              </p>
              <div style={{ textAlign: "left" }}>
                <button
                  className="cartbtn me-4"
                  onClick={() => navigate("/foods")}
                >
                  Countine Shopping
                </button>

                <button
                  className="cartbtn"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </section>

          {/* cart from and total  */}
          <section>
            <Container>
              <Row>
                <Col lg="8" md="6" sm="12" className="p-4">
                  <ValidatorForm
                    className="row"
                    onSubmit={onFromSubmit}
                    onError={(error) => console.log(error)}
                    autoComplete="off"
                  >
                    <TextField
                      className=" mt-4"
                      name="username"
                      label="Name"
                      InputLabelProps={{ shrink: true }}
                      type="text"
                      value={auth.firstName || ""}
                      onChange={handleChange}
                      errorMessages={["this field is required"]}
                    />
                    <TextField
                      className=" mt-4"
                      select
                      variant="filled"
                      value={data.table_no || ""}
                      helperText="Please Select your Table No "
                      onChange={handleChange}
                      name="table_no"
                      SelectProps={{
                        native: "true",
                      }}
                    >
                      {tableData.map((val) => {
                        return (
                          <>
                            <option>{val.table}</option>
                          </>
                        );
                      })}
                    </TextField>

                    <TextField
                      className="mt-4"
                      type="text"
                      name="discount"
                      id="standard-basic"
                      value={discount || 0}
                      onChange={handleChange}
                      errorMessages={["this field is required"]}
                      label="Discount"
                    />
                    <TextField
                      className=" mt-4"
                      type="text"
                      name="total_amt"
                      id="standard-basic"
                      value={total_amt || ""}
                      onChange={handleChange}
                      errorMessages={["this field is required"]}
                      label="Total"
                    />
                    <TextareaAutosize
                      className=" mt-4"
                      name="qty"
                      aria-label="empty textarea"
                      onChange={handleChange}
                      value={data.qty || ""}
                      minRows={3}
                      style={{ width: "100%" }}
                    />
                    <TextareaAutosize
                      className=" mt-4"
                      name="descreption"
                      aria-label="empty textarea"
                      onChange={handleChange}
                      validators={["required"]}
                      value={data.descreption || ""}
                      minRows={3}
                      placeholder="Description..."
                      style={{ width: "100%" }}
                    />

                    <Button
                      className="col-12 mt-4 w-25"
                      style={{
                        backgroundColor: "rgb(78, 186, 186)",
                      }}
                      variant="contained"
                      type="submit"
                    >
                      <PaymentsIcon />
                    </Button>
                  </ValidatorForm>
                </Col>

                {/* Total and dicount section  */}

                <Col lg="4" md="6" sm="12">
                  <div className="checkout__bill">
                    <h6 className="d-flex align-items-center justify-content-between fs-5 mb-3">
                      Subtotal:{" "}
                      <span className="text-black">{cartTotalAmount}</span>
                    </h6>
                    <h6 className="d-flex align-items-center  justify-content-between fs-5 m-0">
                      Discount: <span className="text-black">{discount}</span>
                    </h6>
                    <br />
                    <div className="checkout__total">
                      <h5 className="d-flex align-items-center justify-content-between ">
                        Total:{" "}
                        <span className="text-black "> ₹ {total_amt}</span>
                      </h5>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </div>
      ) : (
        <h3 className="text-center  noitem">No item added to the cart</h3>
      )}
    </div>
  );
};

export default Cart;
