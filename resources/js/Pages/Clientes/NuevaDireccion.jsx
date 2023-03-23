import { usePage } from "@inertiajs/react";
import React from "react";
import { Container } from "react-bootstrap";
import FormNuevaDireccion from "../../components/clientes/FormNuevaDireccion";

export default function NuevaDireccion() {
    const { direcciones } = usePage().props;
    return (
        <>
            <Container className="align-items-center justify-content-center accesibilidad-texto mt-5">
                <FormNuevaDireccion />
            </Container>
        </>
    );
}
