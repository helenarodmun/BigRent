import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalConfirmacion({
  show,
  onHide,
  onConfirm,
  title,
  message,
  urlAccion,
  idRegistro,
}) {
  const handleDelete = () => {
    onConfirm(urlAccion, idRegistro);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
