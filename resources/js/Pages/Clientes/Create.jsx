import { useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import FormCliente from "../../components/clientes/FormCliente";
import FormDirecciones from "../../components/clientes/FormDirecciones";

export default function Create() {
    return (
        <>
            <Container>
                <p className="h2 mt-4">Creación de nuevo cliente</p>
                <FormCliente></FormCliente>
            </Container>
        </>
    );
}
