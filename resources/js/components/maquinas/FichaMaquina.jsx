import { Link, usePage } from "@inertiajs/react";

export default function FichaMaquina() {
    const { maquina } = usePage().props;
    return (
      <div>
        <h1>{maquina.descripcion}</h1>
        <p>Referencia: {maquina.referencia}</p>
        <p>Subfamilia: {maquina.subfamilia.descripcion}</p>
        <p>Marca: {maquina.marca.denominacion}</p>
        <p>Precio alquiler por día: {maquina.subfamilia.precio_dia}</p>
        <p>Precio fianza: {maquina.subfamilia.fianza}</p>
        <img src={maquina.url_imagen} alt={maquina.descripcion} />
        <hr />
        <Link href="/maquinas">Volver al listado</Link>
      </div>
    );
  }