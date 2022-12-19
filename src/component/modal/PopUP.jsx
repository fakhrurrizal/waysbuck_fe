import React from "react"
import Modal from "react-bootstrap/Modal"

function ModalPopUp({ show, onHide }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h4 style={{ color: "#469F74" }} className="text-center m-0 p-5">
          Thank you for ordering in us, please wait to verify you order
        </h4>
      </Modal.Body>
    </Modal>
  )
}

export default ModalPopUp
