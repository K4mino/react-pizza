import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import "../scss/app.scss";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/index";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import { setActiveCategory } from "../reducers/category";
import { setActiveSort } from "../reducers/sort";
import { setActivePage } from "../reducers/page";
import { useRef } from "react";
import { getItems } from "../reducers/pizza";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMounted = useRef(false);
  const activeSort = useSelector((state) => state.sort.activeSort);
  const activeCategory = useSelector((state) => state.category.activeCategory);
  const searchValue = useSelector((state) => state.search.searchValue);
  const activePage = useSelector((state) => state.page.activePage);
  const status = useSelector((state) => state.pizza.status);
  const pizzaList = useSelector((state) => state.pizza.items);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(setActiveCategory(Number(params.category)));
      dispatch(setActiveSort(params.sortBy));
      dispatch(setActivePage(Number(params.page)));

    }
  }, []);

  const fetchPizzas = async () => {
    await dispatch(getItems({ activeSort, activePage, activeCategory }));
  };

  useEffect(() => {
      fetchPizzas();
  }, [activeSort, activeCategory, searchValue, activePage]);

  const pizzas = pizzaList.filter((pizza) => {
    if (pizza.title.toLowerCase().includes(searchValue)) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        page: activePage,
        sortBy: activeSort,
        category: activeCategory,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [activeCategory, activePage, activeSort]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "error" ? (
          <h2>Пиццы не найдены...</h2>
        ) : (
          <>
            {status === "loading"
              ? [...new Array(4)].map((_, i) => <PizzaSkeleton key={i} />)
              : pizzas.map((item) => (
                  <PizzaBlock key={item.id} src={item.imageUrl} {...item} />
                ))}
          </>
        )}
      </div>
      <Pagination />
    </div>
  );
};
