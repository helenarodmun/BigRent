import React from "react";
import { usePage } from "@inertiajs/react";
import { Container } from "react-bootstrap";
export default function DocumentoContrato() {
    const { cliente, direccion, direccion_predeterminada, telefono, autorizado, contrato, subfamilia, maquina, serie, importe_alquiler } = usePage().props;
    const { data, get } = useForm({
        cliente_id: cliente.id,
        direccion_id: direccion.id,
        telefono_id: telefono.id,
        direccion_predeterminada: direccion_predeterminada.id,
        autorizado_id: autorizado.id,
        serie_id: serie.id,
        fecha_retirada: contrato.fecha_retirada,
        fecha_entrega: contrato.fecha_entrega,
        dias: contrato.dias,
        importe_total: contrato.importe_total,
        notas1: contrato.notas1,
        notas2: contrato.notas2 || ''
    });
    function myDate(fechaHora) {
        return dayjs(fechaHora).locale("es").format("DD MMMM YYYY");
    } 
    return (
<Container>
    <p className="h1">CONTRATO DE ALQUILER</p>
    <object data={props.pdfData} type="application/pdf" width="100%" height="100%"></object>
    <p>CLIENTE: {cliente.nombre_fiscal}</p>
    <p>NIF CLIENTE: {cliente.nif}</p>
    <p>DIRECCIÓN CLIENTE: {`${direccion_predeterminada.direccion} - ${direccion_predeterminada.cp} - ${direccion_predeterminada.municipio} - ${direccion_predeterminada.provincia}`}</p>
    <p>PERSONA AUTORIZADA: {autorizado.nombre_persona_autorizada}</p>
    <p>DIRECCIÓN CONTRATO: {`${direccion.direccion} - ${direccion.cp} - ${direccion.municipio} - ${direccion_predeterminada.provincia}`}</p>
    <p>CONTACTO: {telefono.contacto}</p>
    <p>MÁQUINA CONTRATADAE: {maquina.descripcion}</p>
    <p>NÚMERO DE SERIE: {serie.numero_serie}</p>
    <p>FECHA INICIO: {myDate(contrato.fecha_retirada)}</p>
    <p>FECHA FIN: {myDate(contrato.fecha_entrega)}</p>
    <p>NÚMERO DIAS: {contrato.dias}</p>
    <p>IMPORTE FIANZA: {`${subfamilia.fianza} €`}</p>
    <p>IMPORTE ALQUILER: {`${subfamilia.precio_dia} €/día`}</p>
    <p>TOTAL ALQUILER: {`${contrato.importe_total} €`}</p>
    <p>ESTADO ARTÍCULO - OBSERVACIONEs: {contrato.notas1}</p>
    <p>OBSERVACIONES CONTRATO: {contrato.notas2 || ''}</p>
</Container>
    )
}