import { GET_PAYMENT_DATA, ADD_PAYMENT_DATA } from "../Types/type";
import axios from "axios";
import Swal from "sweetalert2";
import { APIHttp } from "../../helper/API";

const getPayments = (payments) => ({
  type: GET_PAYMENT_DATA,
  payload: payments,
});

export const getPaymentsData = () => {
  return (dispatch) => {
    axios
      .get(`${APIHttp}/payment/getAll`)
      .then((res) => {
        dispatch(getPayments(res.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const addData = () => ({
  type: ADD_PAYMENT_DATA,
});

export const addPaymentData = () => {
  axios
    .post(`${APIHttp}/payment/add`)
    .then((res) => {
      dispatch(addData);
      dispatch(getPaymentsData());
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
          n: "error",
          title: "Oops...",
          text: res.data.message,
          timer: 2500,
        });
      }
      console.log("data add successfully.");
    })
    .catch((error) => {
      console.log(error);
    });
};
