import { usePage } from "@inertiajs/react";
import React from "react";
import { Container } from "react-bootstrap";
import FormNuevaMaquina from "../../components/maquinas/FormNuevaMaquina";
import NavBar from "../../components/partials/NavBar";
import Sidebar from "../../components/partials/Sidebar";

export default function Nueva() {
    const { subfamilias, maquinas } = usePage().props;
    return (
        <div style={{ display: "flex", height: "100vh" }}>
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
