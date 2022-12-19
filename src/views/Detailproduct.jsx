import React, { useState, useContext } from "react"
import { Container, Row, Col, Image, Button } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"
import { useMutation, useQuery } from "react-query"
import { API } from "../config/api"

import Checked from "../component/image/icons/green-check.svg"
import { UserContext } from "../context/userContext"
// import Menu from "../data/images/product1.png"
// import Toping from "../data/Toping"

const Detailproduct = () => {
  const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY
  const { id } = useParams()
  const [state] = useContext(UserContext)
  console.log(state)
  // const [dataProduct, setDataProduct] = useState([])
  // const [dataTopping, setDataTopping] = useState([])
  const formatIDR = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })

  // console.log(state)
  // console.log(dataProduct)
  let { data: product } = useQuery("productsCache", async () => {
    const response = await API.get("/product/" + id)

    return response.data.data
  })

  let { data: toppings } = useQuery("toppingsCache", async () => {
    const response = await API.get("/toppings")

    return response.data.data
  })

  const [toppingCheck, setToppingCheck] = useState([0])
  const [toppingPrice, setToppingPrice] = useState(0)

  const handleChecked = (id, price) => {
    let filterID = toppingCheck.filter((e) => e === id)
    if (filterID[0] !== id) {
      setToppingCheck([...toppingCheck, id])
      setToppingPrice(toppingPrice + price)
    } else {
      setToppingCheck(toppingCheck.filter((e) => e !== id))
      setToppingPrice(toppingPrice - price)
    }
  }

  console.log(toppingCheck)

  const navigate = useNavigate()

  const handleOnSubmit = useMutation(async (e) => {
    e.preventDefault()

    const config = {
      headers: { "Content-type": "application/json" },
    }

    const data = {
      buyer_id: state.user.id,
      product_id: product.id,
      topping_id: toppingCheck,
    }

    const datatrans = {
      user_id: state.user.id,
    }

    const bodytrans = JSON.stringify(datatrans)
    const response = await API.get("/my-order")

    // if (
    //   response?.data.data.status != "Waiting" &&
    //   response?.data.data.user_id == state.user.id
    // ) {
    await API.post("/transaction", bodytrans)
    // }

    const body = JSON.stringify(data)

    await API.post("/order", body, config)

    navigate("/my-cart")
  })

  // useEffect(() => {
  //   if (product) {
  //     setDataProduct(product)
  //   }
  //   if (toppings) {
  //     setDataTopping(toppings)
  //   }
  // }, [product])

  return (
    <>
      <Container className="mt-5 mb-5">
        <Row className="d-flex justify-content-center">
          <Col sm={4}>
            <div className="d-flex justify-content-end mt-3 me-3">
              <div className="d-flex justify-content-center">
                <Image src={product?.image} style={{ width: "350px" }} />
              </div>
            </div>
          </Col>
          <Col sm={5} className="pe-3 ">
            <p className="fs-1 fw-bold mb-0" style={{ color: "#bd0707" }}>
              {product?.title}
            </p>
            <p className="fs-5 mt-0 mb-5" style={{ color: "#bd0707" }}>
              {formatIDR.format(product?.price)}
            </p>
            <p className="fs-5 fw-bold mb-4" style={{ color: "#bd0707" }}>
              Toping
            </p>

            <Row className="mb-5">
              {toppings?.map((topping, index) => {
                return (
                  <Col
                    key={index}
                    className="d-flex flex-column justify-content-center mb-3"
                    md={3}
                  >
                    <div
                      className="d-flex justify-content-center"
                      onClick={() => handleChecked(topping.id, topping.price)}
                    >
                      <Image
                        src={topping.image}
                        className="rounded-circle"
                        alt=""
                        style={{ width: "60px", objectFit: "cover" }}
                      />
                      {toppingCheck.filter(
                        (element) => element === topping.id
                      )[0] ? (
                        <Image
                          src={Checked}
                          className="position-absolute ms-4"
                        />
                      ) : (
                        <Image
                          src={Checked}
                          className="position-absolute ms-4 d-none"
                        />
                      )}
                    </div>
                    <p
                      className="text-center mb-0"
                      style={{ color: "#bd0707", fontSize: "10px" }}
                    >
                      {topping.title}
                    </p>
                    <p
                      className="text-center mb-0"
                      style={{ color: "#bd0707", fontSize: "10px" }}
                    >
                      {formatIDR.format(topping.price)}
                    </p>
                  </Col>
                )
              })}
            </Row>

            <div className="d-flex justify-content-between mt-5 mb-5">
              <p className="fs-5 fw-bold mb-0" style={{ color: "#bd0707" }}>
                Total
              </p>
              <p className="fs-5 fw-bold mb-0" style={{ color: "#bd0707" }}>
                {formatIDR.format(product?.price + toppingPrice)}
              </p>
            </div>
            <Button
              onClick={(e) => handleOnSubmit.mutate(e)}
              style={{
                width: "100%",
                color: "white",
                fontWeight: "bold",
                borderColor: "#bd0707",
                backgroundColor: "#bd0707",
              }}
            >
              Add Cart
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Detailproduct
