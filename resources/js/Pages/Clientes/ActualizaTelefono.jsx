import React from "react";
import { Container } from "react-bootstrap";
import FormActualizaTelefono from "../../components/clientes/FormActualizaTelefono";
import NavBar from "../../components/partials/NavBar";
import Sidebar from "../../components/partials/Sidebar";

export default function ActualizaTelefono() {
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <NavBar></NavBar>
                <Container className="align-items-center justify-content-center accesibilidad-texto mt-5">
                    <p className="h1 mt-3">Modificación datos de contacto</p>
                    <FormActualizaTelefono />
                </Container>
            </div>
        </div>
    );
}
