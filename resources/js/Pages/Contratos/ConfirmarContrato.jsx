import React from "react";
import NavBar from "../../components/partials/NavBar";
import Sidebar from "../../components/partials/Sidebar";
import VistaConfContrato from '../../components/contratos/VistaConfContrato'

export default function ConfirmarContrato() {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <NavBar></NavBar>
                <VistaConfContrato></VistaConfContrato>
            </div>
        </div>
    );
}
