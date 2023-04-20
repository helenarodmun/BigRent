import React from "react";
import NavBar from "../../components/partials/NavBar";
import Sidebar from "../../components/partials/Sidebar";
import VerContrato from '../../components/contratos/VerContrato'

export default function NuevoContrato() {
   
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <NavBar></NavBar>
                {props.success && (
        <div className="alert alert-success">{props.success}</div>
    )}
                <VerContrato></VerContrato>
            </div>
        </div>
    );
}