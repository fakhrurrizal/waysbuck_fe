import React from "react"
import JumbotronIcon from "./image/jumbotron.png"
import Rec2 from "./image/Rec2.png"
import { Container, Card } from "react-bootstrap"

const Jumbotron = () => {
  return (
    <>
      <Container className="d-flex mt-4 p-0">
        <Card
          className="d-flex justify-content-center mx-5 border-0 ps-5"
          style={{ width: "80%" }}
        >
          <Card.Img src={JumbotronIcon} className="" />

          <Card.Img
            fluid
            src={Rec2}
            style={{ left: "700px", position: "absolute", width: "45%" }}
          />

          <Card.Body
            className="d-flex justify-content-center flex-column text-white ms-5 mt-2"
            style={{ width: "50%", position: "absolute" }}
          >
            <Card.Title className="fs-1 fw-bold mb-0">WAYSBUCKS</Card.Title>
            <Card.Text className="fs-5 fw-light mt-3 mb-3">
              Things are changing, but we're still here for you
            </Card.Text>
            <Card.Text className="fs-6 fw-light mb-4">
              We have temporarily closed our in-store cafes, but select grocery
              and drive-thru locations remaining open.
              <span className="fw-bold">Waysbucks</span> Drivers is also
              available
            </Card.Text>
            <Card.Text className="fs-6 fw-light mb-4">Let's Order...</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}

export default Jumbotron
