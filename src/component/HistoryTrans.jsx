import React from "react"
import { Stack, Image } from "react-bootstrap"
import { API } from "../config/api"
import Logo from "./image/navbar/Group.png"
import Qrcode from "./image/barcode.png"
import { useQuery } from "react-query"

const Transaction = () => {
  const formatIDR = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })

  let { data: transUser, refetch } = useQuery("transUserCache", async () => {
    const response = await API.get("/transaction-user")

    return response.data.data
  })

  console.log("ini data transUser", transUser)
  return (
    <>
      {transUser?.map((item, index) => (
        <div
          className="p-4 rounded-3 mb-3"
          style={{ backgroundColor: "#F7DADA" }}
        >
          <div key={index} className="d-flex justify-content-between my-2">
            <div>
              {item?.order?.map((order, idx) => (
                <div className="my-2 d-flex" key={idx}>
                  <div className="me-3 ">
                    <img
                      src={order?.product.image}
                      alt={order?.product.image}
                      width={80}
                    />
                  </div>
                  <div style={{ color: "#BD0707" }}>
                    <div className="mb-2">
                      <label className="fw-bold" style={{ fontSize: "14px" }}>
                        {order?.product.title}
                      </label>
                      <br />
                      <label style={{ fontSize: "10px" }}>
                        <span className="fw-bold">Saturday</span> 5, March 2020
                      </label>
                      <br />
                    </div>
                    <div>
                      <label
                        className="fw-bold"
                        style={{ color: "#613D2B", fontSize: "10px" }}
                      >
                        Toping :
                        {order?.topping?.map((topping, idx) => (
                          <span
                            style={{ fontSize: "10px", color: "#BD0707" }}
                            key={idx}
                          >
                            {" "}
                            {topping?.title},
                          </span>
                        ))}
                      </label>
                      <br />
                      <label style={{ color: "#613D2B", fontSize: "10px" }}>
                        Price : {formatIDR.format(order?.total)}
                      </label>
                      <br />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div align="center">
              <div>
                <img src={Logo} width={50} alt="" />
              </div>
              <div className="mt-3" align="center">
                <img src={Qrcode} width={50} alt="" />
              </div>
              <div style={{ color: "black" }}>
                {item?.status == "pending" ? (
                  <label
                    className="mt-3 px-4 py-1 rounded-3"
                    style={{ backgroundColor: "#00D1FF" }}
                  >
                    {item?.status}
                  </label>
                ) : item?.status == "success" ? (
                  <label
                    className="mt-3 px-4 py-1 rounded-3"
                    style={{ backgroundColor: "#34d12f" }}
                  >
                    {item?.status}
                  </label>
                ) : (
                  <label
                    className="mt-3 px-4 py-1 rounded-3"
                    style={{ backgroundColor: "#e83939" }}
                  >
                    {item?.status}
                  </label>
                )}
              </div>
              <div className="mt-3" style={{ color: "#613D2B" }}>
                <p className="fw-bold">
                  Sub total : {formatIDR.format(item?.total)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Transaction
