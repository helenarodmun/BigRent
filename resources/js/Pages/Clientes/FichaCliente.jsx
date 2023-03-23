import React from "react";
import { Container } from "react-bootstrap";
import CardCliente from "../../components/clientes/CardCliente";
import NavBar from "../../components/partials/NavBar";

export default function FichaCliente(props) {
    return (
        <>
            <div>
                <NavBar></NavBar>
                <CardCliente />
            </div>
        </>
    );
}
