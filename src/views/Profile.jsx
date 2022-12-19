import React, { useContext, useState } from "react"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { useQuery } from "react-query"
import Transaction from "../component/HistoryTrans"
import { UserContext } from "../context/userContext"
import { API } from "../config/api"
import ModalProfile from "../component/modal/ModalProfile"
import Foto from "../component/image/images.jpg"

const Profile = () => {
  const [state] = useContext(UserContext)
  let { data: profile, refetch } = useQuery("profileCache", async () => {
    const response = await API.get("/user")

    return response.data.data
  })

  const [show, setShow] = useState(false)

  return (
    <>
      <Container>
        <Row>
          <Col
            sm={6}
            className="d-flex flex-column p-3"
            style={{ border: "0" }}
          >
            <Card.Title
              className="fs-3 fw-bold mb-4"
              style={{ color: "#bd0707" }}
            >
              My Profile
            </Card.Title>
            <div className="d-flex flex-row gap-3">
              <Card.Img
                src={profile?.image === "" ? Foto : profile?.image}
                className="rounded-3"
                style={{
                  width: "200px",
                  height: "320px",
                  objectFit: "cover",
                }}
              />

              <Card.Body>
                <Card.Title style={{ color: "#613D2B" }}>Full Name</Card.Title>
                <Card.Text className="mb-4">{profile?.fullname}</Card.Text>
                <Card.Title style={{ color: "#613D2B" }}>Email</Card.Title>
                <Card.Text>{profile?.email}</Card.Text>
                <Card.Title style={{ color: "#613D2B" }}>Address</Card.Title>
                <Card.Text>{profile?.address}</Card.Text>
                <Card.Title style={{ color: "#613D2B" }}>Phone</Card.Title>
                <Card.Text>{profile?.phone}</Card.Text>
              </Card.Body>
            </div>
            <Button
              className="mt-5 ms-4"
              style={{ width: "150px" }}
              onClick={() => {
                setShow(true)
              }}
            >
              Edit Profile
            </Button>
          </Col>
          <Col className="d-flex flex-column p-3 gap-3">
            <p className="fs-3 fw-bold mb-0" style={{ color: "#613D2B" }}>
              My Transaction
            </p>
            <Transaction />
          </Col>
        </Row>
      </Container>
      <ModalProfile
        show={show}
        hide={() => {
          setShow(false)
        }}
        setShow={setShow}
        refetch={refetch}
      />
    </>
  )
}

export default Profile
