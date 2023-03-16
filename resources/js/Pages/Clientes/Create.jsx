import { useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";


export default function Create({children}) {
    const { flash } = usePage().props
      // Estado local para controlar el envío del formulario
      const [isSubmitting, setIsSubmitting] = useState(false);
    // useForm es un helper diseñado para formularios
    const { data, setData, post, processing, errors } = useForm({
        nombre_fiscal: "",
        nif: "",
        nombre_comercial: "",
        tipo: "",
        administrador: '',
        dni_administrador: '',
        url_escrituras: '',
        url_dni_administrador:'',
        url_cif:''
    });
    // Función que se ejecuta cuando se envía el formulario
    function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);      
        post(
            "/create",
            {
                onSuccess: () => {
                    console.log(data);
                },
            },
            data
        );
        setIsSubmitting(false);
    }
 
    return (
        <>
            <Container className="align-items-center justify-content-center accesibilidad-texto">
            {/* {flash.message && (
          <div class="alert">{flash.message}</div>
        )}
        {children} */}
                <Row className='shadow'>
                    <Col sm={8} className="mt-3 pt-3 shadow p-3 " >
                        <Card className="shadow">
                            <Card.Header >
                            <p className="h1">Crear nueva Empresa</p>
                            </Card.Header>
                            <Card.Body >
                                <Form  >
                                    <Form.Group>
                                        <Form.Label >Nombre Fiscal:</Form.Label>
                                        <Form.Control aria-label="nombre fiscal"
                                            type="text"
                                            name="nombre_fiscal"
                                            placeholder="Introduce el nombre fiscal"
                                            value={data.nombre_fiscal}
                                            onChange={(
                                                e // si cambia el valor se seteara el valor nuevo en el constructor
                                            ) =>
                                                setData(
                                                    "nombre_fiscal",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.nombre_fiscal && (
                                            <div className="alert alert-danger">
                                                {errors.nombre_fiscal}
                                            </div>
                                        )}
                                    </Form.Group>
                                    <Form.Group className='m-2'>
                                        <Form.Label>NIF:</Form.Label>
                                        <Form.Control aria-label="numero de identificación fiscal"
                                            type="text"
                                            name="nif"
                                            placeholder="Introduce el número de identificación fiscal"
                                            value={data.nif}
                                            onChange={(
                                                e // si cambia el valor se seteara el valor nuevo en el constructor
                                            ) =>
                                                setData(
                                                    "nif",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.nif && (
                                            <div className="alert alert-danger">
                                                {errors.nif}
                                            </div>
                                        )}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Nombre Comercial:</Form.Label>
                                        <Form.Control aria-label="nombre comercial"
                                            type="text"
                                            name="nombre_comercial"
                                            placeholder="Introduce el nombre comercial"
                                            value={data.nombre_comercial}
                                            onChange={(
                                                e // si cambia el valor se seteara el valor nuevo en el constructor
                                            ) =>
                                                setData("nombre_comercial", e.target.value)
                                            }
                                        />
                                        {errors.nombre_comercial && (
                                            <div className="alert alert-danger">
                                                {errors.nombre_comercial}
                                            </div>
                                        )}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Administrador:</Form.Label>
                                        <Form.Control aria-label="Administrador de la empresa"
                                            type="text"
                                            name="administrador"
                                            placeholder="Introduce el nombre del administrador de la empresa"
                                            value={data.administrador}
                                            onChange={(
                                                e // si cambia el valor se seteara el valor nuevo en el constructor
                                            ) =>
                                                setData(
                                                    "administrador",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.administrador && (
                                            <div className="alert alert-danger">
                                                {errors.administrador}
                                            </div>
                                        )}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>DNI Administrador:</Form.Label>
                                        <Form.Control aria-label="dni del administrador"
                                            type="text"
                                            name="dni_administrador"
                                            placeholder="Introduce el DNI del administrador de la empresa"
                                            value={data.dni_administrador}
                                            onChange={(
                                                e // si cambia el valor se seteara el valor nuevo en el constructor
                                            ) =>
                                                setData(
                                                    "dni_administrador",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.dni_administrador && (
                                            <div className="alert alert-danger">
                                                {errors.dni_administrador}
                                            </div>
                                        )}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>
                                            Tipo de cliente:
                                        </Form.Label>
                                        <Form.Select aria-label="tipo de cliente"
                                            as="select"
                                            name="tipo"
                                            value={data.tipo}
                                            onChange={(
                                                e // si cambia el valor se seteara el valor nuevo en el constructor
                                            ) =>
                                                setData("tipo", e.target.value)
                                            }
                                        >
                                            <option disabled>
                                                Escoja el tipo de cliente ...
                                            </option>
                                            <option value=""></option>
                                            <option value="Empresa">Empresa</option>
                                            <option value="Autónomo/Particular">Autónomo/Particular</option>
                                            <option value="Organismo/Institución">Organismo/Institución</option>
                                            <option value="Asociación">Asosiación</option>
                                        </Form.Select>
                                        {errors.tipo && (
                                            <div className="alert alert-danger">
                                                {errors.tipo}
                                            </div>
                                        )}
                                        </Form.Group>
                                        <p className="h3">Documentación</p>  
                                    <Form.Group >                                       
                                        <Form.Label>Escrituras:</Form.Label>
                                        <Form.Control aria-label="url escrituras"
                                            type="text"
                                            name="url_escrituras"
                                            placeholder=""
                                            value={data.url_escrituras}
                                            onChange={(
                                                e // si cambia el valor se seteara el valor nuevo en el constructor
                                            ) =>
                                                setData(
                                                    "url_escrituras",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.url_escrituras && (
                                            <div className="alert alert-danger">
                                                {errors.url_escrituras}
                                            </div>
                                        )}
                                    </Form.Group>
                                    <Form.Group >                                       
                                        <Form.Label>DNI Administrador:</Form.Label>
                                        <Form.Control aria-label="url dni administrador"
                                            type="text"
                                            name="url_dni_administrador"
                                            placeholder=""
                                            value={data.url_dni_administrador}
                                            onChange={(
                                                e // si cambia el valor se seteara el valor nuevo en el constructor
                                            ) =>
                                                setData(
                                                    "url_dni_administrador",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.url_dni_administrador && (
                                            <div className="alert alert-danger">
                                                {errors.url_dni_administrador}
                                            </div>
                                        )}
                                    </Form.Group>
                                    <Form.Group >                                       
                                        <Form.Label>CIF de la empresa:</Form.Label>
                                        <Form.Control aria-label=" url_cif" 
                                            type="text"
                                            name="url_cif"
                                            placeholder=""
                                            value={data.url_cif}
                                            onChange={(
                                                e // si cambia el valor se seteara el valor nuevo en el constructor
                                            ) =>
                                                setData(
                                                    "url_cif",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.url_cif && (
                                            <div className="alert alert-danger">
                                                {errors.url_cif}
                                            </div>
                                        )}
                                    </Form.Group>
                                    </Form>
                                    </Card.Body>
                                    <Card.Footer>
                                    <Button 
                                        size="lg" 
                                        clasName='m-3 shadow'
                                        variant="primary" 
                                        disabled={isSubmitting}
                                        onClick={handleSubmit} 
                                        aria-label="Guardar nueva empresa"
                                        >
                                          {isSubmitting
                                               ? "Guardando..."
                                               : "Guardar Registro"}
                                         
                                    </Button>
                            </Card.Footer>                    
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}