import React from "react";
import { Route, Routes } from "react-router-dom";
import "./scss/app.scss";
import Header from "./components/Header";
import { Home } from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import { useSelector } from "react-redux";
import EmptyCart from "./pages/EmptyCart";
import PizzaPage from "./pages/PizzaPage";
import { RootState } from "./store";

function App() {
  const items = useSelector((state: RootState) => state.cart.items)
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={items.length > 0 ? <Cart/> : <EmptyCart/>}/>
            <Route path="/pizza/:id" element={<PizzaPage/>}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
      </div>
    </div>
  );
}

export default App;
