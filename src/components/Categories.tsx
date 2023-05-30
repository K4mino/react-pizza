import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import '../scss/app.scss';
import { setActiveCategory } from "../reducers/category";
import { RootState } from "../store";
import { useAppDispatch } from "../store";

const Categories: React.FC = React.memo(() => {
  const activeCategory = useSelector((state: RootState) => state.category.activeCategory);
  const dispatch = useAppDispatch();
  const categories =[
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые'
  ]

  const handleSelect = useCallback((i: number) => {
    dispatch(setActiveCategory(i));
  },[]);
  console.log("rerender")
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
});

export default Categories;
