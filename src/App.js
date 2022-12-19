import React, { useState, useEffect, useContext } from "react"
// import Header from "./component/Header"
// import Register from "./component/Register"
// import Login from "./component/Login"
import "bootstrap/dist/css/bootstrap.min.css"
import Home from "./views/Home"
// import DropdownAdmin from "./component/DropdownAdmin"
// import DropdownUser from "./component/DropdownUser"
// import Profile from "./component/Profile"
// import Transaction from "./component/Transaction"
import { Routes, Route, useNavigate } from "react-router-dom"
import Detailproduct from "./views/Detailproduct"
import AddProduct from "./views/AddProduct"
import AddToping from "./views/AddToping"
import Profile from "./views/Profile"
import MyCart from "./views/MyCart"
import IncomePage from "./views/incomePage"
import { UserContext } from "./context/userContext"
import { API, setAuthToken } from "./config/api"
import Header from "./component/Header"
import ListProduct from "./views/ListProduct"
import EditProduct from "./views/EditProduct"
import ListTopping from "./views/ListTopping"
import EditTopping from "./views/EditTopping"
import Layout from "./component/Private/Layout"

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  let navigate = useNavigate()

  const [state, dispatch] = useContext(UserContext)
  const [isLoading, setIsloading] = useState(true)

  useEffect(() => {
    if (state.isLogin === false && !isLoading) {
      navigate("/")
    } else {
      if (state.user.role === "admin") {
        navigate("/transaction")
      } else if (state.user.role === "user") {
        navigate("/")
      }
    }

    setAuthToken(localStorage.token)
  }, [state])

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth")

      console.log("check auth", response)

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        })
      }

      let payload = response.data.data

      payload.token = localStorage.token

      dispatch({
        type: "USER_SUCCESS",
        payload,
      })
      console.log("state check auth", state)
      setIsloading(false)
    } catch (error) {
      console.log(error)
      setIsloading(false)
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <>
      {isLoading ? null : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail-product/:id" element={<Detailproduct />} />
            <Route
              path="/add-product"
              element={
                <Layout>
                  <AddProduct />
                </Layout>
              }
            />
            <Route
              path="/edit-product/:id"
              element={
                <Layout>
                  <EditProduct />
                </Layout>
              }
            />
            <Route
              path="/edit-topping/:id"
              element={
                <Layout>
                  <EditTopping />
                </Layout>
              }
            />
            <Route
              path="/add-topping"
              element={
                <Layout>
                  <AddToping />
                </Layout>
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-cart" element={<MyCart />} />
            <Route
              path="/transaction"
              element={
                <Layout>
                  <IncomePage />
                </Layout>
              }
            />
            <Route
              path="/list-product"
              element={
                <Layout>
                  <ListProduct />
                </Layout>
              }
            />
            <Route
              path="/list-topping"
              element={
                <Layout>
                  <ListTopping />
                </Layout>
              }
            />
          </Routes>
        </>
      )}
    </>
  )
}
export default App
