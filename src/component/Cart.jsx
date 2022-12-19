import React, { useEffect, useState } from "react"
import { Image, Badge } from "react-bootstrap"
import BasketIcon from "./image/navbar/basketIcon.png"
import { Link } from "react-router-dom"
import { API } from "../config/api"
// import { useQuery } from "react-query"

const Cart = () => {
  const [pop, setPop] = useState([])
  useEffect(() => {
    console.log("test test")
    API.get("/orders-id")
      .then((res) => {
        setPop(res.data.data.qty)
      })
      .catch((err) => console.log("error", err))
  }, [])

  return (
    <>
      <Link to="/my-cart">
        <Image src={BasketIcon} alt="" />
        <Badge bg="danger" className="position-absolute">
          {pop?.length}
        </Badge>
      </Link>
    </>
  )
}

export default Cart
