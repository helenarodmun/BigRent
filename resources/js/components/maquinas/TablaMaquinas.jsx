import { Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Col, Container, Table, Button} from "react-bootstrap";
import ModalConfirmacion from "../partials/ModalConfirmacion";
import TipInfo from "../partials/TipInfo";

export default function TablaMaquinas() {
    const { maquinas, resultado, flash, auth } = usePage().props;
    const { delete: destroy } = useForm();
    // se crea el estado query utilizando la función useState y se establece su valor inicial como el valor de resultado, o una cadena vacía si no existe resultado
    const [query, setQuery] = useState(resultado || "");
    //estado  y una función para actualizarlo llamada que controla la visualización de modal de confirmación.
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null); // Nuevo estado para almacenar la id del registro a eliminar
    //función es llamada cuando se hace clic en el botón de eliminar, la cual establece el valor de showConfirmDeleteModal en true.
    const handleDeleteClick = (id) => {
        setShowConfirmDeleteModal(true);
        setIdToDelete(id); // Se establece la id del registro a eliminar
    };
     // función handleSearch que establece el valor del estado query como el valor del campo de búsqueda
     const handleSearch = (event) => {
        setQuery(event.target.value);
    };
     // variable resultadosBusqueda que filtra los clientes según su nombre fiscal, cif o nombre de administrador y los almacena en un array
     const resultadosBusqueda = maquinas.data.filter(
        (maquina) =>
        maquina.subfamilia.descripcion.toLowerCase().includes(query.toLowerCase()) ||
                maquina.referencia.toLowerCase().includes(query.toLowerCase()) ||
                maquina.descripcion. toLowerCase().includes(query.toLowerCase())
    );
    return (
        <Container>
              <div className="container mt-5">
                <form action="/series/buscar" method="get" className="d-flex" role="search">
                    <input name="consulta" value={query} onChange={handleSearch} className="form-control" type="search" placeholder="Buscar" aria-label="Buscar serie" />
                    <button className="btn btn-outline-success" type="submit">Buscar</button>
                </form>
            </div>
            <p className="h3 m-3">Listado máquinas</p>
            <Col className="shadow rounded">
                <Table striped bordered hover className="shadow" size="sm" responsive>
                    <thead>
                        <tr>
                            <th>Artículo</th>
                            <th>Subfamilia</th>
                            <th>Referencia</th>
                            <th>Marca</th>
                            <th className="text-center">Disponibles en tienda</th>
                            <th></th>
                        </tr>
                    </thead>
                    {resultadosBusqueda.map((maquina) => (
                        <tbody key={maquina.id}>
                            <tr>
                                <td>{maquina.descripcion}</td>
                                <td>{maquina.subfamilia.descripcion}</td>
                                <td>{maquina.referencia}</td>
                                <td>{maquina.marca.denominacion}</td>
                                <td className="text-center"><strong width='25'>{maquina.series.length}</strong> uds.</td>
                                <td>
                                    <TipInfo content="Ver ficha" direction="left">
                                        <Link href={"/verFicha/" + maquina.id} as="button" className="h5 border-0 bi bi-file-text text-dark m-1" />
                                    </TipInfo>
                                    {auth.user.rol == true ? (
                                        <>
                                    <TipInfo content='Modificar máquina' direction='left'>
                                        <Link method="get" href={"/editarMaquina/" + maquina.id} as="button" className="h5 border-0 bi bi-pencil-square text-primary m-1" />
                                    </TipInfo>
                                    <TipInfo content='Borrar máquina' direction='left'>
                                        <button onClick={() => handleDeleteClick(maquina.id)} as="button" className="h5 border-0 bi bi-trash3 text-danger m-1" />
                                    </TipInfo>
                                    <ModalConfirmacion show={showConfirmDeleteModal}
                                        onHide={() => {
                                            setIdToDelete(null);
                                            setShowConfirmDeleteModal(false);
                                        }}
                                        onConfirm={(urlAccion, idRegistro) => {
                                            destroy(
                                                `${urlAccion}/${idRegistro}`,
                                                {
                                                    onSuccess: () => {
                                                        console.log("registro eliminado");
                                                    },
                                                }
                                            );
                                        }}
                                        title="¡ADVERTENCIA!"
                                        message="Se va a proceder a eliminar los datos de forma definitiva. ¿Está seguro que desea continuar?"
                                        urlAccion="/eliminarMaquina"
                                        idRegistro={idToDelete} variant={'danger'} text={'Eliminar'}
                                    />
                                    </>
                                    ) : null}
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </Table>
                {maquinas.links.map((link, index) => (
                            <Button key={index} variant="link" href={link.url} disabled={!link.url}>
                                {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                            </Button>
                        ))}
            </Col>
            <TipInfo content='Añadir nueva máquina' direction='left'>
                <Link method="get" href="/nuevaMaquina" as="button" className="iconoSuma h3 border-0 bi bi-plus-square text-success m-1" />
            </TipInfo>
        </Container>
    );
}
