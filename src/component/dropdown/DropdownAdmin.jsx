import React, { useState, useRef } from "react"
import { Nav, Stack, Button, Image, Overlay, Popover } from "react-bootstrap"
import { Link } from "react-router-dom"
import AddProduct from "../image/navbar/add-product.png"
import AddToping from "../image/navbar/add-toping.png"
import LogoutIcon from "../image/navbar/logout.png"
import Foto from "../image/images.jpg"
import { API } from "../../config/api"
import { useQuery } from "react-query"

const DropdownAdmin = ({ Logout }) => {
  const [show, setShow] = useState(false)
  const [target, setTarget] = useState(null)
  const ref = useRef(null)

  const handleClick = (event) => {
    setShow(!show)
    setTarget(event.target)
  }

  let { data: profile, refetch } = useQuery("profileCache", async () => {
    const response = await API.get("/user")

    return response.data.data
  })
  return (
    <>
      <Nav className="d-flex flex-row justify-content-end">
        <Stack
          direction="horizontal"
          gap={5}
          className="d-flex flex-row justify-content-end"
        >
          {/* <Cart /> */}

          <div ref={ref}>
            <Button
              onClick={handleClick}
              className="p-0 m-0 bg-transparent border-0"
              style={{ width: "70px", height: "70px" }}
            >
              <img
                src={profile?.image === "" ? Foto : profile?.image}
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "solid",
                  borderWidth: "2px",
                  borderColor: "#bd0707",
                }}
              />
            </Button>

            <Overlay
              show={show}
              target={target}
              placement="bottom-end"
              container={ref}
            >
              <Popover id="popover-contained">
                <Popover.Body>
                  {/* button add product start */}
                  <Button className="d-flex flex-column justify-content-center bg-white border-0 mb-3">
                    <Link to="/add-product" className="text-decoration-none">
                      <div className="d-flex flex-row justify-content-center">
                        <div className="d-flex flex-column justify-content-center">
                          <Image src={AddProduct} style={{ width: "50%" }} />
                        </div>
                        <p
                          className="d-flex flex-column justify-content-center m-0 fw-bold"
                          style={{ color: "#bd0707" }}
                        >
                          Add Product
                        </p>
                      </div>
                    </Link>
                  </Button>
                  {/* button add product end */}

                  {/* button add toping start */}
                  <Button className="d-flex flex-column justify-content-center bg-white border-0 mb-3">
                    <Link to="/add-topping" className="text-decoration-none">
                      <div className="d-flex flex-row justify-content-center">
                        <div className="d-flex flex-column justify-content-center">
                          <Image src={AddToping} style={{ width: "50%" }} />
                        </div>
                        <p
                          className="d-flex flex-column justify-content-center m-0 fw-bold"
                          style={{ color: "#bd0707" }}
                        >
                          Add Toping
                        </p>
                      </div>
                    </Link>
                  </Button>
                  {/* button add toping end */}

                  <Button className="d-flex flex-column justify-content-center bg-white border-0 mb-3">
                    <Link to="/list-product" className="text-decoration-none">
                      <div className="d-flex flex-row justify-content-center">
                        <div className="d-flex flex-column justify-content-center">
                          <Image src={AddProduct} style={{ width: "50%" }} />
                        </div>
                        <p
                          className="d-flex flex-column justify-content-center m-0 fw-bold"
                          style={{ color: "#bd0707" }}
                        >
                          List Product
                        </p>
                      </div>
                    </Link>
                  </Button>
                  <Button className="d-flex flex-column justify-content-center bg-white border-0">
                    <Link to="/list-topping" className="text-decoration-none">
                      <div className="d-flex flex-row justify-content-center">
                        <div className="d-flex flex-column justify-content-center">
                          <Image src={AddToping} style={{ width: "50%" }} />
                        </div>
                        <p
                          className="d-flex flex-column justify-content-center m-0 fw-bold"
                          style={{ color: "#bd0707" }}
                        >
                          List Topping
                        </p>
                      </div>
                    </Link>
                  </Button>
                  <hr />

                  {/* button logout start */}
                  <Button
                    className="d-flex flex-column justify-content-center bg-white border-0"
                    onClick={Logout}
                  >
                    <div className="d-flex flex-row justify-content-center">
                      <div className="d-flex flex-column justify-content-center">
                        <Image src={LogoutIcon} style={{ width: "50%" }} />
                      </div>
                      <p
                        className="d-flex flex-column justify-content-center m-0 fw-bold"
                        style={{ color: "#bd0707" }}
                      >
                        Logout
                      </p>
                    </div>
                  </Button>
                  {/* button logout end */}
                </Popover.Body>
              </Popover>
            </Overlay>
          </div>
        </Stack>
      </Nav>
    </>
  )
}

export default DropdownAdmin
