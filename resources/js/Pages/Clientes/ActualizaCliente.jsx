import { usePage } from "@inertiajs/react";
import React from "react";
import { Col } from "react-bootstrap";
import FormActualizaCliente from "../../components/clientes/FormActualizaCliente";
import TablaEdicionDirecciones from "../../components/clientes/TablaEdicionDirecciones";
import TablaEdicionTelefonos from "../../components/clientes/TablaEdicionTelefonos";
import NavBar from "../../components/partials/NavBar";

export default function Update() {
    
    const { flash } = usePage().props;

    return (
        <>
            <NavBar></NavBar>
            <div align="center">
                <Col sm={10}>
                {flash.mensaje && (
                        <div class="alert alert-success" role={"alert"}>
                            <button
                                type="button"
                                class="close"
                                data-dismiss="alert"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                            {flash.mensaje}
                        </div>
                    )}
                    {flash.error && (
                        <div class="alert alert-danger" role={"alert"}>
                            <button
                                type="button"
                                class="close"
                                data-dismiss="alert"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                            {flash.error}
                        </div>
                    )}
                </Col>
            </div>
            <div className="update-container">
                <div className="form-container">
                    <FormActualizaCliente />
                </div>
                <div className="tables-container">
                    <div className="table-container">
                        <TablaEdicionDirecciones />
                    </div>
                    <div className="table-container">
                        <TablaEdicionTelefonos />
                    </div>
                </div>
            </div>
        </>
    );
}
