import { usePage } from "@inertiajs/react";
import React from "react";
import { Container } from "react-bootstrap";
import FormNuevoTelefono from "../../components/clientes/FormNuevoTelefono";
import NavBar from "../../components/partials/NavBar";

export default function NuevaDireccion() {
    const { telefonos } = usePage().props;
    return (
        <>
        <NavBar></NavBar>
            <Container className="align-items-center justify-content-center accesibilidad-texto mt-5">
            <p className="h1 mt-3">Nuevos datos de contacto</p>
                <FormNuevoTelefono />
            </Container>
        </>
    );
}
