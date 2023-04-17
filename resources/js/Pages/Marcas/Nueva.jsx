import { usePage } from "@inertiajs/react";
import React from "react";
import { Container } from "react-bootstrap";
import FormNuevaMarca from "../../components/marcas/FormNuevaMarca";
import NavBar from "../../components/partials/NavBar";
import Sidebar from "../../components/partials/Sidebar";

export default function Nueva() {
    const { subfamilias, familias } = usePage().props;
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <NavBar></NavBar>
                <Container className="align-items-center justify-content-center accesibilidad-texto mt-5">
                    <FormNuevaMarca />
                </Container>
            </div>
        </div>
    );
}
