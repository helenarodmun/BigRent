import React from "react";
import { Container } from "react-bootstrap";
import CardCliente from "../../components/clientes/CardCliente";

export default function FichaCliente(props) {
    return (
        <>
            <Container>
                <CardCliente />
            </Container>
        </>
    );
}
