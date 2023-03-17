import { useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import FormCliente from "../../components/FormCliente";
import FormDirecciones from "../../components/FormDirecciones";

export default function Create() {

 
    return (
        <>
        <Container>
        <p className="h1">Creación de nuevo cliente</p>
<FormCliente></FormCliente>
<FormDirecciones></FormDirecciones>
</Container>
        </>
    );
}