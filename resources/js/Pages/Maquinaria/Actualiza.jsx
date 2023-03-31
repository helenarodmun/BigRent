import { usePage } from "@inertiajs/react";
import React from "react";
import { Container } from "react-bootstrap";
import FormEdicionMaquina from "../../components/maquinas/FormEdicionMaquina";
import NavBar from "../../components/partials/NavBar";

export default function Actualiza() {
    const { maquinas } = usePage().props;
    return (
        <>
        <NavBar></NavBar>
            <Container className="align-items-center justify-content-center accesibilidad-texto mt-5">
                <FormEdicionMaquina />
            </Container>
        </>
    );
}
