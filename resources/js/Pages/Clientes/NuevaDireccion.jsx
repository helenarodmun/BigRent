import { usePage } from "@inertiajs/react";
import React from "react";
import { Container } from "react-bootstrap";
import FormNuevaDireccion from "../../components/clientes/FormNuevaDireccion";
import NavBar from "../../components/partials/NavBar";
import Sidebar from "../../components/partials/Sidebar";

export default function NuevaDireccion() {
    const { direcciones } = usePage().props;
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <NavBar></NavBar>
                <Container className="align-items-center justify-content-center accesibilidad-texto mt-5">
                    <p className="h1 mt-3">Nueva dirección</p>
                    <FormNuevaDireccion />
                </Container>
            </div>
        </div>
    );
}
