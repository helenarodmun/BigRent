import React from "react";
import NavBar from "../../components/partials/NavBar";
import Sidebar from "../../components/partials/Sidebar";
import VerContrato from '../../components/contratos/VerContrato'
import { usePage } from "@inertiajs/react";

export default function VistaContrato() {
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <NavBar></NavBar>
                <VerContrato></VerContrato>
            </div>
        </div>
    );
}