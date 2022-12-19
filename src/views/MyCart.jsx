import React, { useContext, useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Stack,
  Image,
  Form,
  Button,
} from "react-bootstrap"
import { useMutation, useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import AttachImg from "../component/image/AttacTransaction.png"
import Bin from "../component/image/recyclebin.png"
import { API } from "../config/api"
import { UserContext } from "../context/userContext"

const MyCart = () => {
  const navigate = useNavigate()
  const [state] = useContext(UserContext)
  const [checkswitch, setCheckSwitch] = useState(false)

  const { data: order, refetch } = useQuery("ordersCache", async () => {
    if (state.isLogin === true) {
      const response = await API.get("/orders-id")
      return response.data.data
    }
  })

  const formatIDR = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })

  let handleDelete = async (id) => {
    await API.delete(`/order/` + id)
    refetch()
  }

  let Totals = 0
  let Qty = 0

  order?.map((e) => {
    Totals += e.total
    Qty += e.qty
  })

  const { data: user } = useQuery("userssCache", async () => {
    if (state.isLogin === true) {
      const response = await API.get("/user")
      return response.data.data
    }
  })
  // useEffect(() => {}, [])
  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    address: "",
  })

  const handleSubmit = useMutation(async (e) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    }

    if (form.fullname != "") {
      user.fullname = form.fullname
    }
    if (form.phone != "") {
      user.phone = form.phone
    }
    if (form.address != "") {
      user.address = form.address
    }
    const data = {
      ID: order[0].transaction_id,
      Name: user.fullname,
      Address: user.address,
      Phone: user.phone,
      UserID: user.id,
      Total: Totals,
      Status: "pending",
    }
    refetch()
    const response = await API.patch("/transaction", data, config)
    console.log("ini data token", response)

    const token = response.data.data.token

    window.snap.pay(token, {
      onSuccess: function (result) {
        /* You may add your own implementation here */
        console.log(result)
        navigate("/profile")
      },
      onPending: function (result) {
        /* You may add your own implementation here */
        console.log(result)
        navigate("/profile")
      },
      onError: function (result) {
        /* You may add your own implementation here */
        console.log(result)
      },
      onClose: function () {
        /* You may add your own implementation here */
        alert("you closed the popup without finishing the payment")
      },
    })
  })

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js"
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-GxZRAIKRV-YgtKJw"

    let scriptTag = document.createElement("script")
    scriptTag.src = midtransScriptUrl
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey)

    document.body.appendChild(scriptTag)
    return () => {
      document.body.removeChild(scriptTag)
    }
  }, [])
  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col>
            <Stack direction="vertical">
              <p className="fs-3 fw-bold" style={{ color: "#bd0707" }}>
                My Cart
              </p>
              <p className="fs-5 mb-0" style={{ color: "#bd0707" }}>
                Review Your Order
              </p>
            </Stack>
            <hr />
            {state.isLogin === true ? (
              <>
                {order?.map((item, index) => {
                  return (
                    <Stack direction="horizontal" className="mb-3" key={index}>
                      <Image src={item.product.image} style={{ width: "8%" }} />
                      <div className="ms-3">
                        <p className="m-0 fw-bold" style={{ color: "#bd0707" }}>
                          {item.product.title}
                        </p>

                        <p className="m-0" style={{ color: "#bd0707" }}>
                          Topping:{" "}
                          {item.topping.map((topping, index) => {
                            return <span key={index}>{topping.title},</span>
                          })}
                        </p>
                      </div>
                      <div className="ms-auto">
                        <p className="m-0 fw-bold" style={{ color: "#bd0707" }}>
                          {formatIDR.format(item.total)}
                        </p>
                        <div
                          className="d-flex justify-content-end"
                          style={{ cursor: "pointer" }}
                        >
                          <Image
                            src={Bin}
                            style={{ width: "20%" }}
                            onClick={() => handleDelete(item.id)}
                          />
                        </div>
                      </div>
                    </Stack>
                  )
                })}
              </>
            ) : (
              <></>
            )}

            <hr />
            <Row>
              <Col>
                <hr />
                <Stack direction="vertical">
                  <Stack direction="horizontal">
                    <p style={{ color: "#bd0707" }}>Subtotal</p>
                    <p className="ms-auto" style={{ color: "#bd0707" }}>
                      {Totals}
                    </p>
                  </Stack>
                  <Stack direction="horizontal">
                    <p style={{ color: "#bd0707" }}>Qty</p>
                    <p className="ms-auto" style={{ color: "#bd0707" }}>
                      {" "}
                      {Qty}
                    </p>
                  </Stack>
                  <hr />
                  <Stack direction="horizontal">
                    <p style={{ color: "#bd0707" }}>Total</p>
                    <p className="ms-auto" style={{ color: "#bd0707" }}>
                      {Totals}
                    </p>
                  </Stack>
                </Stack>
              </Col>
            </Row>
          </Col>
          <Col className="d-flex justify-content-center">
            <Form className="d-flex flex-column mt-5 w-75">
              <div class="form-check form-switch">
                <input
                  className="form-check-input mb-4"
                  type="checkbox"
                  onChange={() => {
                    setCheckSwitch(!checkswitch)
                  }}
                  role="switch"
                  id="flexSwitchCheckChecked"
                />
                <label
                  label
                  class="form-check-label"
                  for="flexSwitchCheckChecked"
                  style={{ color: "#bd0707" }}
                >
                  Other Address
                </label>
              </div>
              {checkswitch === true ? (
                <>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name="fullname"
                    onChange={(e) =>
                      setForm({ ...form, fullname: e.target.value })
                    }
                    className="mb-3"
                    style={{
                      borderColor: "#bd0707",
                      borderWidth: "3px",
                      backgroundColor: "#FFF3F7",
                    }}
                  />

                  <Form.Control
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="mb-3"
                    style={{
                      borderColor: "#bd0707",
                      borderWidth: "3px",
                      backgroundColor: "#FFF3F7",
                    }}
                  />
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Address"
                    name="address"
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    className="mb-5"
                    style={{
                      borderColor: "#bd0707",
                      borderWidth: "3px",
                      backgroundColor: "#FFF3F7",
                      resize: "none",
                    }}
                  />
                </>
              ) : (
                <></>
              )}
              <Button
                variant="primary"
                onClick={(e) => handleSubmit.mutate(e)}
                style={{
                  width: "100%",
                  color: "white",
                  fontWeight: "bold",
                  borderColor: "#bd0707",
                  backgroundColor: "#bd0707",
                }}
              >
                Pay
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default MyCart
