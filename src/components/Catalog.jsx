import React, { useEffect, useState } from "react";
import itemList from "../data/products.json";
import Pagination from '@mui/material/Pagination';

function Catalog({setItemsInCart, itemsInCart}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentOrder, setCurrentOrder] = useState("none");
  const [products, setProducts] = useState([]);
  const [productsToDisplay, setProductsToDisplay] = useState([]);
  const [pageResults, setPageResults] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(()=> {
    console.log(itemsInCart);
    if(!localStorage.getItem("cart")) {
      setProducts(itemList.productos.map(el => {
        return {...el, isInCart: false};
      }));
      setProductsToDisplay(itemList.productos.map(el => {
        return {...el, isInCart: false};
      }));
      setPageResults(itemList.productos.slice(0, 6).map(el => {
        return {...el, isInCart: false};
      }));
    } else {
      setProducts(itemList.productos.map(el => {
        if(itemsInCart.some((item) => el.id === item.id)) {
          return {...el, isInCart: true};
        } else {
          return {...el, isInCart: false};
        }
      }));
      setProductsToDisplay(itemList.productos.map(el => {
        if(itemsInCart.some((item) => el.id === item.id)) {
          return {...el, isInCart: true};
        } else {
          return {...el, isInCart: false};
        }
      }));
      setPageResults(itemList.productos.slice(0, 6).map(el => {
        if(itemsInCart.some((item) => el.id === item.id)) {
          return {...el, isInCart: true};
        } else {
          return {...el, isInCart: false};
        }
      }));
    }
  }, [])

  useEffect(()=> {
    if(itemsInCart.length > 0) {
      setProducts(products.map(el => {
        if(itemsInCart.some((item) => el.id === item.id)) {
          return {...el, isInCart: true};
        } else {
          return el;
        }
      }));
      setProductsToDisplay(productsToDisplay.map(el => {
        if(itemsInCart.some((item) => el.id === item.id)) {
          return {...el, isInCart: true};
        } else {
          return el;
        }
      }));
      setPageResults(pageResults.map(el => {
        if(itemsInCart.some((item) => el.id === item.id)) {
          return {...el, isInCart: true};
        } else {
          return el;
        }
      }));
    }
  }, [itemsInCart]);

  useEffect(() => {
    if(currentOrder === "cheapest") {
      setProducts(products.sort((a,b) => {
        if(a.price < b.price) {
          return -1;
        }
        if(a.price > b.price) {
          return 1;
        }
        return 0;
      }));
      setProductsToDisplay(productsToDisplay.sort((a,b) => {
        if(a.price < b.price) {
          return -1;
        }
        if(a.price > b.price) {
          return 1;
        }
        return 0;
      }));
      setPageResults(productsToDisplay.sort((a,b) => {
        if(a.price < b.price) {
          return -1;
        }
        if(a.price > b.price) {
          return 1;
        }
        return 0;
      }).slice((currentPage -1) * 6, currentPage * 6))
    } else if(currentOrder === "most-expensive") {
      setProducts(products.sort((a,b) => {
        if(a.price > b.price) {
          return -1;
        }
        if(a.price < b.price) {
          return 1;
        }
        return 0;
      }));
      setProductsToDisplay(productsToDisplay.sort((a,b) => {
        if(a.price > b.price) {
          return -1;
        }
        if(a.price < b.price) {
          return 1;
        }
        return 0;
      }));
      setPageResults(productsToDisplay.sort((a,b) => {
        if(a.price > b.price) {
          return -1;
        }
        if(a.price < b.price) {
          return 1;
        }
        return 0;
      }).slice((currentPage -1) * 6, currentPage * 6))
    } else if(currentOrder === "normal") {
      setProducts(products.sort((a,b) => {
        return Math.random() - 0.5;
      }));
      setProductsToDisplay(productsToDisplay.sort((a,b) => {
        return Math.random() - 0.5;
      }));
      setPageResults(productsToDisplay.sort((a,b) => {
        return Math.random() - 0.5;
      }).slice((currentPage -1) * 6, currentPage * 6))
    };
  }, [currentOrder])

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
    setProductsToDisplay(products.filter((product) => {
      return product.title.toLowerCase().includes(e.target.value.toLowerCase());
    }))
    setPageResults(products.filter((product) => {
      return product.title.toLowerCase().includes(e.target.value.toLowerCase());
    }).slice(0,6))
  }


  return (
    <div className="catalog">
      <div className="catalog__search">
        <input className="catalog__searchInput" value={searchKeyword} onChange={handleSearchChange} placeholder="Buscar productos por nombre" type="text" />
        <div className="catalog__orderBy">
          <label className="catalog__orderByLabel" htmlFor="order-by">ORDENAR POR</label>
          <select onChange={(e)=> {
            setCurrentOrder(e.target.value);
          }} className="catalog__orderBySelect" name="order-by">
            <option className="catalog__selectOption" value="normal">Seleccionar</option>
            <option className="catalog__selectOption" value="cheapest">Más baratos</option>
            <option className="catalog__selectOption" value="most-expensive">Más caros</option>
          </select>
        </div>
      </div>
      <ul className="catalog__productList">
        {pageResults.map((product) => <li key={`product-${product.id}`} className="catalog__productCard">
          <img className="catalog__productImage" src="/image-product.jpg" alt="product" />
          <p className="catalog__productName">{product.title}</p>
          <p className="catalog__productPrice">{`$${product.price}`}</p>
          {!product.isInCart ? <button onClick={(e) => {
            if(!localStorage.getItem("cart")) {
              localStorage.setItem("cart", JSON.stringify([{...product, isInCart: true}]));
              setItemsInCart(JSON.parse(localStorage.getItem("cart")));
            } else {
              if(!JSON.parse(localStorage.getItem("cart")).some((item)=> item.id === product.id)) {
                localStorage.setItem("cart", JSON.stringify([...JSON.parse(localStorage.getItem("cart")), {...product, isInCart: true}]));
                setItemsInCart(JSON.parse(localStorage.getItem("cart")));
              }
            }
          }} className="catalog__productBtn">Agregar al carrito</button>
          : <a href="/carrito" className="catalog__productBtnLink">Ver carrito</a>
        }
        </li>)}
      </ul>
      <div className="catalog__pagination">
        <Pagination onChange={(e, value)=> {
          setCurrentPage(value);
          setPageResults(productsToDisplay.slice((value - 1) * 6, value * 6));
        }} variant="outlined" shape="rounded" count={Math.ceil(productsToDisplay.length / 6)} />
      </div>
    </div>
  );
}

export default Catalog;
