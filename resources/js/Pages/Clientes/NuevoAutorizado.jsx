import { usePage } from "@inertiajs/react";
import React from "react";
import { Container } from "react-bootstrap";
import FormNuevoAutorizado from "../../components/clientes/FormNuevoAutorizado";
import NavBar from "../../components/partials/NavBar";

export default function NuevoAutorizado() {
    const { cliente } = usePage().props;
    return (
        <>
        <NavBar></NavBar>
            <Container className="align-items-center justify-content-center accesibilidad-texto mt-5">
                <FormNuevoAutorizado/>
            </Container>
        </>
    );
}