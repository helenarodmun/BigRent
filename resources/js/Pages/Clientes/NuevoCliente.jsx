
import { usePage } from "@inertiajs/react";
import React from "react";
import { Col } from "react-bootstrap";
import FormCliente from "../../components/clientes/FormCliente";
import NavBar from "../../components/partials/NavBar";

export default function Create() {

    const { flash } = usePage().props;

    return (
        <>
                <NavBar></NavBar>
                <div align="center">
                <Col sm={10}>
                {flash.mensaje && (
                        <div className="alert alert-success" role={"alert"}>
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
                        <div className="alert alert-danger" role={"alert"}>
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
                <FormCliente></FormCliente>
        </>
    );
}
