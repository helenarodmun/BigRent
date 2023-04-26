import { Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Col, Table, Row, Container, Button } from "react-bootstrap";
import ModalConfirmacion from "../partials/ModalConfirmacion";
import TipInfo from "../partials/TipInfo";
export default function TablaContratos() {
    const { contratos, cliente, flash } = usePage().props;
    console.log(contratos)
    const { get } = useForm();
    //estado  y una función para actualizarlo llamada que controla la visualización de modal de confirmación.
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [idToUpdate, setIdToUpdate] = useState(null); // Nuevo estado para almacenar la id del registro a eliminar
    //función es llamada cuando se hace clic en el botón de eliminar, la cual establece el valor de showConfirmDeleteModal en true.
    const handleClick = (id) => {
        setShowConfirmModal(true);
        setIdToUpdate(id); // Se establece la id del registro a eliminar
    };
    function myDate(fechaHora) {
        return dayjs(fechaHora).locale("es").format("DD MMMM YYYY -  HH:mm:ss");
    }
    return (
        <>
            <Container>
                <Button variant="btn btn-info btn-lg m-3 bi bi-arrow-90deg-left"  href={"/verCliente/" + cliente.id}>  Volver al cliente</Button>
                <Row className="mt-2">
                    <Col className="shadow">
                        <h1 className="m-3">Contratos de {cliente.nombre_fiscal}</h1>
                        <Table striped bordered hover className="shadow" size="sm" responsive>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Fecha alta del contrato</th>
                                    <th>Fecha inicio</th>
                                    <th>Fecha Fin</th>
                                    <th>Total</th>
                                    <th>Activo</th>
                                    <th></th>
                                </tr>
                            </thead>
                            {contratos.map((contrato) => (
                                <tbody key={contrato.id} className="">
                                    <tr>
                                        <td>{contrato.id}</td>
                                        <td>{myDate(contrato.created_at)}</td>
                                        <td>{contrato.fecha_retirada}</td>
                                        <td>{contrato.fecha_entrega}</td>
                                        <td>{contrato.importe_total}</td>
                                        <td>{contrato.activo}</td>
                                        <td>
                                            <TipInfo content="Modificar contrato" direction="left">
                                            <button
                                                onClick={() =>
                                                    handleClick(
                                                        contrato.id
                                                    )
                                                }
                                                as="button"
                                                className="h5 border-0 bi bi-pencil-square text-primary m-1"
                                            />
                                            </TipInfo>
                                            <TipInfo content="Ver contrato" direction="left">
                                                <Link href={"/verContrato/" + contrato.id} as="button" className="h5 border-0 bi bi-search text-info m-2" />
                                            </TipInfo>
                                            <TipInfo content="Cerrar contrato" direction="left">
                                                <Link href={"/cerrarContrato/" + contrato.id} as="button" className="h5 border-0 bi bi-x-octagon-fill text-danger m-2" />
                                            </TipInfo>
                                            <ModalConfirmacion show={showConfirmModal}
                                                onHide={() => {
                                                    setIdToUpdate(null);
                                                    setShowConfirmModal(false);
                                                }}
                                                onConfirm={(urlAccion, idRegistro) => {
                                                    get(
                                                        `${urlAccion}/${idRegistro}`,
                                                        { onSuccess: () => { console.log("regitro actualizado"); }, });
                                                }}
                                                title="¡ADVERTENCIA!" message="Se va a proceder a modificar los datos del contrato. ¿Está seguro que desea continuar?"
                                                urlAccion="/actualizaContrato" idRegistro={idToUpdate} variant={'success'} text={'Aceptar'}/>
                                        </td>
                                    </tr>
                                </tbody>))}
                        </Table>
                    </Col>
                    <TipInfo content="Añadir nuevo contrato" direction="right">
                        <Link method="get" href={"/nuevoContrato/" + cliente.id} as="button" className="iconoSuma h3 border-0 bi bi-plus-square text-success m-1" />
                    </TipInfo>
                </Row>
            </Container>
        </>
    );
}