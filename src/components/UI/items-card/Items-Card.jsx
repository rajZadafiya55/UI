import "../../../styles/items-card.css";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Redux/Actions/cartAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
// import {FaStar} from 'react-icons/fa';

const ItemsCard = (props) => {
  const { _id, name, imagename, price, category} = props.item;
  const data = {
    _id,
    name,
    imagename,
    price,
    category,
  };
  const dispatch = useDispatch();

  const showToastMessage = () => {
    toast.success("Item has been added to your cart.", {
      position: toast.POSITION.TOP_RIGHT,
    });
    console.log("toast message");
  };

  const onAddToCart = () => {
    dispatch(addToCart(data));
    showToastMessage();
  };

  return (
    <div
      className="product__item rounded-3"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <div className="product__img">
        <img
          src={imagename}
          alt="items-img"
          width="70%"
          height="140px"
          className="rounded-3"
        />
      </div>

      <div className="product__content">
        <h5>
          <b to={`/foods/${_id}`}>{name}</b>
        </h5>
        <div className="d-flex align-items-center justify-content-between">
          <span className="product__price">Rs {price}</span>
          <button className="addTOCart__btn" onClick={() => onAddToCart()}>
            <FaCartShopping className="fs-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemsCard;
