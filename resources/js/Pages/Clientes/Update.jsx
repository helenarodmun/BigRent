import { Link, useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, FormControl, Table,} from "react-bootstrap";
import FormActualizaCliente from "../../components/FormActualizaCliente";

export default function Update() {


    return (
        <>
            <Container className="align-items-center justify-content-center accesibilidad-texto">
              <FormActualizaCliente/>
            </Container>
        </>
    );
}
