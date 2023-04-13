import { Link } from "@inertiajs/react";
import { Col, Table } from "react-bootstrap";
import TipInfo from "../partials/TipInfo";
export default function DireccionContrato(cliente){
   const direcciones = cliente.setDireccion;
    console.log(direcciones)
    return(
        <Col className="shadow">
        {direcciones.direcciones.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center">
                <p className="me-4">No existen direcciones asociadas a este cliente </p>
              
            </div>
        ) : (
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
                        <th>Dirección</th>
                        <th>Localidad</th>
                        <th>CP</th>
                        <th>Municipio</th>
                        <th>Provincia</th>
                        <th>Dirección pred.</th>
                        <th></th>
                    </tr>
                </thead>
                {direcciones.direcciones.map((direccion) => (
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
                               <TipInfo content='Seleccionar dirección' direction='top' >
                                    <Link
                                        method="get"
                                        href=''
                                        as="button"
                                        className="h5 border-0 bi bi-check-circle text-success m-1"
                                    />
                                    </TipInfo>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </Table>
        )}
    </Col>
    )
}