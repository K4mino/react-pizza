import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cart, { addItem } from "../../reducers/cart";
import "../../scss/app.scss";
import { RootState } from "../../store";

type PizzaBlockProps = {
  title: string,
  price: number,
  sizes: number[],
  types: number[],
  src: string,
  id: string
} 

const PizzaBlock:React.FC<PizzaBlockProps> = ({ title, price, sizes, types, src, id }) => {
  const typeNames = ["Тонкая", "Традиционная"]; 
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const cartItem = useSelector<RootState>((state) => state.cart.items.find((item) => item.id === id))
  const dispatch = useDispatch();

  const count = cartItem ? cartItem.count : 0;

  const handleAddToCart = () => {
    const item ={
      id,
      title,
      price,
      src,
      type:typeNames[activeType],
      size: sizes[activeSize],
    }
    dispatch(addItem(item))
  }

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}><img className="pizza-block__image" src={src} alt="Pizza" /></Link>
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type) => (
              <li
                key={type}
                className={activeType === type ? "active" : ""}
                onClick={() => setActiveType(type)}
              >
                {typeNames[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, i) => (
              <li
                key={size}
                className={activeSize === i ? "active" : ""}
                onClick={() => setActiveSize(i)}
              >
                {size} см
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <div onClick={handleAddToCart} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {
              count === 0 ? null : <i>{count}</i>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;