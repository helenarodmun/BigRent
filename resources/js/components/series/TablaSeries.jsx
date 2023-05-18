import { Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Col, Container, Table, Row, Button, Form, InputGroup, } from "react-bootstrap";
import ModalConfirmacion from "../partials/ModalConfirmacion";
import TipInfo from "../partials/TipInfo";
import FlashMessage from "../partials/FlashMessage";


const TablaSeries = () => {
    const { series,  auth, tiendas, flash } = usePage().props;
    const { delete: destroy } = useForm();
   // se crea el estado query utilizando la función useState y se establece su valor inicial como  una cadena vacía 
   const [query, setQuery] = useState('');
   // función handleSearch que establece el valor del estado query como el valor del campo de búsqueda
   const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);
  };
    // variable resultadosBusqueda que filtra las series según su número de serie, o descripcioón del artículoy los almacena en un array
    const resultadosBusqueda = series.data.filter(
        (serie) =>
            serie.maquina.descripcion
                .toLowerCase()
                .includes(query.toLowerCase()) ||
            serie.numero_serie.toLowerCase().includes(query.toLowerCase())
    );
    const mostrarResultados = query.length >= 3 ? resultadosBusqueda : series.data;
    const links = query.length >= 3 ? [] : series.links;
    //estado  y una función para actualizarlo llamada que controla la visualización de modal de confirmación.
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null); // Nuevo estado para almacenar la id del registro a eliminar
    //función es llamada cuando se hace clic en el botón de eliminar, la cual establece el valor de showConfirmDeleteModal en true.
    const handleDeleteClick = (id) => {
        setShowConfirmDeleteModal(true);
        setIdToDelete(id); // Se establece la id del registro a eliminar
    };
    return (
        <Container>
          <FlashMessage success={flash.success} error={flash.error} />
                <Row className="justify-content-end mt-5">
                    <Col xs="auto">
                        <InputGroup action="/maquinas/buscar" method="get" className=" shadow" role="search">
                            <InputGroup.Text className='bg-success bg-opacity-25'><i className="bi bi-search text-dark"></i></InputGroup.Text>
                            <Form.Control  name="consulta" value={query} onChange={handleSearch} className="form-control" type="search" placeholder="Buscar" aria-label="Buscar subfamilia" />
                        </InputGroup>
                    </Col>
                </Row>
            <p className="h3 m-3">Listado series</p>
            <Row>
                <Col className="shadow">
                    <Table striped bordered hover className="shadow" size="sm" responsive>
                        <thead>
                            <tr>
                                <th>Máquina</th>
                                <th>Número serie</th>
                                <th>Horómetro</th>
                                <th>Hora inicio</th>
                                <th>Disponible</th>
                                {auth.user.rol == true ? (
                                    <>
                                    <th>Tienda</th>
                                    <th></th></>):('')}
                            </tr>
                        </thead>
                        {mostrarResultados.map((serie) => (
                            <tbody key={serie.id}>
                                <tr>
                                    <td>{serie.maquina.descripcion}</td>
                                    <td>{serie.numero_serie}</td>
                                    {serie.horometro === 0 ? (
                                        <td>
                                            <strong>NO</strong>
                                        </td>
                                    ) : (
                                        <td>
                                            <strong>SÍ</strong>
                                        </td>
                                    )}
                                    <td>{serie.hora_inicio}</td>
                                    {serie.disponible === 0 ? (
                                        <td className="text-danger">
                                            <strong>NO</strong>
                                        </td>
                                    ) : (
                                        <td className="text-success">
                                            <strong>SÍ</strong>
                                        </td>
                                    )}
                                    {auth.user.rol == true ? (
                                        <>
                                        <td>{serie.tienda.nombre}</td>
                                            <td>
                                                <TipInfo content="Modificar serie" direction="left">
                                                    <Link method="get" href={"/editarSerie/" + serie.id} as="button" className="h5 border-0 bi bi-pencil-square text-primary m-1" />
                                                </TipInfo>
                                                <TipInfo content="Borrar serie" direction="left">
                                                    <button onClick={() => handleDeleteClick(serie.id)} as="button" className="h5 border-0 bi bi-trash3 text-danger m-1" />
                                                </TipInfo>
                                                <ModalConfirmacion
                                                    show={showConfirmDeleteModal}
                                                    onHide={() => {
                                                        setIdToDelete(null);
                                                        setShowConfirmDeleteModal(
                                                            false
                                                        );
                                                    }}
                                                    onConfirm={(
                                                        urlAccion,
                                                        idRegistro
                                                    ) => {
                                                        destroy(
                                                            `${urlAccion}/${idRegistro}`,
                                                            {
                                                                onSuccess: () => {
                                                                    console.log(
                                                                        "registro eliminado"
                                                                    );
                                                                },
                                                            }
                                                        );
                                                    }}
                                                    title="¡ADVERTENCIA!"
                                                    message="Se va a proceder a eliminar los datos de forma definitiva. ¿Está seguro que desea continuar?"
                                                    urlAccion="/eliminarSerie"
                                                    idRegistro={idToDelete} variant={'danger'} text={'Eliminar'}
                                                />
                                            </td>
                                        </>
                                    ) : null}
                                </tr>
                            </tbody>
                        ))}
                    </Table>
                    <Row className="justify-content-center">
        <Col sm={12} md={6} className="text-center">
          <nav>
            <ul className="pagination justify-content-center">
              {links.map((link, index) => (
                <li key={index} className={`page-item ${link.active ? 'active' : ''}`}>
                  {link.label === '&laquo; Anterior' ? (
                    <Button variant="link" disabled={link.url === null} href={link.url}>
                        {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                    </Button>
                  ) : (
                    <Button variant="link" disabled={link.url === null} href={link.url}>
                        {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </Col>
      </Row>
                </Col>
            </Row>
            <TipInfo content="Añadir nueva serie" direction="right">
                <Link method="get" href="/nuevaSerie" as="button" className="iconoSuma h3 border-0 bi bi-plus-square text-success m-1" />
            </TipInfo>
        </Container>
    );
};
export default TablaSeries;
