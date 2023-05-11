import { Link, usePage } from "@inertiajs/react";
import { Col, Table, Row, Container, Button } from "react-bootstrap";
import TipInfo from "../partials/TipInfo";
export default function TablaContratos() {
    const { contratos, cliente, flash } = usePage().props;
    function myDate(fechaHora) {
        return dayjs(fechaHora).locale("es").format("DD MMMM YYYY -  HH:mm:ss");
    }
    function handlePageChange(pageNumber) {
        if (pageNumber !== activePage) {
            setActivePage(pageNumber);
            const url = contratos.path + '?page=' + pageNumber;
            window.history.pushState({}, '', url);
        }
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
                <Button variant="btn btn-primary btn-lg m-3 bi bi-arrow-90deg-left" href={"/verCliente/" + cliente.id}>  Volver al cliente</Button>
                <Row className="mt-2">
                    <Col className="shadow">
                        <h1 className="m-3">Contratos  {cliente.nombre_fiscal}</h1>
                        <Table striped bordered hover className="shadow" size="sm" responsive>
                            <thead>
                                <tr>
                                    <th>Id</th>
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
                    <TipInfo content="Añadir nuevo contrato" direction="right">
                        <Link method="get" href={"/nuevoContrato/" + cliente.id} as="button" className="iconoSuma h3 border-0 bi bi-plus-square text-success m-1" />
                    </TipInfo>
                </Row>
            </Container>
        </>
    );
}