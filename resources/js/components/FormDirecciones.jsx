import { useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";


export default function FormDirecciones({children}) {
    const { flash } = usePage().props
      // Estado local para controlar el envío del formulario
      const [isSubmitting, setIsSubmitting] = useState(false);
    // useForm es un helper diseñado para formularios
    const { data, setData, post, processing, errors } = useForm({
        direccion: "",
        cp: "",
        localidad: "",
        municipio: "",
        provincia: '',
        predeterminada: '',
    });
    // Función que se ejecuta cuando se envía el formulario
    function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);      
        post(
            "/nuevaDireccion",
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
{/* {flash.message && (
<div class="alert">{flash.message}</div>
)}
{children} */}
    <Row >
        <Col >
            <Card className="shadow">
                <Card.Header >
                <p className="h1">Direcciones</p>
                </Card.Header>
                <Card.Body >
                    <Form  >
                        <Form.Group>
                            <Form.Label >Dirección:</Form.Label>
                            <Form.Control aria-label="dirección"
                                type="text"
                                name="direccion"
                                placeholder="Introduce la dirección"
                                value={data.direccion}
                                onChange={(
                                    e // si cambia el valor se seteara el valor nuevo en el constructor
                                ) =>
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
                                placeholder="Introduce el códigp postal"
                                value={data.cp}
                                onChange={(
                                    e 
                                ) =>
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
                                placeholder="Introduce la localidad"
                                value={data.localidad}
                                onChange={(
                                    e 
                                ) =>
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
                                placeholder="Introduce el municipio"
                                value={data.municipio}
                                onChange={(
                                    e 
                                ) =>
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
                                placeholder="Introduce la provincia"
                                value={data.provincia}
                                onChange={(
                                    e 
                                ) =>
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
                            <Form.Check 
        type="radio"
        label="Dirección del cliente"
        name="predeterminada"
        value="true"
        checked={data.predeterminada === 'true'}
        onChange={(e) => setData(e.target.value)}
      />

      <Form.Check 
        type="radio"
        label="Dirección del alquiler"
        name="predeterminada"
        value="false"
        checked={data.predeterminada === 'false'}
        onChange={(e) => setData(e.target.value)}/>
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
                            size="lg" 
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
