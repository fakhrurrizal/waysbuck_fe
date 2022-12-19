import React, { useState, useContext, useEffect } from "react"
import {
  Navbar,
  Container,
  Nav,
  Button,
  Stack,
  Image,
  Badge,
} from "react-bootstrap"
import Group from "./image/navbar/Group.png"
import Register from "./auth/Register"
import { UserContext } from "../context/userContext"
import Login from "./auth/Login"
import DropdownUser from "./dropdown/DropdownUser"
import { useNavigate, Link } from "react-router-dom"
import DropdownAdmin from "./dropdown/DropdownAdmin"
import { useQuery } from "react-query"
import { API } from "../config/api"
import BasketIcon from "./image/navbar/basketIcon.png"

const Header = () => {
  const [state, dispatch] = useContext(UserContext)
  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const Navigate = useNavigate()

  // const [pop, setPop] = useState([])
  // useEffect(() => {
  //   API.get("/orders-id")
  //     .then((res) => {
  //       setPop(res.data.data)
  //     })
  //     .catch((err) => console.log("error", err))
  // }, [])
  console.log(state)
  const { data: order, refetch } = useQuery("ordersCache", async () => {
    if (state.isLogin === true) {
      const response = await API.get("/orders-id")
      return response.data.data
    }
  })

  let Qty = 0

  order?.map((e) => {
    Qty += e.qty
  })
  const Logout = () => {
    dispatch({
      type: "LOGOUT",
    })
    refetch()
    Navigate("/")
  }
  // useEffect(() => {
  //   refetch()
  // }, [order])
  return (
    <Navbar bg="white" expand="lg">
      <Container>
        <Navbar.Brand className="mx-5">
          <Link to="/">
            <img src={Group} alt="" />
          </Link>
        </Navbar.Brand>

        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        ></Nav>
        <Stack direction="horizontal" gap={3} className="mx-5">
          {state.isLogin === true ? (
            <>
              {state.user.role === "admin" ? (
                <DropdownAdmin Logout={Logout} />
              ) : (
                <>
                  <Link to="my-cart" className="me-3">
                    <Image src={BasketIcon} alt="" />

                    {Qty !== 0 ? (
                      <Badge bg="danger" className="position-absolute">
                        {Qty}
                      </Badge>
                    ) : null}
                  </Link>
                  <DropdownUser Logout={Logout} />
                </>
              )}
            </>
          ) : (
            <>
              <Button
                variant="outline-danger"
                className="px-3"
                onClick={() => {
                  setShowRegister(true)
                }}
              >
                Register
              </Button>
              <Register
                show={showRegister}
                hide={() => setShowRegister(false)}
                setShowRegister={setShowRegister}
                setShowLogin={setShowLogin}
              />
              <Button
                variant="danger"
                className="px-4"
                style={{ backgroundColor: "red" }}
                onClick={() => {
                  setShowLogin(true)
                }}
              >
                Login
              </Button>

              <Login
                show={showLogin}
                hide={() => {
                  setShowLogin(false)
                }}
                setShowLogin={setShowLogin}
                setShowRegister={setShowRegister}
              />
            </>
          )}
        </Stack>
      </Container>
    </Navbar>
  )
}

export default Header
