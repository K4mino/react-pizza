import React from "react";
import { useDispatch, useSelector } from "react-redux";
import '../scss/app.scss';
import { setActiveCategory } from "../reducers/category";
import { RootState } from "../store";

const Categories: React.FC = () => {
  const activeCategory = useSelector<RootState>((state) => state.category.activeCategory);
  const dispatch = useDispatch();
  const categories =[
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые'
  ]

  const handleSelect = (i: number) => {
    dispatch(setActiveCategory(i));
  }

  return (
    <div className="categories">
      <ul>
        {
          categories.map((cat, i) => (
            <li
            key={cat}
            className={activeCategory === i ? 'active' : ''}
            onClick={() => handleSelect(i)}>
              {cat}
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default Categories;
