import { usePage } from "@inertiajs/react";
import React from "react";
import { Container } from "react-bootstrap";
import FormActualizaDireccion from "../../components/clientes/FormActualizaDireccion";
import FormNuevaDireccion from "../../components/clientes/FormActualizaDireccion";

export default function ActualizaDireccion() {
    const { direcciones, clientes } = usePage().props;
    return (
        <>
            <Container className="align-items-center justify-content-center accesibilidad-texto mt-5">
                <FormActualizaDireccion />
            </Container>
        </>
    );
}
