import React from "react";
import { Container } from "react-bootstrap";
import FichaMaquina from "../../components/maquinas/FichaMaquina";
import NavBar from "../../components/partials/NavBar";
import Sidebar from "../../components/partials/Sidebar";

export default function VistaMaquina() {
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <NavBar></NavBar>
                <Container className="align-items-center justify-content-center accesibilidad-texto mt-5">
                    <FichaMaquina />
                </Container>
            </div>
        </div>
    );
}
