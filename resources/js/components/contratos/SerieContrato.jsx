import { useEffect, useState } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Col, Table, Form } from "react-bootstrap";
import TipInfo from "../partials/TipInfo";
import ModalEliminacion from "../partials/ModalEliminacion";

export default function SerieContrato() {
    const { series, resultado} = usePage().props;
    // se crea el estado query utilizando la función useState y se establece su valor inicial como el valor de resultado, o una cadena vacía si no existe resultado
    const [query, setQuery] = useState(resultado || "");
    // función handleSearch que establece el valor del estado query como el valor del campo de búsqueda
    const handleSearch = (event) => {
        setQuery(event.target.value);
    };
    // variable resultadosBusqueda que filtra los clientes según su nombre fiscal, cif o nombre de administrador y los almacena en un array
    const resultadosBusqueda = series.filter(
        (serie) =>
            serie.maquina.descripcion
                .toLowerCase()
                .includes(query.toLowerCase()) ||
            serie.numero_serie.toLowerCase().includes(query.toLowerCase())
    );
    return (
        <div>       
        <Col className="shadow">  
        <p className="h4 m-3">Búsqueda máquina a alquilar</p>     
        <div className="container mt-5">
                <form action="/series/buscar" method="get" className="d-flex m-5" role="search">
                    <input
                        name="consulta"
                        value={query}
                        onChange={handleSearch}
                        className="form-control"
                        type="search"
                        placeholder="Buscar"
                        aria-label="Buscar serie"
                    />
                    <button className="btn btn-outline-success" type="submit">
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
                    { query && resultadosBusqueda.map((serie) => (                           
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