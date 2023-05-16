import { Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Col, Container, Table, Button, Row, Form, InputGroup } from "react-bootstrap";
import ModalConfirmacion from "../partials/ModalConfirmacion";
import TipInfo from "../partials/TipInfo";

export default function TablaFamilias() {
    const { familias, flash, auth } = usePage().props;
    const { delete: destroy } = useForm();
    // se crea el estado query utilizando la función useState y se establece su valor inicial como  una cadena vacía 
    const [query, setQuery] = useState('');
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
        const value = event.target.value;
        setQuery(value);
      };
    // variable resultadosBusqueda que filtra los clientes según su nombre fiscal, cif o nombre de administrador y los almacena en un array
    const resultadosBusqueda = familias.data.filter(
        (familia) =>
        familia.nombre.toLowerCase().includes(query.toLowerCase()) 
    );
    const mostrarResultados = query.length >= 3 ? resultadosBusqueda : familias.data;
    const links = query.length >= 3 ? [] : familias.links;
    return (
        <Container>
             <div align="center">
                    <Col sm={10}>
                        {flash.error && (
                            <div class="alert alert-danger" role={"alert"}>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>{flash.error}
                            </div>)}
                    </Col>
                </div>
             <Row className="justify-content-end mt-5">
                    <Col xs="auto">
                <InputGroup action="/familias/buscar" method="get" className="d-flex shadow" role="search">
                    <InputGroup.Text className='bg-success bg-opacity-25'><i class="bi bi-search text-dark"></i></InputGroup.Text>
                    <Form.Control focus name="consulta" value={query} onChange={handleSearch} className="form-control" type="search" placeholder="Buscar" aria-label="Buscar subfamilia" />
                </InputGroup>
            </Col>
            </Row>
            <p className="h3 m-3">Listado familias</p>
            <Col className="shadow rounded">
                <Table striped bordered hover className="shadow" size="sm" responsive>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            {/* <th></th> */}
                        </tr>
                    </thead>
                    {mostrarResultados.map((familia) => (
                        <tbody key={familia.id}>
                            <tr>
                                <td>{familia.id}</td>
                                <td>{familia.nombre}</td>
                                {auth.user.rol == true ? (
                                    <>
                                        <td>
                                            <TipInfo content='Modificar familia' direction='left' >
                                                <Link method="get" href={"/editarFamilia/" + familia.id} as="button" className="h5 border-0 bi bi-pencil-square text-primary m-1" />
                                            </TipInfo>
                                            <TipInfo content='Eliminar familia' direction='left' >
                                                <button onClick={() => handleDeleteClick(familia.id)} as="button" className="h5 border-0 bi bi-trash3 text-danger m-1" />
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
                                                urlAccion="/eliminarFamilia"
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
            <TipInfo content='Añadir nueva familia' direction='right' >
                <Link method="get" href="/nuevaFamilia" as="button" className="iconoSuma h3 border-0 bi bi-plus-square text-success m-1" />
            </TipInfo>
        </Container>
    );
}
