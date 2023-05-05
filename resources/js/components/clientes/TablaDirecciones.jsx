import { useForm, usePage } from "@inertiajs/react";
import { Col, Table } from "react-bootstrap";

export default function TablaDirecciones({ children }) {
    const { direcciones, clientes, flash } = usePage().props;
    console.log(direcciones);
    // useForm es un helper diseñado para formularios
    const { data } = useForm({
        direccion: direcciones.direccion,
        cp: direcciones.cp,
        localidad: direcciones.localidad,
        municipio: direcciones.municipio,
        provincia: direcciones.provincia,
        predeterminada: direcciones.predeterminada,
    });
    return (
        <div>
             <div align="center">
                <Col sm={10}>
                    {flash.error && (
                        <div className="alert alert-success" role={"alert"}>
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            {flash.error}
                        </div>)}
                </Col>
            </div>
            <div>
                <Col className="pt-3 shadow p-3 ">
                    <Table striped bordered hover className="shadow" size="sm" responsive>
                        <thead>
                            <tr>
                                <th>Dirección</th>
                                <th>Localidad</th>
                                <th>Código Postal</th>
                                <th>Municipio</th>
                                <th>Provincia</th>
                                <th>Dirección predeterminada</th>
                            </tr>
                        </thead>
                        {direcciones.map((direcciones) => (
                            <tbody key={direcciones.id}>
                                <tr key={direcciones.id}>
                                    <td>{direcciones.direccion}</td>
                                    <td>{direcciones.localidad}</td>
                                    <td>{direcciones.cp}</td>
                                    <td>{direcciones.municipio}</td>
                                    <td>{direcciones.provincia}</td>
                                    {direcciones.predeterminada == 0 ? (
                                        <td key={direcciones.id}>No</td>
                                    ) : (
                                        <td>Sí</td>
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
