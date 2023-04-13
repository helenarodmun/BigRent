import { Link, useForm, usePage } from "@inertiajs/react";
import React, {useState} from "react";
import {
    Table,
    Row,
    Col,
    Form,
    Button,
    Card,
    FloatingLabel,
} from "react-bootstrap";
import DireccionContrato from "./DireccionContrato";
export default function FormNuevoContrato() {
    const { cliente, tiendas, series, flash } = usePage().props;  
    const [direccion, setDireccion] = useState('');
   
    return (
        <div>
              <div align="center">
            <Col sm={10}>
                {flash.creacion && (
                    <div class="alert alert-success" role={"alert"}>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="alert"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        {flash.creacion}
                    </div>
                )}
            </Col>
        </div>
            <p className="h3 m-3 mb-0">Nuevo contrato</p>
            <Row>
                <Col>
                    <Card className="shadow">
                        <Card.Header className="bg-warning bg-opacity-50">
                            <Card.Title>
                                <p className="h3 m-0">
                                    <small className="ms-2">
                                        <small>{cliente.id} - </small>
                                    </small>
                                    {cliente.nombre_fiscal}
                                </p>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>      
                            <DireccionContrato setDireccion={cliente} ></DireccionContrato>
                        </Card.Body>
                        <Card.Footer>
                        <Button variant="btn btn-info btn-lg m-5" method='get' href={"/nuevoContrato/" + cliente.id}><strong>Validar contrato</strong></Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
