import { Link, usePage } from "@inertiajs/react";
import { Col, Table, Row, Container, Button } from "react-bootstrap";
import TipInfo from "../partials/TipInfo";
export default function TablaContratos() {
    const { contratos, flash } = usePage().props;
    console.log(contratos)
    function myDate(fechaHora) {
        return dayjs(fechaHora).locale("es").format("DD MMMM YYYY -  HH:mm:ss");
    }

    return (
        <>
            <div align="center">
                <Col sm={10}>
                    {flash.success && (
                        <div className="alert alert-info" role={"alert"}>
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            {flash.success}
                        </div>)}
                </Col>
            </div>
            <Container>
                <Row className="mt-2">
                    <Col className="shadow rounded">
                        <h1 className="m-3">Contratos</h1>
                        <Table striped bordered hover className="shadow" size="sm" responsive>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Cliente</th>
                                    <th>Serie</th>
                                    <th>Alta del contrato</th>
                                    <th>Fecha inicio</th>
                                    <th>Fecha Fin</th>
                                    <th>Total</th>
                                    <th>Activo</th>
                                    <th></th>
                                </tr>
                            </thead>
                            {contratos.data.map((contrato) => (
                                <tbody key={contrato.id} className="">
                                    <tr>
                                        <td>{contrato.id}</td>
                                        <td>{contrato.cliente.nombre_fiscal}</td>
                                        <td>{contrato.serie.numero_serie}</td>
                                        <td>{myDate(contrato.created_at)}</td>
                                        <td>{contrato.fecha_retirada}</td>
                                        <td>{contrato.fecha_entrega}</td>
                                        <td>{`${contrato.importe_total} €`}</td>
                                        {contrato.activo == 0 ? (
                                            <td className="text-danger">
                                                <strong>NO</strong>
                                            </td>
                                        ) : (
                                            <td className="text-success">
                                                <strong>SÍ</strong>
                                            </td>
                                        )}
                                        <td>
                                            <TipInfo content="Ver contrato" direction="left">
                                                <Link href={"/verContrato/" + contrato.id} as="button" className="h5 border-0 bi bi-search text-dark m-1" />
                                            </TipInfo>
                                            {/* {contrato.activo == 1 ? (
                                                <TipInfo content="Cerrar contrato" direction="left">
                                                    <Link href={"/finContrato/" + contrato.id} as="button" className="h5 border-0 bi bi-folder-plus text-dark m-2" />
                                                </TipInfo>
                                            ) : ('')} */}
                                        </td>
                                    </tr>
                                </tbody>))}
                        </Table>
                        {contratos.links.map((link, index) => (
                            <Button key={index} variant="link" href={link.url} disabled={!link.url}>
                                {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                            </Button>
                        ))}
                    </Col>
                </Row>
            </Container>
        </>
    );
}