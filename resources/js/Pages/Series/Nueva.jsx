import { usePage } from "@inertiajs/react";
import React from "react";
import { Container } from "react-bootstrap";
import FormNuevaSerie from "../../components/series/FormNuevaSerie";
import NavBar from "../../components/partials/NavBar";

export default function Nueva() {
    const { maquinas, series } = usePage().props;
    return (
        <>
        <NavBar></NavBar>
            <Container className="align-items-center justify-content-center accesibilidad-texto mt-5">
                <FormNuevaSerie />
            </Container>
        </>
    );
}
