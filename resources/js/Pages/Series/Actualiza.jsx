import { usePage } from "@inertiajs/react";
import React from "react";
import { Container } from "react-bootstrap";
import FormEdicionSerie from "../../components/series/FormEdicionSerie";
import NavBar from "../../components/partials/NavBar";
import Sidebar from "../../components/partials/Sidebar";

export default function Actualiza() {
    const { series } = usePage().props;
    return (
        <div style={{ display: "flex"}}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <NavBar></NavBar>
                <Container className="align-items-center justify-content-center accesibilidad-texto mt-5">
                    <FormEdicionSerie />
                </Container>
            </div>
        </div>
    );
}
