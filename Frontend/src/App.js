
// import admin page
import HomePage from './ComstomerPage/HomePage';
import User from './ComstomerPage/UserListPage';
import Product from './ComstomerPage/ProductList';
import Header from './RouteDom/Header_Route';
import Category from './ComstomerPage/Category';
import Cart from './ComstomerPage/cartList'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Icon from './Component/Icon.compo';
import './App.css';
import { useState } from 'react';
import Login from './Auth/auth';
import Profile from './ComstomerPage/profile';
import Navclient from './RouteDom/Header_Route_client';
//client page
import Home from './clientPage/Homepage/homePage';
// import About from './clientPage/About/about';
import Detail from './clientPage/product_Detail/product_detail';
import CartShop from './clientPage/Cart/cart';
import Productcategory from './clientPage/Category/Productcategory';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";



function App() {
  const [menu, setMenu] = useState(false)
  const login = localStorage.getItem("login");
  const role_Page = localStorage.getItem("role");


  return (
    <div className="container-fluid fst-italic lh-sm">


      <div className=" row vh-100">
        <>

          {login == 1 ?
            <>
              {role_Page == 1 ?
                <nav class="navbar navbar-expand-lg navbar-light bg-primary">
                  <div class="container-fluid">

                    <button
                      className="btn btn-outline-light text-dark"
                      type="button"

                      onClick={() => { login == 1 ? setMenu(!menu) : alert("Pleas login ") }}

                    >
                      <Icon choose={'menu'} />
                    </button>

                  </div>
                </nav>
                :
                null
              }
            </>
            :
            <>
            </>
          }


          <BrowserRouter>
            {
              login == 1 ?
                <>

                  {role_Page == 1 ?
                    <div className={menu === false ? 'd-none' : 'col-2 bg-dark shadow-lg text-light m-0 menu'}>
                      <Header />
                    </div>
                    :
                    <Navclient />
                  }

                  <div style={{ backgroundColor: "#eee" }} className={
                    // d-flex flex-row m-auto justify-content-center
                    menu === true ? 'col-10 m-auto  p-0 m-0 menu  overflow-auto'
                      : 'col-11 m-auto p-0 m-0 menu  overflow-auto'
                  } >

                    {
                      role_Page == 1 ?
                        <Routes>
                          <Route path='/' element={<HomePage />} />
                          <Route path='/Product' element={<Product />} />
                          <Route path='/Category' element={<Category />} />
                          <Route path='/user' element={<User />} />
                          <Route path='/cart' element={<Cart />} />
                          <Route path='/profile' element={<Profile />} />
                        </Routes>
                        : role_Page == 2 ?
                          <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/Productcategory/:id' element={<Productcategory />} />
                            <Route path='/Profile' element={<Profile />} />
                            <Route path='/CartShop/:P_Id' element={<CartShop />} />
                            <Route path='/CartShop' element={<CartShop />} />
                            <Route path='/Detail/:id' element={<Detail />} />
                            <Route path='/Detail' element={<Detail />} />
                          </Routes>
                          :
                          <Routes>
                            <Route path='/' element={<Login />} />
                            <Route path='*' element={<Login />} />
                          </Routes>
                    }

                  </div>
                </>
                :
                <>
                  <Navclient />
                  <div style={{ backgroundColor: "#eee" }} className='col-11 m-auto p-0 m-0 menu  overflow-auto'>
                    <Routes>
                      <Route path='/' element={<Home />} />
                      <Route path='/Detail/:id' element={<Detail />} />
                      <Route path='/Productcategory/:id' element={<Productcategory />} />
                      <Route path='/Profile' element={<Profile />} />
                      <Route path='/CartShop/:P_Id' element={<CartShop />} />
                      <Route path='/CartShop' element={<CartShop />} />
                      <Route path='/login' element={<Login />} />
                      <Route path='*' element={<Login />} />
                    </Routes>
                  </div>
                </>
            }

          </BrowserRouter>
        </>
      </div>

    </div >




  );
}

export default App;
