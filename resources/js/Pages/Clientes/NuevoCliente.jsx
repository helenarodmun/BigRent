import React from "react";
import FormCliente from "../../components/clientes/FormCliente";
import NavBar from "../../components/partials/NavBar";
import Sidebar from "../../components/partials/Sidebar";

export default function NuevoCliente() {
    return (
        <div style={{ display: "flex", height: "110vh" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <NavBar></NavBar>
                <FormCliente></FormCliente>
            </div>
        </div>
    );
}
