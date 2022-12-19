import React, { useState, useContext } from "react"
import { Container, Card, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { API } from "../config/api"
import Login from "./auth/Login"
import Register from "./auth/Register"
import { UserContext } from "../context/userContext"
import { useQuery } from "react-query"

const Listproducts = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [state] = useContext(UserContext)

  const navigate = useNavigate()

  const formatIDR = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })

  const { data: products } = useQuery("productssCache", async () => {
    const response = await API.get("/products")

    return response.data.data
  })

  return (
    <>
      <Container className="my-5">
        <Card.Text className="fs-2 fw-bold" style={{ color: "#bd0707" }}>
          Let's Order
        </Card.Text>
        <Row>
          {products?.map((product, index) => (
            <Col md={3} style={{ cursor: "pointer" }} key={index}>
              <Card
                className="mt-5 d-flex justify-content-center rounded-4 border-0"
                style={{ backgroundColor: "#F6DADA" }}
              >
                {}
                <Card.Img
                  src={product.image}
                  onClick={() => {
                    state?.isLogin === false
                      ? setShowLogin(true)
                      : navigate(`/detail-product/${product.id}`)
                  }}
                />

                <Card.Body>
                  <Card.Text
                    className="text-left fw-bold fs-5 mb-0"
                    style={{ color: "#bd0707" }}
                  >
                    {product.title}
                  </Card.Text>
                  <Card.Text
                    className="text-left fs-6"
                    style={{ color: "#bd0707" }}
                  >
                    {formatIDR.format(product.price)}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Login
        show={showLogin}
        hide={() => {
          setShowLogin(false)
        }}
        setShowLogin={setShowLogin}
        setShowRegister={setShowRegister}
      />
      <Register
        show={showRegister}
        hide={() => setShowRegister(false)}
        setShowRegister={setShowRegister}
        setShowLogin={setShowLogin}
      />
    </>
  )
}

export default Listproducts
