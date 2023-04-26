import React from "react";
import { Container } from "react-bootstrap";
import FormActualizaContrato from "../../components/contratos/FormActualizaContrato";
import NavBar from "../../components/partials/NavBar";
import Sidebar from "../../components/partials/Sidebar";

export default function ActualizaDireccion() {
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <NavBar></NavBar>
                <Container className="align-items-center justify-content-center accesibilidad-texto mt-5">
                    <FormActualizaContrato />
                </Container>
            </div>
        </div>
    );
}