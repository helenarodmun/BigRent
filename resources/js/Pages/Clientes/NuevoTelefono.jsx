import { usePage } from "@inertiajs/react";
import React from "react";
import { Container } from "react-bootstrap";
import FormNuevoTelefono from "../../components/clientes/FormNuevoTelefono";
import NavBar from "../../components/partials/NavBar";
import Sidebar from "../../components/partials/Sidebar";

export default function NuevaTelefono() {
    const { telefonos } = usePage().props;
    return (
        <div style={{ display: "flex"}}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <NavBar></NavBar>
                <Container className="align-items-center justify-content-center accesibilidad-texto mt-5">
                    <p className="h1 mt-3">Nuevos datos de contacto</p>
                    <FormNuevoTelefono />
                </Container>
            </div>
        </div>
    );
}
