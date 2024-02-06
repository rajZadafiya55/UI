import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  REMOVE_FROM_CART,
} from "../Types/type";

const cartItems =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const totalQuantity =
  localStorage.getItem("totalQuantity") !== null
    ? JSON.parse(localStorage.getItem("totalQuantity"))
    : 0;

const totalAmount = localStorage.getItem("totalAmount")
  ? JSON.parse(localStorage.getItem("totalAmount"))
  : 0;

const initialState = {
  cartItems: cartItems,
  totalQuantity: totalQuantity,
  totalAmount: totalAmount,
};

const setItemFun = (cartItems, totalQuantity, totalAmount) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
  localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item._id === newItem._id
      );

      if (!existingItem) {
        const updatedCartItems = [
          ...state.cartItems,
          {
            _id: newItem._id,
            name: newItem.name,
            imagename: newItem.imagename,
            price: newItem.price,
            quantity: newItem.quantity || 1,
            category: newItem.category,
            totalPrice: newItem.price * (newItem.quantity || 1),
          },
        ];

        const totalAmount = updatedCartItems.reduce(
          (total, item) => total + Number(item.price) * Number(item.quantity),
          0
        );
        setItemFun(updatedCartItems, state.totalQuantity + 1, totalAmount);
        return {
          ...state,
          cartItems: updatedCartItems,
          totalQuantity: state.totalQuantity + 1,
          totalAmount: totalAmount,
        };
      } else {
        existingData = existingItem;
        existingItem.quantity++;
        console.log("existing", existingData.quantity);

        const totalAmount = cartItems.reduce(
          (total, item) => total + Number(item.price) * Number(item.quantity),
          0
        );

        setItemFun(state.cartItems, state.totalQuantity + 1, totalAmount);
        return {
          ...state,
          totalQuantity: state.totalQuantity + 1,
          totalAmount: totalAmount,
        };
      }

    case REMOVE_FROM_CART:
      const data = action.payload;
      const existingData = state.cartItems.find((item) => item._id === data.id);
      // if(window.confirm("Are You Sure Delete")){
      //   console.log("raj")
      // }

      if (existingData) {
        const updatedCartItems = state.cartItems.filter(
          (item) => item._id !== data.id
        );
        const totalAmount = updatedCartItems.reduce(
          (total, item) => total + Number(item.price) * Number(item.quantity),
          1
        );
        setItemFun(
          updatedCartItems,
          state.totalQuantity - existingData.quantity,
          totalAmount
        );
        return {
          ...state,
          cartItems: updatedCartItems,
          totalQuantity: state.totalQuantity - existingData.quantity,
          totalAmount: totalAmount,
        };
      }

    case CLEAR_CART:
      localStorage.removeItem("cartItems");
      localStorage.removeItem("totalAmount");
      setItemFun([], 0, 0);
      return { ...state, cartItems: [], totalQuantity: 0, totalAmount: 0 };

    case INCREASE_QUANTITY:
      const increasedCart = state.cartItems.map((item) =>
        item._id === action.payload._id
          ? { ...item, quantity: Math.min(item.quantity + 1, 10) }
          : { ...item }
      );

      const increasedTotalQuantity = state.totalQuantity + 1;

      const inTotalAmount = increasedCart.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      setItemFun(increasedCart, increasedTotalQuantity, inTotalAmount);

      localStorage.setItem('totalQuantity', state.totalQuantity + 1);

      return {
        ...state,
        cartItems: increasedCart,
        totalQuantity: increasedTotalQuantity,
        totalAmount: inTotalAmount,
      };

    case DECREASE_QUANTITY:
      const decreasedCart = state.cartItems.map((item) =>
        item._id === action.payload._id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : { ...item }
      );

      const decreasedTotalQuantity = Math.max(state.totalQuantity - 1, 0);

      const DeTotalAmount = decreasedCart.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        1
      );

      setItemFun(decreasedCart, decreasedTotalQuantity, DeTotalAmount);

      return {
        ...state,
        cartItems: decreasedCart,
        totalQuantity: decreasedTotalQuantity,
        totalAmount: DeTotalAmount,
      };

    default:
      return state;
  }
};
