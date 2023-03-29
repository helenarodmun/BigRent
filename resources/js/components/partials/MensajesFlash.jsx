import React from "react";
import { usePage } from "@inertiajs/react";
import { Col } from "react-bootstrap";

export default function MensajesFlash() {
    const { flash } = usePage().props;

    return (
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
    );
}
