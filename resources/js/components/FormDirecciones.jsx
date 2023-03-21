import { useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";


export default function FormDirecciones({children}) {
    const { flash, direcciones } = usePage().props
      // Estado local para controlar el envío del formulario
      const [isSubmitting, setIsSubmitting] = useState(false);
    // useForm es un helper diseñado para formularios
    const { data, setData, put, processing, errors } = useForm({
        direccion: direcciones.direccion,
        cp: direcciones.cp,
        localidad: direcciones.localidad,
        municipio: direcciones.municipio,
        provincia: direcciones.provincia,
        predeterminada: direcciones.predeterminada,
    });
    // Función que se ejecuta cuando se envía el formulario
    function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);      
        put(
            `/editarDireccion/${direcciones.id}`,
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
<div className="align-items-center justify-content-center accesibilidad-texto">
 {flash.message && (
<div class="alert">{flash.message}</div>
)}
{children} 
    <Row >
        <Col >
            <Card className="shadow">
                <Card.Header >
                <p className="h1">Direcciones</p>
                </Card.Header>
                <Card.Body >
                    <Form  onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label >Dirección:</Form.Label>
                            <Form.Control aria-label="dirección"
                                type="text"
                                name="direccion"
                                value={data.direccion}
                                onChange={(e) =>
                                setData(
                                        "direccion",
                                        e.target.value
                                    )
                                }
                            />
                            {errors.direccion && (
                                <div className="alert alert-danger">
                                    {errors.direccion}
                                </div>
                            )}
                        </Form.Group>
                        <Form.Group className='m-2'>
                            <Form.Label>Código Postal:</Form.Label>
                            <Form.Control aria-label="codigo postal"
                                type="text"
                                name="cp"
                                value={data.cp}
                                onChange={(e) =>
                                setData(
                                        "cp",
                                        e.target.value
                                    )
                                }
                            />
                            {errors.cp && (
                                <div className="alert alert-danger">
                                    {errors.cp}
                                </div>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Localidad:</Form.Label>
                            <Form.Control aria-label="localidad"
                                type="text"
                                name="localidad"
                                value={data.localidad}
                                onChange={(e) =>
                                setData("localidad", e.target.value)
                                }
                            />
                            {errors.localidad && (
                                <div className="alert alert-danger">
                                    {errors.localidad}
                                </div>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Municipio:</Form.Label>
                            <Form.Control aria-label="Municipio"
                                type="text"
                                name="municipio"
                                value={data.municipio}
                                onChange={(e) =>
                                setData(
                                        "municipio",
                                        e.target.value
                                    )
                                }
                            />
                            {errors.municipio && (
                                <div className="alert alert-danger">
                                    {errors.municipio}
                                </div>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Provincia:</Form.Label>
                            <Form.Control aria-label="provincia"
                                type="text"
                                name="provincia"
                                value={data.provincia}
                                onChange={(e) =>
                                setData(
                                        "provincia",
                                        e.target.value
                                    )
                                }
                            />
                            {errors.provincia && (
                                <div className="alert alert-danger">
                                    {errors.provincia}
                                </div>
                            )}
                        </Form.Group>
                        <Form.Group>
                                        <Form.Label>
                                            Tipo de dirección:
                                        </Form.Label>
                                        <Form.Select aria-label="tipo de dirección"
                                            as="select"
                                            name="predeterminada"
                                            value={data.predeterminada}
                                            onChange={(e) =>  setData("predeterminada", e.target.value)
                                            }
                                        >
                                            <option disabled>
                                                Escoja el tipo de dirección...
                                            </option>
                                            <option value=""></option>
                                            <option value='1'>Dirección de la empresa</option>
                                            <option value='0'>Dirección del alquiler</option>
                                        </Form.Select>
                                        {errors.predeterminada && (
                                            <div className="alert alert-danger">
                                                {errors.predeterminada}
                                            </div>
                                        )}
                                        </Form.Group>

                        </Form>
                        </Card.Body>
                        <Card.Footer>
                        <Button 
                            clasName='m-3 shadow'
                            variant="primary" 
                            disabled={isSubmitting}
                            onClick={handleSubmit} 
                            aria-label="Guardar nueva dirección"
                            >
                              {isSubmitting
                                   ? "Guardando..."
                                   : "Guardar Registro"}
                             
                        </Button>
                </Card.Footer>                    
            </Card>
        </Col>
    </Row>
</div>
    
        </>
    );
}
