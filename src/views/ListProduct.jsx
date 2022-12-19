import React, { useState } from "react"
import { Container, Table, Button } from "react-bootstrap"
import { useQuery } from "react-query"
import { API } from "../config/api"
import PopDelete from "../component/modal/Delete"
import { useNavigate } from "react-router-dom"

const ListProduct = () => {
  // const [pop, setpop] = useState(false)
  const navigate = useNavigate()

  let { data: products, refetch } = useQuery("productssCache", async () => {
    const response = await API.get("/products")

    return response.data.data
  })

  let handleDelete = async (id) => {
    await API.delete(`/product/` + id)
    refetch()
  }

  return (
    <>
      <Container>
        <h1 style={{ color: "#BD0707" }} className="my-5">
          List Product
        </h1>
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Image</th>
              <th>Qty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((e, index) => {
              return (
                <tr key={index}>
                  <td>{e.id}</td>
                  <td>{e.title}</td>
                  <td>{e.price}</td>
                  <td>
                    <img src={e.image} width="40"/>
                  </td>
                  <td>{e.qty}</td>
                  <td style={{ width: "300px" }}>
                    <Button
                      variant="success"
                      className="me-3 ms-4"
                      style={{ paddingLeft: "40px", paddingRight: "40px" }}
                      onClick={() => navigate("/edit-product/" + e.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      style={{ paddingLeft: "35px", paddingRight: "35px" }}
                      onClick={() => {
                        if (window.confirm("Delete the item?")) {
                          handleDelete(e.id)
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <PopDelete />
      </Container>
    </>
  )
}

export default ListProduct
