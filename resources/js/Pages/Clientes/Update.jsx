import React from "react";
import { Container } from "react-bootstrap";
import FormActualizaCliente from "../../components/clientes/FormActualizaCliente";
import TablaDirecciones from "../../components/clientes/TablaDirecciones";
import TablaTelefonos from "../../components/clientes/TablaTelefonos";
import NavBar from "../../components/partials/NavBar"
export default function Update() {
    return (
        <>
        <NavBar></NavBar>
            <div className="update-container">
                <div className="form-container">
                    <FormActualizaCliente />
                </div>
                <div className="tables-container">
                    <div className="table-container">
                        <TablaDirecciones />
                    </div>
                    <div className="table-container">
                        <TablaTelefonos />
                    </div>
                </div>
            </div>
        </>
    );
}
