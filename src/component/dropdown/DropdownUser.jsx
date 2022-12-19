import React, { useState, useRef, useEffect, useContext } from "react"
import { Nav, Stack, Button, Image, Overlay, Popover } from "react-bootstrap"
import IconProfile from "../image/navbar/iconprofile.png"
import LogoutIcon from "../image/navbar/logout.png"
import { Link } from "react-router-dom"
import { API } from "../../config/api"
import { useQuery } from "react-query"
import Foto from "../image/images.jpg"

import { UserContext } from "../../context/userContext"

const DropdownUser = ({ Logout }) => {
  const [state] = useContext(UserContext)
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

  useEffect(() => {
    refetch()
  }, [state])
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
                  {/* Button profile start */}
                  <Button className="d-flex flex-column justify-content-center bg-white border-0">
                    <Link to="/profile" className="text-decoration-none">
                      <div className="d-flex flex-row justify-content-center">
                        <div className="d-flex flex-column justify-content-center">
                          <Image src={IconProfile} style={{ width: "50%" }} />
                        </div>
                        <p
                          className="d-flex flex-column justify-content-center m-0 fw-bold"
                          style={{ color: "#bd0707" }}
                        >
                          Profile
                        </p>
                      </div>
                    </Link>
                  </Button>
                  {/* Button profile end */}

                  <hr />

                  {/* Button logout start */}
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
                  {/* Button logout end */}
                </Popover.Body>
              </Popover>
            </Overlay>
          </div>
        </Stack>
      </Nav>
    </>
  )
}

export default DropdownUser
