import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Card,
    FloatingLabel,
} from "react-bootstrap";

export default function FormCliente() {    
    const { tipos_cliente, flash } = usePage().props;
    // useForm es un helper diseñado para formularios
    const { data, setData, post, processing, errors } = useForm({
        nombre_fiscal: "",
        nif: "",
        nombre_comercial: "",
        administrador: "",
        dni_administrador: "",
        url_escrituras: "",
        url_dni_administrador: "",
        url_cif: "",
        anotaciones: "",
        direccion: "",
        cp: "",
        localidad: "",
        municipio: "",
        provincia: "",
        predeterminada: "",
        contacto: "",
        via_comunicacion: "",
        tipo:"",        
        tipo_cliente_id: "",
    });
    // Función que se ejecuta cuando se envía el formulario
    function handleSubmit(e) {
        e.preventDefault();        
        post(
            "/nuevoCliente",
            {
                onSuccess: () => {
                    console.log(data);
                },
            },
            data
        );                
    }

    return (
        <>
            <Container className="align-items-center justify-content-center accesibilidad-texto">  
            <div align="center">
            <Col sm={10}>
                {flash.errorCreacion && (
                    <div class="alert alert-danger" role={"alert"}>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="alert"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        {flash.errorCreacion}
                    </div>
                )}
            </Col>
        </div>              
                <p className="h3 mt-3 ms-3 mb-0">Creación de nuevo cliente</p>
                <Row>
                <Col xs="12" sm="10" md="12">
                    <Card className="shadow">
                        <Card.Body>
                            <Form>
                                <Row className="align-items-center">
                                <Col  xs="12" sm="6" md="6">
                                        <FloatingLabel
                                            label="NOMBRE COMERCIAL"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                            size="sm"
                                                aria-label="nombre comercial"
                                                type="text"
                                                name="nombre_comercial"
                                                placeholder="Introduce el nombre comercial"
                                                value={data.nombre_comercial}
                                                onChange={(e) =>
                                                    setData(
                                                        "nombre_comercial",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.nombre_comercial && (
                                                <div className="alert alert-danger">
                                                    {errors.nombre_comercial}
                                                </div>
                                            )}
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="6">
                                        <FloatingLabel
                                            label="NOMBRE FISCAL"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                                size="sm"
                                                aria-label="nombre fiscal"
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
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="3">
                                        <FloatingLabel
                                            label="NUM IDENTIFICACIÓN FISCAL"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                                size="sm"
                                                aria-label="numero de identificación fiscal"
                                                type="text"
                                                name="nif"
                                                placeholder="Introduce el número de identificación fiscal"
                                                value={data.nif}
                                                onChange={(e) =>
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
                                        </FloatingLabel>
                                    </Col>
                                   
                                    <Col xs="12" sm="6" md="5">
                                        <FloatingLabel
                                            label="ADMINISTRADOR"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                            size="sm"
                                                aria-label="Administrador de la empresa"
                                                type="text"
                                                name="administrador"
                                                placeholder="Introduce el nombre del administrador de la empresa"
                                                value={data.administrador}
                                                onChange={(e) =>
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
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="2">
                                        <FloatingLabel
                                            label="NIF"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                            size="sm"
                                                aria-label="dni del administrador"
                                                type="text"
                                                name="dni_administrador"
                                                placeholder="Introduce el DNI del administrador de la empresa"
                                                value={data.dni_administrador}
                                                onChange={(e) =>
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
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="2">
                                        <FloatingLabel
                                            label="TIPO"
                                            className="mb-2"
                                        >
                                            <Form.Select
                                            size="sm"
                                                aria-label="tipo de cliente"
                                                as="select"
                                                name="tipo_cliente_id"
                                                value={data.tipo_cliente_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "tipo_cliente_id",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option>
                                                    Seleccione tipo cliente...
                                                </option>
                                                {tipos_cliente.map((tipo) => (
                                              
                                              <option key={tipo.id} value={tipo.id}>
                                                  {tipo.tipo}
                                              </option>
                                          ))}
                                            </Form.Select>
                                            {errors.tipo_cliente && (
                                                <div className="alert alert-danger">
                                                    {errors.tipo_cliente}
                                                </div>
                                            )}
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="12">
                                        <FloatingLabel
                                            label="OBSERVACIONES"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                            size="sm"
                                                as="textarea"
                                                rows={3}
                                                name="anotaciones"
                                                value={data.anotaciones}
                                                onChange={(e) =>
                                                    setData(
                                                        "anotaciones",
                                                        e.target.value
                                                    )
                                                }
                                            ></Form.Control>
                                            {errors.anotaciones && (
                                                <div className="alert alert-danger">
                                                    {errors.anotaciones}
                                                </div>
                                            )}
                                        </FloatingLabel>
                                    </Col>
                                    <hr />
                                    <p className="h3">Direcciones</p>
                                    <Col xs="12" sm="6" md="6">
                                        <FloatingLabel
                                            label="DIRECCIÓN"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                            size="sm"
                                                aria-label="dirección"
                                                type="text"
                                                name="direccion"
                                                placeholder="Introduce la dirección"
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
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="2">
                                        <FloatingLabel
                                            label="CÓDIGO POSTAL"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                            size="sm"
                                                aria-label="codigo postal"
                                                type="text"
                                                name="cp"
                                                placeholder="Introduce el códigp postal"
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
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="4">
                                        <FloatingLabel
                                            label="LOCALIDAD"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                            size="sm"
                                                aria-label="localidad"
                                                type="text"
                                                name="localidad"
                                                placeholder="Introduce la localidad"
                                                value={data.localidad}
                                                onChange={(e) =>
                                                    setData(
                                                        "localidad",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.localidad && (
                                                <div className="alert alert-danger">
                                                    {errors.localidad}
                                                </div>
                                            )}
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="5">
                                        <FloatingLabel
                                            label="MUNICIPIO"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                            size="sm"
                                                aria-label="Municipio"
                                                type="text"
                                                name="municipio"
                                                placeholder="Introduce el municipio"
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
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="4">
                                        <FloatingLabel
                                            label="PROVINCIA"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                            size="sm"
                                                aria-label="provincia"
                                                type="text"
                                                name="provincia"
                                                placeholder="Introduce la provincia"
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
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="3">
                                        <FloatingLabel
                                            label="TIPO DIRECCIÓN"
                                            className="mb-2"
                                        >
                                            <Form.Select
                                            size="sm"
                                                aria-label="tipo de dirección"
                                                as="select"
                                                name="predeterminada"
                                                value={data.predeterminada}
                                                onChange={(e) =>
                                                    setData(
                                                        "predeterminada",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option>
                                                    Seleccione tipo de
                                                    dirección...
                                                </option>
                                                <option value="1">
                                                    Dirección predeterminada
                                                </option>
                                                <option value="0">
                                                    Dirección del alquiler
                                                </option>
                                            </Form.Select>
                                            {errors.predeterminada && (
                                                <div className="alert alert-danger">
                                                    {errors.predeterminada}
                                                </div>
                                            )}
                                        </FloatingLabel>
                                    </Col>
                                    <Row>
                                    <hr/>
                                    <p className="h3">Datos de contacto</p>
                                        <Col xs="12" sm="6" md="3">
                                            <FloatingLabel
                                                label="TELÉFONO / EMAIL"
                                                className="mb-2"
                                            >
                                                <Form.Control
                                                size="sm"
                                                    aria-label="datos de contacto"
                                                    type="text"
                                                    name="contacto"
                                                    value={data.contacto}
                                                    onChange={(e) =>
                                                        setData(
                                                            "contacto",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.contacto && (
                                                    <div className="alert alert-danger">
                                                        {errors.contacto}
                                                    </div>
                                                )}
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs="12" sm="7¡6" md="3">
                                        <FloatingLabel
                                            label="TIPO DE CONTACTO"
                                            className="mb-2"
                                        >
                                            <Form.Select
                                            size="sm"
                                                aria-label="vía de comunicación"
                                                as="select"
                                                name="via_comunicacion"
                                                value={data.via_comunicacion}
                                                onChange={(e) =>
                                                    setData(
                                                        "via_comunicacion",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option>
                                                    Seleccione tipo de
                                                    contacto...
                                                </option>
                                                <option value="T">
                                                    Teléfono
                                                </option>
                                                <option value="C">
                                                    Correo electrónico
                                                </option>
                                            </Form.Select>
                                            {errors.via_comunicacion && (
                                                <div className="alert alert-danger">
                                                    {errors.via_comunicacion}
                                                </div>
                                            )}
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="3">
                                        <FloatingLabel
                                            label="PERSONA DE CONTACTO"
                                            className="mb-2"
                                        >
                                            <Form.Select
                                            size="sm"
                                                aria-label="persona de contacto"
                                                as="select"
                                                name="tipo"
                                                value={data.tipo}
                                                onChange={(e) =>
                                                    setData(
                                                        "tipo",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option>
                                                    Seleccione la persona de contacto...
                                                </option>
                                                <option value="T">
                                                    Titular
                                                </option>
                                                <option value="A">
                                                    Autorizado
                                                </option>
                                            </Form.Select>
                                            {errors.tipo && (
                                                <div className="alert alert-danger">
                                                    {errors.tipo}
                                                </div>
                                            )}
                                        </FloatingLabel>
                                    </Col>
                                    </Row>
                                  
                                    <hr/>
                                    <p className="h3">Personas Autorizadas</p>
                                    <Col xs="12" sm="6" md="5">
                                        <FloatingLabel 
                                         label="NOMBRE PERSONA AUTORIZADA"
                                         className="mb-2">
                                            <Form.Control
                                            size="sm"
                                            aria-label="nombre persona autorizada"
                                            type="text"
                                            name="nombre_persona_autorizada"
                                            value={data.nombre_persona_autorizada}
                                            onChange={(e)=> setData(
                                                'nombre_persona_autorizada',
                                                e.target.value
                                            )}/>
                                            {errors.nombre_persona_autorizada && (
                                            <div className="alert alert-danger">
                                                {errors.nombre_persona_autorizada}
                                            </div>
                                        )}
                                         </FloatingLabel>
                                         </Col>
                                         <Col xs="12" sm="6" md="2">
                                         <FloatingLabel
                                         label="DNI"
                                         className="mb-2">
                                            <Form.Control
                                            size="sm"
                                            aria-label="dni persona autorizada"
                                            type="text"
                                            name="dni"
                                            value={data.dni}
                                            onChange={(e) => setData(
                                                'dni',
                                                e.target.value
                                            )}/>
                                             {errors.dni && (
                                            <div className="alert alert-danger">
                                                {errors.dni}
                                            </div>
                                        )}
                                         </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="4">
                                        <Form.Label>DNI:</Form.Label>
                                        <Form.Control
                                         className="mb-2"
                                        size="sm"
                                            aria-label="dni persona autorizada"
                                            type="file"
                                            name="url_dni"
                                            placeholder=""
                                            value={data.url_dni}
                                            onChange={(
                                                e // si cambia el valor se seteara el valor nuevo en el constructor
                                            ) =>
                                                setData(
                                                    "url_dni",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.url_dni && (
                                            <div className="alert alert-danger">
                                                {errors.url_dni}
                                            </div>
                                        )}
                                    </Col>
                                    <Col xs="12" sm="6" md="12">
                                        <FloatingLabel
                                            label="OBSERVACIONES"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                            size="sm"
                                                as="textarea"
                                                rows={3}
                                                name="notas"
                                                value={data.anotacionotasnes}
                                                onChange={(e) =>
                                                    setData(
                                                        "notas",
                                                        e.target.value
                                                    )
                                                }
                                            ></Form.Control>
                                            {errors.notas && (
                                                <div className="alert alert-danger">
                                                    {errors.notas}
                                                </div>
                                            )}
                                        </FloatingLabel>
                                    </Col>                                   
                                    <hr/>
                                    <p className="h3">Documentación</p>
                                    <Col xs="12" sm="6" md="4">
                                        <Form.Label>Escrituras:</Form.Label>
                                        <Form.Control
                                        size="sm"
                                            aria-label="url escrituras"
                                            type="file"
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
                                    </Col>
                                    <Col xs="12" sm="6" md="4">
                                        <Form.Label>
                                            DNI Administrador:
                                        </Form.Label>
                                        <Form.Control
                                        size="sm"
                                            aria-label="url dni administrador"
                                            type="file"
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
                                    </Col>
                                    <Col xs="12" sm="6" md="4">
                                        <Form.Label>
                                            CIF de la empresa:
                                        </Form.Label>
                                        <Form.Control
                                        size="sm"
                                            aria-label=" url_cif"
                                            type="file"
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
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Button
                            size='lg'
                                className="m-3 shadow"
                                variant="primary"
                                onClick={handleSubmit}
                                aria-label="Guardar nueva empresa"
                            >Guardar registro
                            </Button>
                            <Button
                            size='lg'
                                className="m-3 shadow"
                                variant="secondary"
                                href={'/clientes'}
                                aria-label="Volver a la vista anterior"
                            >Cancelar
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
                </Row>
            </Container>
        </>
    );
}
