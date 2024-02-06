import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  REMOVE_FROM_CART,
} from "../Types/type";

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (itemId) => ({
  type: REMOVE_FROM_CART,
  payload: { id: itemId },
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const increaseQuantity = (item) => ({
  type: INCREASE_QUANTITY,
  payload: { _id: item },
});

export const decreaseQuantity = (item) => ({
  type: DECREASE_QUANTITY,
  payload: { _id: item },
});
