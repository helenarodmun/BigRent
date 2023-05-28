import React from "react";
import NavBar from "../../components/partials/NavBar";
import Sidebar from "../../components/partials/Sidebar";
import FormNuevoContrato from '../../components/contratos/FormNuevoContrato'

export default function NuevoContrato() {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <NavBar></NavBar>
                <FormNuevoContrato></FormNuevoContrato>
            </div>
        </div>
    );
}
