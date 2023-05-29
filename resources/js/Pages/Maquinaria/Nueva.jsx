import React from "react";
import { Container } from "react-bootstrap";
import FormNuevaMaquina from "../../components/maquinas/FormNuevaMaquina";
import NavBar from "../../components/partials/NavBar";
import Sidebar from "../../components/partials/Sidebar";

export default function Nueva() {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <NavBar></NavBar>
                <Container className="align-items-center justify-content-center accesibilidad-texto mt-5">
                    <FormNuevaMaquina />
                </Container>
            </div>
        </div>
    );
}
