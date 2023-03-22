import { Link, usePage } from "@inertiajs/react";
import { Col, Container, Table } from "react-bootstrap";


export default function TablaTelefonos(){

    const {telefonos} = usePage().props;

    return(
        <div>                                  
        <Col
            className="shadow"
        >
            <Table
                striped
                bordered
                hover
                className="shadow"
                size="sm"
                responsive
            >
                <thead>
                    <tr>
                        <th>Teléfono</th>
                        <th>Correo electrónico</th>
                    </tr>
                </thead>
                {telefonos.map((telefonos) => (
                    <tbody>
                        <tr key={ telefonos.id }>
                            <td>{ telefonos.telefono }</td>
                            <td>{ telefonos.email }</td>
                            <td>
                                <Link
                                    href={"/editarTelefono/" + telefonos.id}
                                    as="button"
                                    className="bi bi-pencil-square text-success m-1"
                                />
                                <Link
                                method="delete"
                                    href={"/eliminarTelefono/" + telefonos.id}
                                    as="button"
                                    className="bi bi-trash3 text-danger m-1"
                                />
                            </td>
                        </tr>
                    </tbody>
                ))}
            </Table>
        </Col>
    </div>
    )
}