import React from "react";
import {
  Container,
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../Redux/Actions/cartAction";
import '../Styles/cart.css';
import { APIHttp } from "../helper/API";

const PaymentSchema = Yup.object().shape({
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^\d{10}$/, "Phone must be exactly 10 digits"),
    

  cardNumber: Yup.string()
    .required("Card number is required")
    .matches(/^\d{16}$/, "Card number must be 16 digits"),

  expirationDate: Yup.string()
    .required("Expiration date is required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiration date (MM/YY)"),

  cvv: Yup.string()
    .required("CVV is required")
    .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
});

const PaymentPage = () => {
  const Total = JSON.parse(localStorage.getItem("Total"));
  console.log(Total);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialFormValues = {
    Payment_date: Date.now(),
    phone: " ",
    cardNumber: " ",
    expirationDate: " ",
    cvv: " ",
    amount: Total || " ",
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: PaymentSchema,
    onSubmit: async (values, { resetForm }) => {
      axios
        .post(`${APIHttp}/payment/add`, values)
        .then((res) => {
          getPayments();
          resetForm();

          // clear cart item and total
          dispatch(clearCart());

          // navigate menu page
          // navigate("/foods");
          navigate("/payment-receipt");


          
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
    },
  });

  const getPayments = () => {
    axios
      .get(`${APIHttp}/payment/getAll`)
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getPayments();
  }, []);

  return (
    <div className="mt-5">
      <Container maxWidth="sm">
        <Paper className="paperback" elevation={3} style={{ padding: "16px" }}>
          <Typography variant="h4" className="mb-3" gutterBottom>
            Payment Form
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="phone"
                  label="Phone"
                  fullWidth
                  variant="outlined"
                  type="number"
                  onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldValue('phone', e.target.value.trim());
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div style={{ color: "red" }}>{formik.errors.phone}</div>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="cardNumber"
                  label="Card Number"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldValue('cardNumber', e.target.value.trim());
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.cardNumber}
                />
                {formik.touched.cardNumber && formik.errors.cardNumber && (
                  <div style={{ color: "red" }}>{formik.errors.cardNumber}</div>
                )}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="expirationDate"
                  label="Expiration Date"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldValue('expirationDate', e.target.value.trim());
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.expirationDate}
                />
                {formik.touched.expirationDate &&
                  formik.errors.expirationDate && (
                    <div style={{ color: "red" }}>
                      {formik.errors.expirationDate}
                    </div>
                  )}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="cvv"
                  label="CVV"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldValue('cvv', e.target.value.trim());
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.cvv}
                />
                {formik.touched.cvv && formik.errors.cvv && (
                  <div style={{ color: "red" }}>{formik.errors.cvv}</div>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Amount"
                  name="amount"
                  fullWidth
                  variant="outlined"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  InputProps={{
                    readOnly: true,
                  }}
                  value={Total || " "}
                  readOnly
                />
                {formik.touched.amount && formik.errors.amount && (
                  <div style={{ color: "red" }}>{formik.errors.amount}</div>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Pay Now
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default PaymentPage;
