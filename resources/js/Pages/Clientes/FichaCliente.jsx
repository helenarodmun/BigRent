import { usePage } from "@inertiajs/react";
import React from "react";
import { Col, Container } from "react-bootstrap";
import CardCliente from "../../components/clientes/CardCliente";
import TablaDirecciones from "../../components/clientes/TablaDirecciones";
import TablaTelefonos from "../../components/clientes/TablaTelefonos";
import NavBar from "../../components/partials/NavBar";

export default function FichaCliente() {
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
                <Container fluid className="form-container">
                    <CardCliente />
                </Container>
                <Container fluid className="tables-container">
                    <div className="table-container">
                        <TablaDirecciones></TablaDirecciones>
                    </div>
                    <div className="table-container">
                        <TablaTelefonos></TablaTelefonos>
                    </div>
                </Container>
            </div>
        </>
    );
}
