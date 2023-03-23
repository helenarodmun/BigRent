import React from "react";
import { Container } from "react-bootstrap";
import FormActualizaCliente from "../../components/clientes/FormActualizaCliente";
import TablaDirecciones from "../../components/clientes/TablaDirecciones";
import TablaTelefonos from "../../components/clientes/TablaTelefonos";

export default function Update() {
    return (
        <>
            <p className="h1 mt-3">Modificación Cliente</p>
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
