import React from "react";
import { Container } from "react-bootstrap";
import CardCliente from "../../components/clientes/CardCliente";

export default function FichaCliente(props) {
    return (
        <>
            <Container>
            <p className="h1 mt-3">Ficha cliente</p>
                <CardCliente />
            </Container>
        </>
    );
}
