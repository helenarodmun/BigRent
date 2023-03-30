import { usePage } from "@inertiajs/react";
import React from "react";
import { Container } from "react-bootstrap";
import FormActualizaAutorizado from "../../components/clientes/FormActualizaAutorizado";
import NavBar from "../../components/partials/NavBar";

export default function ActualizaDireccion() {
    const { autorizados, clientes } = usePage().props;
    return (
        <>
        <NavBar></NavBar>
            <Container className="align-items-center justify-content-center accesibilidad-texto mt-5">
            <p className="h1 mt-3">Modificación Autorizado</p>
                <FormActualizaAutorizado />
            </Container>
        </>
    );
}
