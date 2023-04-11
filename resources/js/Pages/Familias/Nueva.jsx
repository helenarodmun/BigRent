import { usePage } from "@inertiajs/react";
import React from "react";
import { Container } from "react-bootstrap";
import FormNuevaFamilia from "../../components/familias/FormNuevaFamilia";
import NavBar from "../../components/partials/NavBar";
import Sidebar from "../../components/partials/Sidebar";

export default function Nueva() {
    const { familias } = usePage().props;
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <NavBar></NavBar>
                <Container className="align-items-center justify-content-center accesibilidad-texto mt-5">
                    <p className="h1 mt-3">Nueva Familia</p>
                    <FormNuevaFamilia />
                </Container>
            </div>
        </div>
    );
}
