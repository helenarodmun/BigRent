import { useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, FormControl, Table,} from "react-bootstrap";
import CardCliente from "../../components/CardCliente";

export default function FichaCliente(props) {

    return (
        <>
            <Container className="">
                <CardCliente/>
            </Container>
        </>
    );
}
