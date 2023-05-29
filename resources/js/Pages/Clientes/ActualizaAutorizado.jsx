import { usePage } from "@inertiajs/react";
import React from "react";
import { Container } from "react-bootstrap";
import FormActualizaAutorizado from "../../components/clientes/FormActualizaAutorizado";
import NavBar from "../../components/partials/NavBar";
import Sidebar from "../../components/partials/Sidebar";

export default function ActualizaAutorizado() {
    const { autorizados, clientes } = usePage().props;
    return (
        <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <NavBar></NavBar>
          <div style={{ flex: 1, overflowY: "auto" }}>
            <Container className="align-items-center justify-content-center accesibilidad-texto mt-5">
              <p className="h1 mt-3">Modificación Autorizado</p>
              <FormActualizaAutorizado />
            </Container>
          </div>
        </div>
      </div>
    );
}
