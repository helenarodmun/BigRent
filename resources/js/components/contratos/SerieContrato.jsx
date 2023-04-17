import { useEffect, useState } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Col, Table, Form } from "react-bootstrap";
import TipInfo from "../partials/TipInfo";
import ModalEliminacion from "../partials/ModalEliminacion";

export default function SerieContrato(series) {
    const series_tienda = series.setSerie;
    console.log(series_tienda)

    return (
        <div>       
        <Col className="shadow">  
        <p className="h4 m-3">Maquinaria disponible</p>             
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
                    {series_tienda.map((serie) => (                           
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