import React, { useState } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import { API } from "../../config/api"
import { useMutation } from "react-query"

const EditProduct = ({ show, hide, setShowUpdate, id, refetch }) => {
  const [form, setForm] = useState({
    title: "",
    price: 0,
    image: "",
    qty: 0,
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    })
  }

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }

      const formData = new FormData()
      formData.set("image", form.image[0])
      formData.set("title", form.title)
      formData.set("price", form.price)
      formData.set("qty", form.qty)

      const res = await API.patch("/product/" + id, formData, config)
      refetch()
      setShowUpdate(false)
    } catch (error) {
      console.log(error)
    }
  })
  return (
    <>
      <Modal show={show} onHide={hide} centered>
        <Modal.Body>
          <div className="px-4">
            <h1 style={{ color: "red" }}>Update Product</h1>
            {/* Handle Error Disini */}
            <Form className="py-3" onSubmit={(e) => handleSubmit.mutate(e)}>
              <Form.Group className="mb-3">
                <div className="border border-danger rounded border-opacity-25">
                  <Form.Control
                    name="title"
                    type="text"
                    placeholder="Title Product"
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <div className="border border-danger rounded border-opacity-25">
                  <Form.Control
                    type="number"
                    placeholder="Price Product"
                    name="price"
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <div className="border border-danger rounded border-opacity-25">
                  <Form.Control
                    type="number"
                    placeholder="Qty Product"
                    name="qty"
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <div className="border border-danger rounded border-opacity-25">
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>
              <div className="d-grid gap-2 my-4">
                <Button variant="danger" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default EditProduct
