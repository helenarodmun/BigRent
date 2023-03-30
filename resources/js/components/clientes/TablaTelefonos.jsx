import { useForm, usePage } from "@inertiajs/react";
import { Col, Table } from "react-bootstrap";

export default function CardCliente({ children }) {
    const { telefonos, cliente } = usePage().props;

    // useForm es un helper diseñado para formularios
    const { data } = useForm({
        contacto: telefonos.contacto,
        via_comunicacion: telefonos.via_comunicacion,
        tipo: telefonos.tipo,
    });
    return (
        <div>
            <div>
                <Col className="mt-3 pt-3 shadow p-3 ">
                    <Table striped bordered hover className="shadow" responsive>
                        <thead>
                            <tr>
                                <th>Vía de comunicación</th>
                                <th>Contacto</th>
                                <th>Persona de contacto</th>
                            </tr>
                        </thead>
                        {telefonos.map((telefonos) => (
                            <tbody>
                                <tr key={telefonos.id}>
                                    <td>{telefonos.contacto}</td>
                                    {telefonos.via_comunicacion == "T" ? (
                                        <td>Teléfono</td>
                                    ) : (
                                        <td>Email</td>
                                    )}
                                    {telefonos.tipo == "T" ? (
                                        <td>Titular</td>
                                    ) : (
                                        <td>Autorizado</td>
                                    )}
                                </tr>
                            </tbody>
                        ))}
                    </Table>
                </Col>
            </div>
        </div>
    );
}
