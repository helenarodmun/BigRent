import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

const BuscaCliente = () => {
    const { clientes, resultado } = usePage().props;
    const [query, setQuery] = useState(resultado || '');

    const handleSearch = (event) => {
        setQuery(event.target.value);
    }

    return (
        <div>
            <h1>Clientes</h1>
            <form action="/clientes/buscar" method="get">
                <input type="text" name="q" value={query} onChange={handleSearch} />
                <button type="submit">Buscar</button>
            </form>
            <ul>
                {clientes.map((cliente) => (
                    <li key={cliente.id}>
                        <Link href={"/verCliente/" + clientes.id}>
                            {cliente.nombre_fiscal}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BuscaCliente;
