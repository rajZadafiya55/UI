import { ADD_PAYMENT_DATA, GET_PAYMENT_DATA } from "../Types/type";

const initialstate = {
  allPaymentsData: [],
};

export const paymentsReducer = (state = initialstate, action) => {
  switch (action.type) {
    case GET_PAYMENT_DATA: {
      return { ...state, allPaymentsData: action.payload };
    }
    case ADD_PAYMENT_DATA:
      return { ...state };
    default:
      return state;
  }
};
