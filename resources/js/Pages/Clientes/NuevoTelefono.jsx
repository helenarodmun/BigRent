import { usePage } from "@inertiajs/react";
import React from "react";
import { Container } from "react-bootstrap";
import FormNuevoTelefono from "../../components/clientes/FormNuevoTelefono";

export default function NuevaDireccion() {
    const { telefonos } = usePage().props;
    return (
        <>
            <Container className="align-items-center justify-content-center accesibilidad-texto mt-5">
            <p className="h1 mt-3">Nuevos datos de contacto</p>
                <FormNuevoTelefono />
            </Container>
        </>
    );
}
