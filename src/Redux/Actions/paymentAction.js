import { GET_PAYMENT_DATA, ADD_PAYMENT_DATA } from "../Types/type";
import axios from "axios";
import Swal from "sweetalert2";

const getItems = (payments) => ({
  type: GET_PAYMENT_DATA,
  payload: payments,
});

export const getPaymentsData = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:5000/api/payment/getAll")
      .then((res) => {
        dispatch(getItems(res.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const addData = () => ({
  type: ADD_PAYMENT_DATA,
});

export const addItem = () => {
  axios
    .post("http://localhost:5000/api/item/add")
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
