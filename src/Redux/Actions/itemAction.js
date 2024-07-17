import { ADD_ITEM, GETBYID, ITEM_REQUECT, UPDATE_ITEM } from "../Types/type";
import axios from "axios";
import Swal from "sweetalert2";
import { APIHttp } from "../../helper/API";

const getItems = (items) => ({
  type: ITEM_REQUECT,
  payload: items,
});

export const getItemsData = () => {
  return (dispatch) => {
    axios
      .get(`${APIHttp}/item/getAll`)
      .then((res) => {
        dispatch(getItems(res.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const addData = () => ({
  type: ADD_ITEM,
});

export const addItem = (data) => {
  console.log(data.imagename);
  return (dispatch) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("imagename", data.imagename[0]);

    axios
      .post(`${APIHttp}/item/add`, formData)
      .then((res) => {
        dispatch(addData);
        dispatch(getItemsData());
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
        console.log("data add successfully.");
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteItemData = (id) => {
  return (dispatch) => {
    axios
      .delete(`${APIHttp}/item/delete/${id}`)
      .then((res) => {
        dispatch(getItemsData());
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
      });
  };
};

export const getId = (items) => ({
  type: GETBYID,
  payload: items,
});

export const getBYID = (_id) => {
  return (dispatch) => {
    axios
      .get(`${APIHttp}/item/getById/${_id}`)
      .then((res) => {
        dispatch(getId(res.data.data));
        console.log(res.data.data);
        console.log(_id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const edit = (items) => ({
  type: UPDATE_ITEM,
  payload: items,
});

export const updateItemData = (data) => {
  console.log("data", data);
  console.log(data._id);
  return (dispatch) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("category", data.category);

    formData.append("imagename", data.imagename[0]);

    axios
      .put(
        `${APIHttp}/item/edit/id=${data._id}`,
        formData
      )
      .then((res) => {
        dispatch(edit(res.data.data));
        console.log(res.data.data);
        console.log("update api");
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
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
