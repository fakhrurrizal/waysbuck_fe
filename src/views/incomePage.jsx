import React from "react"
import { Container, Row, Table, Button, Stack } from "react-bootstrap"
import SuccessImg from "../component/image/icons/success.png"
import CancelImg from "../component/image/icons/cancel.png"
import { useQuery } from "react-query"
import { API } from "../config/api"

function IncomePage() {
  const formatIDR = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })
  let { data: trans, refetch } = useQuery("transCache", async () => {
    const response = await API.get("/transactions")

    return response.data.data
  })

  const handleSuccess = async (id) => {
    const form = {
      status: "success",
      id: id,
    }
    const body = JSON.stringify(form)

    await API.patch("/transUpdate/" + id, body)
    refetch()
  }

  const handleCancel = async (id) => {
    const form = {
      status: "cancel",
      id: id,
    }
    const body = JSON.stringify(form)

    await API.patch("/transUpdate/" + id, body)
    refetch()
  }

  return (
    <>
      <Container className="mb-5 mt-5">
        <Row>
          <p className="fs-3 mb-4 fw-bold" style={{ color: "#bd0707" }}>
            Income Transaction
          </p>
        </Row>
        <Row className="d-flex flex-row justify-content-center">
          <Table
            bordered
            hover
            style={{
              textAlign: "center",
              width: "90%",
              borderColor: "#828282",
            }}
          >
            <thead style={{ backgroundColor: "#E5E5E5" }}>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Income</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {trans?.map((e, index) => {
                return (
                  <tr key={index}>
                    <td>{e.id}</td>
                    <td>{e.name}</td>
                    <td>{e.address}</td>
                    <td>{e.phone}</td>
                    <td style={{ color: "#061E99" }}>
                      {formatIDR.format(e.total)}
                    </td>
                    <td>
                      {e?.status === "pending" ? (
                        <p style={{ color: "#ff9900" }}>Waiting Approve</p>
                      ) : e?.status === "cancel" ? (
                        <p style={{ color: "#e83939" }}>Cancel</p>
                      ) : e?.status === "success" ? (
                        <p style={{ color: "#34d12f" }}>On The Way</p>
                      ) : (
                        <p style={{ color: "#00d1ff" }}>Waiting Payment</p>
                      )}
                    </td>
                    <td>
                      <Stack
                        direction="horizontal"
                        gap={2}
                        className="d-flex justify-content-center"
                      >
                        {e?.status === "pending" ? (
                          <>
                            <Button
                              className="btn-danger"
                              onClick={() => {
                                handleCancel(e?.id)
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              className="btn-success"
                              onClick={() => {
                                handleSuccess(e?.id)
                              }}
                            >
                              Approve
                            </Button>
                          </>
                        ) : e?.status === "cancel" ? (
                          <img
                            className="justify-content-center"
                            src={CancelImg}
                          />
                        ) : e?.status === "success" ? (
                          <img
                            className="justify-content-center"
                            src={SuccessImg}
                          />
                        ) : (
                          <p style={{ color: "#00d1ff" }}>Waiting Payment</p>
                        )}
                      </Stack>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  )
}

export default IncomePage
