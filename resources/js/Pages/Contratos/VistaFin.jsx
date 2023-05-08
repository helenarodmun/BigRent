import React from "react";
import NavBar from "../../components/partials/NavBar";
import Sidebar from "../../components/partials/Sidebar";
import VerFin from '../../components/contratos/VerFin';

export default function VistaContrato() {
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <NavBar></NavBar>
                <VerFin></VerFin>
            </div>
        </div>
    );
}