import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Col, Table } from "react-bootstrap";
import TipInfo from "../partials/TipInfo";
export default function DireccionContrato(props) {
    const { cliente } = usePage().props;
    const [direccionSeleccionada, setDireccionSeleccionada] = useState(null);

    const handleDireccionClick = (direccionSeleccionada) => {
        setDireccionSeleccionada(direccionSeleccionada);
        props.onDireccionSeleccionada(direccionSeleccionada);
    }
    return(
        <>
        <Col className="shadow">
            <p className="h4 m-3">Dirección del contrato</p>
            <Table striped bordered hover className="shadow" size="sm" responsive>
                <thead>
                    <tr>
                        <th>Dirección</th>
                        <th>Localidad</th>
                        <th>CP</th>
                        <th>Municipio</th>
                        <th>Provincia</th>
                        <th>Dirección pred.</th>
                        <th></th>
                    </tr>
                </thead>
                {cliente.direcciones.map((direccion) => (
                    <tbody className="">
                        <tr key={direccion.id}>
                            <td>{direccion.direccion}</td>
                            <td>{direccion.localidad}</td>
                            <td>{direccion.cp}</td>
                            <td>{direccion.municipio}</td>
                            <td>{direccion.provincia}</td>
                            {direccion.predeterminada == 0 ? (
                                <td>No</td>
                            ) : (
                                <td>Sí</td>
                            )}
                            <td>
                               <TipInfo content='Seleccionar dirección' direction='left' >
                                    <Link onClick={() => handleDireccionClick(direccion.id)} method="get" as="button" className="h5 border-0 bi bi-check-circle text-success m-1"/>
                                </TipInfo>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </Table>
    </Col>
 </>
    )
}