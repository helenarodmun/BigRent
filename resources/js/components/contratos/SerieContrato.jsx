import { useEffect, useState } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Col, Table, Form } from "react-bootstrap";
import TipInfo from "../partials/TipInfo";
import ModalEliminacion from "../partials/ModalEliminacion";

export default function SerieContrato(series) {
    const series_tienda = series.setSerie;
    const { resultado } = usePage().props;
    // se crea el estado query utilizando la función useState y se establece su valor inicial como el valor de resultado, o una cadena vacía si no existe resultado
    const [query, setQuery] = useState(resultado || "");
    // función handleSearch que establece el valor del estado query como el valor del campo de búsqueda
    const handleSearch = (event) => {
        setQuery(event.target.value);
    };
    // variable resultadosBusqueda que filtra los clientes según su nombre fiscal, cif o nombre de administrador y los almacena en un array
    const resultadosBusqueda = series_tienda.filter(
        (serie) =>
            serie.maquina.descripcion
                .toLowerCase()
                .includes(query.toLowerCase()) ||
            serie.numero_serie.toLowerCase().includes(query.toLowerCase())
    );
    //estado  y una función para actualizarlo llamada que controla la visualización de modal de confirmación.
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null); // Nuevo estado para almacenar la id del registro a eliminar
    //función es llamada cuando se hace clic en el botón de eliminar, la cual establece el valor de showConfirmDeleteModal en true.
    const handleDeleteClick = (id) => {
        setShowConfirmDeleteModal(true);
        setIdToDelete(id); // Se establece la id del registro a eliminar
    };

    return (
        <div>       
        <Col className="shadow">  
        <p className="h4 m-3">Maquinaria disponible</p>     
        <div class="container mt-5">
                <form
                    action="/series/buscar"
                    method="get"
                    class="d-flex"
                    role="search"
                    onSubmit={(event) => {
                        // Validar la longitud de la consulta antes de enviarla al servidor
                        if (query.length < 3) {
                            event.preventDefault(); // Evitar que se envíe la solicitud
                            alert(
                                "La consulta debe tener al menos tres caracteres."
                            ); // Mostrar un mensaje de error
                        }
                    }}
                >
                    <input
                        name="consulta"
                        value={query}
                        onChange={handleSearch}
                        class="form-control"
                        type="search"
                        placeholder="Buscar"
                        aria-label="Buscar serie"
                    />
                    <button class="btn btn-outline-success" type="submit">
                        Buscar
                    </button>
                </form>
            </div>        
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
                            <th>Máquina</th>
                            <th>Número serie</th>
                            <th>Horometro</th>
                            <th>Hora inicio</th>
                            <th>Disponible</th>
                            <th></th>
                        </tr>
                    </thead>
                    {resultadosBusqueda.map((serie) => (                           
                        <tbody className="">
                            <tr key={serie.id}>
                                <td>{serie.maquina.descripcion}</td>
                                <td>{serie.numero_serie}</td> 
                                {serie.horometro === 0 ? (
                                    <td><strong>NO</strong></td>
                                ) : (
                                    <td><strong>SÍ</strong></td>
                                )}
                                <td>{serie.hora_inicio}</td>
                                {serie.disponible === 0 ? (
                                    <td className="text-danger"><strong>NO</strong></td>
                                ) : (
                                    <td className="text-success"><strong>SÍ</strong></td>
                                )}
                                <td>
                                <TipInfo content='Seleccionar máquina' direction='left' >
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
        </Col>
    </div>
    );
}