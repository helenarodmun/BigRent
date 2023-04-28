import { Link, usePage } from "@inertiajs/react";

export default function FichaMaquina() {
    const { maquina } = usePage().props;
    return (
      <div>
        <p className="h1">{maquina.descripcion}</p>
        <p>Referencia: {maquina.referencia}</p>
        <p>Subfamilia: {maquina.subfamilia.descripcion}</p>
        <p>Marca: {maquina.marca.denominacion}</p>
        <p>Precio alquiler por día: {maquina.subfamilia.precio_dia}</p>
        <p>Precio fianza: {maquina.subfamilia.fianza}</p>
        <img id= "img_maquinaria" class="img-fluid rounded d-block float-right" src={maquina.url_imagen} alt={maquina.descripcion} />
        <hr />
        <Link href="/maquinas">Volver al listado</Link>
      </div>
    );
  }