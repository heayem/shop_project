//import style 


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

//client page
import Home from './clientPage/homePage';



function App() {
  const [menu, setMenu] = useState(false)
  const login = localStorage.getItem("login");
  const role_Page = localStorage.getItem("role");
  // const role_Page = JSON.parse(localStorage.getItem("role"))
  // alert(role_Page)

  return (
    <div className="container-fluid fst-italic lh-sm">


      <div className=" row vh-100">
        <>
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


          <BrowserRouter>
            {
              login == 1 ?
                <>
                  <div className={menu === false ? 'd-none' : 'col-2 bg-dark text-light m-0 menu'}>

                    <Header />

                  </div>
                  <div className={
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
                <Routes>
                  <Route path='/' element={<Login />} />
                  <Route path='*' element={<Login />} />
                </Routes>
            }

          </BrowserRouter>
        </>
      </div>

    </div >




  );
}

export default App;
