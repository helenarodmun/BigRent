import { usePage } from "@inertiajs/react";
import React from "react";
import { Col, Container } from "react-bootstrap";
import FormActualizaCliente from "../../components/clientes/FormActualizaCliente";
import TablaDirecciones from "../../components/clientes/TablaDirecciones";
import TablaTelefonos from "../../components/clientes/TablaTelefonos";
import NavBar from "../../components/partials/NavBar"
export default function Update() {
    const {flash} = usePage().props;
    return (
        <>
         
        <NavBar></NavBar>
        <div  align='center'>
            <Col sm={10}>
             {flash.mensaje && (
                        <div class="alert alert-success" role={"alert"}>
                            <button className="border-0"
                                type="button"
                                class="close border-0 me-2"
                                data-dismiss="alert"
                                aria-label="Close"
                                variant="success"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                            {flash.mensaje}
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
