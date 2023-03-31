import { usePage } from "@inertiajs/react";
import React from "react";
import { Container } from "react-bootstrap";
import FormNuevaFamilia from "../../components/familias/FormNuevaFamilia";
import NavBar from "../../components/partials/NavBar";

export default function NuevaFamilia() {
    const { familias } = usePage().props;
    return (
        <>
        <NavBar></NavBar>
            <Container className="align-items-center justify-content-center accesibilidad-texto mt-5">
            <p className="h1 mt-3">Nueva Familia</p>
                <FormNuevaFamilia />
            </Container>
        </>
    );
}
