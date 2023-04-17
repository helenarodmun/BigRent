import { useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Col, FloatingLabel, Form } from "react-bootstrap";

export default function TiendaContrato(tiendas) {
    const { data, setData, get } = useForm({
        id:'',
        codigo:'',
        nombre:''
    });

    const [series, setSeries] = useState([]);

    useEffect(() => {
        if (data.tienda_id) {
            get(`/series/${data.tienda_id}`).then(response => {
                setSeries(response.data);
            });
        }
    }, [data.tienda_id]);

    return (
        <div>
            <Col xs="12" sm="6" md="3">
                <Form>
                    <Form.Label className="m-2 mt-5 ">
                        <strong>
                            Seleccione la tienda para ver las máquinas
                            disponibles
                        </strong>
                    </Form.Label>
                    <Form.Select
                        size="sm"
                        aria-label="tienda"
                        as="select"
                        name="tienda_id"
                        value={data.tienda_id}
                        onChange={(e) => setData("tienda_id", e.target.value)}
                    >
                        <option>Seleccione la tienda...</option>
                        {Array.isArray(tiendas.tiendas) && tiendas.tiendas.map((tienda) => (
                            <option key={tienda.id} value={tienda.id}>{tienda.nombre}</option>
                        ))}
                    </Form.Select>
                </Form>
            </Col>
            <Col xs="12" sm="6" md="3">
                <Form>
                    <Form.Label className="m-2 mt-5 ">
                        <strong>
                            Seleccione la serie
                        </strong>
                    </Form.Label>
                    <Form.Select
                        size="sm"
                        aria-label="serie"
                        as="select"
                        name="serie_id"
                        value={data.serie_id}
                        onChange={(e) => setData("serie_id", e.target.value)}
                    >
                        <option>Seleccione la serie...</option>
                        {series.map((serie) => (
                            <option key={serie.id} value={serie.id}>
                                {serie.numero_serie}
                            </option>
                        ))}
                    </Form.Select>
                </Form>
            </Col>
        </div>
    );
}

