import React from "react";
import { Container } from "react-bootstrap";
import FormActualizaTelefono from "../../components/clientes/FormAcrualizaTelefono";

export default function ActualizaTelefono() {
    return (
        <>
            <Container className="align-items-center justify-content-center accesibilidad-texto mt-5">
            <p className="h1 mt-3">Modificación datos de contacto</p>
                <FormActualizaTelefono />
            </Container>
        </>
    );
}
