
import React from "react";
import FormCliente from "../../components/clientes/FormCliente";
import NavBar from "../../components/partials/NavBar";

export default function Create() {
    return (
        <>
            <div>
                <NavBar></NavBar>
                <FormCliente></FormCliente>
            </div>
        </>
    );
}
