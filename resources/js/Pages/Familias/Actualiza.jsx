import { usePage } from "@inertiajs/react";
import React from "react";
import { Container } from "react-bootstrap";
import FormEdicionFamilia from "../../components/familias/FormEdicionFamilia";
import NavBar from "../../components/partials/NavBar";

export default function Actualiza() {
    const { familias } = usePage().props;
    return (
        <>
        <NavBar></NavBar>
            <Container className="align-items-center justify-content-center accesibilidad-texto mt-5">
                <FormEdicionFamilia />
            </Container>
        </>
    );
}
