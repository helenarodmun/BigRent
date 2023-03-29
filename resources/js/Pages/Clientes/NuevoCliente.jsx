
import { usePage } from "@inertiajs/react";
import React from "react";
import { Col } from "react-bootstrap";
import FormCliente from "../../components/clientes/FormCliente";
import MensajesFlash from "../../components/partials/MensajesFlash";
import NavBar from "../../components/partials/NavBar";

export default function Create() {

    const { flash } = usePage().props;

    return (
        <>
                <NavBar></NavBar>
             <MensajesFlash></MensajesFlash>
                <FormCliente></FormCliente>
        </>
    );
}
