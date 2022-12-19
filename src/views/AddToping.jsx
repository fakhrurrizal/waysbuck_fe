import React, { useState } from "react"
import {
  Container,
  Row,
  Col,
  Form,
  Stack,
  Button,
  Image,
} from "react-bootstrap"
import { API } from "../config/api"
import AttachIcon from "../component/image/Frame.png"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"

const AddToping = () => {
  const [preview, setPreview] = useState(null)
  const navigate = useNavigate()

  const [topping, setTopping] = useState({
    title: "",
    price: "",
    image: "",
    qty: "",
  })

  const handleChange = (e) => {
    setTopping({
      ...topping,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    })

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0])
      setPreview(url)
    }
  }

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      const formData = new FormData()
      formData.set("image", topping.image[0])
      formData.set("title", topping.title)
      formData.set("price", topping.price)
      formData.set("qty", topping.qty)

      const response = await API.post("/topping", formData)
      navigate("/list-topping")
    } catch (err) {
      console.log(err)
    }
  })
  return (
    <>
      <Container className="mt-5 mb-5">
        <Row>
          <Col className="d-flex flex-column justify-content-center">
            <Form onSubmit={(e) => handleOnSubmit.mutate(e)} id="addtoping">
              <Form.Label
                className="fs-3 mb-4 fw-bold"
                style={{ color: "#bd0707" }}
              >
                Topping
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Name Toping"
                name="title"
                onChange={handleChange}
                className="mb-4"
                style={{
                  borderColor: "#bd0707",
                  borderWidth: "3px",
                  backgroundColor: "#FFF3F7",
                }}
              />
              <Form.Control
                type="number"
                placeholder="Price"
                name="price"
                className="mb-4"
                onChange={handleChange}
                style={{
                  borderColor: "#bd0707",
                  borderWidth: "3px",
                  backgroundColor: "#FFF3F7",
                }}
              />
              <Form.Control
                type="number"
                placeholder="Input Stock Topping"
                name="qty"
                className="mb-4"
                onChange={handleChange}
                style={{
                  borderColor: "#bd0707",
                  borderWidth: "3px",
                  backgroundColor: "#FFF3F7",
                }}
              />

              <Stack className="position-relative">
                <Image
                  src={AttachIcon}
                  className="end-0 position-absolute mt-2 me-2"
                />

                <Form.Control
                  type="file"
                  placeholder="Input Image"
                  onChange={handleChange}
                  name="image"
                  style={{
                    width: "100%",
                    borderColor: "#bd0707",
                    borderWidth: "3px",
                    backgroundColor: "#FFF3F7",
                  }}
                />
              </Stack>

              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  type="submit"
                  style={{
                    width: "80%",
                    color: "white",
                    fontWeight: "bold",
                    borderColor: "#bd0707",
                    backgroundColor: "#bd0707",
                    marginTop: "20px",
                  }}
                >
                  Add Toping
                </Button>
              </div>
            </Form>
          </Col>
          <Col>
            <div className="d-flex flex-row justify-content-center">
              <Image src={preview} style={{ width: "70%" }} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default AddToping
