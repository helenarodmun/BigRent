import { usePage } from "@inertiajs/react";
import React from "react";
import { Container } from "react-bootstrap";
import FormNuevaSubfamilia from "../../components/subfamilias/FormNuevaSubfamilia";
import NavBar from "../../components/partials/NavBar";

export default function Nueva() {
    const { subfamilias, familias } = usePage().props;
    return (
        <>
        <NavBar></NavBar>
            <Container className="align-items-center justify-content-center accesibilidad-texto mt-5">
                <FormNuevaSubfamilia />
            </Container>
        </>
    );
}
