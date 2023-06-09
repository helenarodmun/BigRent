<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContratoForm;
use App\Models\Autorizado;
use App\Models\Cliente;
use App\Models\Contrato;
use App\Models\Direccion;
use App\Models\Familia;
use App\Models\Maquina;
use App\Models\Serie;
use App\Models\Subfamilia;
use App\Models\Telefono;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ContratoController extends Controller
{

    public function index()
    {
        $user = Auth::user();

        if ($user->rol == 1) {
            // Usuario con rol 1 (admin) muestra todos los contratos
            $contratos = Contrato::orderBy('activo', 'desc')
                ->orderBy('created_at', 'desc')
                ->with('cliente')
                ->with('serie')
                ->paginate(15);
        } else {
            // Usuario no admin, muestra los contratos de su tienda
            $tiendaId = $user->tienda_id;

            $contratos = Contrato::whereHas('serie', function ($query) use ($tiendaId) {
                $query->where('tienda_id', $tiendaId);
            })
                ->orderBy('activo', 'desc')
                ->orderBy('created_at', 'desc')
                ->with('cliente')
                ->with('serie')
                ->paginate(15);
        }

        return Inertia::render('Contratos/Todos', [
            'contratos' => $contratos
        ]);
    }


    public function confirmarContrato(ContratoForm $request)
    {
        $data = $request->validated();

        $cliente = Cliente::findOrFail($data['cliente_id']);
        $direccion_predeterminada = Direccion::buscaDireccionPredeterminada($data['cliente_id']);
        $direccion = Direccion::findOrFail($data['direccion_id']);
        $telefono = Telefono::findOrFail($data['telefono_id']);
        $correo = Telefono::first()->where('via_comunicacion', 'C');
        $autorizado = Autorizado::findOrFail($data['autorizado_id']);
        $serie = Serie::findOrFail($data['serie_id']);
        $maquina = $serie->maquina;
        $subfamilia = $maquina->subfamilia;
        $correo = Telefono::where('via_comunicacion', 'C')->first()->contacto;

        // si la máquina se devuelve el mismo día cobrar un día, si no calcular
        if ($data['fecha_retirada'] == $data['fecha_entrega']) {
            $dias_alquiler = 1;
        } else {
            // Calcular los días a partir de las fechas de inicio y fin
            $dias_alquiler = Contrato::calcularDiasDeAlquiler($data['fecha_retirada'], $data['fecha_entrega'], $cliente->tipo->confDias);
        }

        // Calcular el importe total según los precio estipulado en la tabla subfamilia
        $importe_alquiler = $subfamilia->precio_dia * $dias_alquiler;

        $contrato = [
            'fecha_retirada' => $data['fecha_retirada'],
            'fecha_entrega' => $data['fecha_entrega'],
            'dias' => $dias_alquiler,
            'importe_total' => $importe_alquiler,
            'notas1' => $data['notas1'],
            'notas2' => $data['notas2'],
            'cliente_id' => $data['cliente_id'],
            'serie_id' => $data['serie_id'],
            'direccion_id' => $data['direccion_id'],
            'autorizado_id' => $data['autorizado_id'],
            'telefono_id' => $data['telefono_id']
        ];
        return Inertia::render('Contratos/ConfirmarContrato', [
            'cliente' => $cliente,
            'direccion' => $direccion,
            'direccion_predeterminada' => $direccion_predeterminada,
            'telefono' => $telefono,
            'autorizado' => $autorizado,
            'contrato' => $contrato,
            'subfamilia' => $subfamilia,
            'maquina' => $maquina,
            'serie' => $serie,
            'correo' => $correo
        ]);
    }


    public function create(ContratoForm $request)
    {
        $data = $request->validated();

        //OBtener el cliente para comprobar el tipo y acceder a la configuración de cálculo de días
        $cliente = Cliente::findOrFail($data['cliente_id']);
        $direccion_predeterminada = Direccion::buscaDireccionPredeterminada($data['cliente_id']);
        $telefono = Telefono::findOrFail($data['telefono_id']);
        $autorizado = Autorizado::findOrFail($data['autorizado_id']);
        $serie = Serie::findOrFail($data['serie_id']);
        $maquina = $serie->maquina;
        $subfamilia = $maquina->subfamilia;
        $serie = Serie::findOrFail($data['serie_id']);
        $maquina = $serie->maquina;
        $subfamilia = $maquina->subfamilia;

        // si la máquina se devuelve el mismo día cobrar un día, si no calcular
        if ($data['fecha_retirada'] == $data['fecha_entrega']) {
            $dias_alquiler = 1;
        } else {
            // Calcular los días a partir de las fechas de inicio y fin
            $dias_alquiler = Contrato::calcularDiasDeAlquiler($data['fecha_retirada'], $data['fecha_entrega'], $cliente->tipo->confDias);
        }

        // Calcular el importe total según los precio estipulado en la tabla subfamilia
        $importeTotal = $subfamilia->precio_dia * $dias_alquiler;

        $serie->disponible = false;
        $serie->save();

        $contrato = Contrato::create([
            'fecha_retirada' => $data['fecha_retirada'],
            'fecha_entrega' => $data['fecha_entrega'],
            'dias' => $dias_alquiler,
            'importe_total' => $importeTotal,
            'notas1' => $data['notas1'],
            'notas2' => $data['notas2'],
            'cliente_id' => $data['cliente_id'],
            'serie_id' => $serie->id,
            'direccion_id' => $data['direccion_id'],
            'telefono_id' => $data['telefono_id'],
            'autorizado_id' => $data['autorizado_id']
        ]);
        $cliente = Cliente::findOrFail($cliente->id);

        Session::flash('success', 'Contrato guardado con éxito');

        return Inertia::render('Contratos/ConfirmarContrato', [
            'cliente' => $cliente,
            'direccion' => $contrato->direccion,
            'direccion_predeterminada' => $direccion_predeterminada,
            'telefono' => $telefono,
            'autorizado' => $autorizado,
            'contrato' => $contrato,
            'subfamilia' => $subfamilia,
            'maquina' => $maquina,
            'serie' => $serie,
        ]);
    }

    public function verListadoContratos($id, Request $request)
    {
        $cliente = Cliente::findOrFail($id);
        $user = Auth::user();
        $contratosQuery = Contrato::where('cliente_id', $id)
            ->orderBy('activo', 'desc')
            ->orderBy('created_at', 'desc')
            ->with('serie');
        if ($user->rol != 1) {
            // Usuario no admin, filtra los contratos por las series de su tienda
            $tiendaId = $user->tienda_id;

            $contratosQuery->whereHas('serie', function ($query) use ($tiendaId) {
                $query->where('tienda_id', $tiendaId);
            });
        }
        // // Aplicar filtros de búsqueda si están presentes
        // $consulta = $request->input('query');
        // $activoFilter = $request->input('activoFilter');
        // if ($consulta) {
        //     $contratosQuery->whereHas('serie', function ($query) use ($consulta) {
        //         $query->where('numero_serie', 'like', '%' . $consulta . '%');
        //     });
        // }
        // if ($activoFilter !== null && $activoFilter !== '2') {
        //     $contratosQuery->where('activo', $activoFilter);
        // }
        $contratos = $contratosQuery->paginate(10);

        return Inertia::render('Contratos/Listado', [
            'cliente' => $cliente,
            'contratos' => $contratos
        ]);
    }




    public function verFormContrato($id)
    {
        $cliente_actual = Cliente::findOrFail($id);

        //carga las direcciones, autorizados y telefonos relacionadas con el cliente actual
        $cliente_actual->load('direcciones.cliente')
            ->load('autorizados.cliente');

        $telefonos = Telefono::where('cliente_id', $cliente_actual->id)
            ->where('via_comunicacion', 'T')->get();
        $correos = Telefono::where('cliente_id', $cliente_actual->id)
            ->where('via_comunicacion', 'C')->get();
        //carga la relación maquina en la consulta
        $series = Serie::with(['maquina' => function ($query) {
            $query->orderBy('descripcion', 'asc');
        }])
            //filtra los resultados por el id de la tienda asociada al usuario autenticado
            ->where('tienda_id', Auth::user()->tienda_id)
            //filtra los resultados para mostrar solo las máquinas que están disponibles para alquilar
            ->where('disponible', true)
            ->get();
        $correo = Telefono::where('via_comunicacion', 'C')->first()->contacto;
        $subfamilias = Subfamilia::orderBy('id', 'asc')->get();
        $familias = Familia::orderBy('id', 'asc')->get();
        $maquinas = Maquina::orderBy('id', 'asc')->get();

        //renderiza la vista, pasando los datos
        return Inertia::render('Contratos/NuevoContrato', [
            'cliente' => $cliente_actual,
            'direcciones' => $cliente_actual->direcciones,
            'telefonos' => $telefonos,
            'correos' => $correos,
            'series' => $series,
            'autorizados' => $cliente_actual->autorizados,
            'familias' => $familias,
            'subfamilias' => $subfamilias,
            'maquinas' => $maquinas,
            'correo' => $correo
        ]);
    }


    public function verContrato($id)
    {
        $contrato = Contrato::findOrFail($id);

        $cliente = $contrato->cliente;
        //busca la dirección predeterminada d ela empresa para mostrarla en el contrato
        $direccion_predeterminada = Direccion::where('cliente_id', $cliente->id)
            ->where('predeterminada', true)->first();
        $correo = Telefono::where('via_comunicacion', 'C')->first()->contacto;
        $direccion = $contrato->direccion;
        $telefono = $contrato->telefono;
        $autorizado = $contrato->autorizado;
        $serie = $contrato->serie;
        $maquina = $serie->maquina;
        $subfamilia = $maquina->subfamilia;

        return Inertia::render('Contratos/VistaContrato', [
            'cliente' => $cliente,
            'direccion' => $direccion,
            'direccion_predeterminada' => $direccion_predeterminada,
            'telefono' => $telefono,
            'autorizado' => $autorizado,
            'contrato' => $contrato,
            'subfamilia' => $subfamilia,
            'maquina' => $maquina,
            'serie' => $serie,
            'correo' => $correo
        ]);
    }


    public function update($id)
    {
        $contrato = Contrato::findOrFail($id);

        $cliente = $contrato->cliente;
        $direccion_predeterminada = Direccion::where('cliente_id', $cliente->id)
            ->where('predeterminada', true)->first();
        $direccion = $contrato->direccion;
        $telefono = $contrato->telefono;
        $autorizado = $contrato->autorizado;
        $serie = $contrato->serie;
        $maquina = $serie->maquina;
        $subfamilia = $maquina->subfamilia;

        return Inertia::render('Contratos/VistaContrato', [
            'cliente' => $cliente,
            'direccion' => $direccion,
            'direccion_predeterminada' => $direccion_predeterminada,
            'telefono' => $telefono,
            'autorizado' => $autorizado,
            'contrato' => $contrato,
            'subfamilia' => $subfamilia,
            'maquina' => $maquina,
            'serie' => $serie
        ]);
    }

    public function finContrato($id)
    {
        $contrato = Contrato::findOrFail($id);
        //Obtener el cliente para comprobar el tipo y acceder a la configuración de cálculo de días
        $cliente = Cliente::findOrFail($contrato->cliente_id);
        $conf_cliente = $cliente->tipo->confDias;
        //obtener fecha actual
        $now = new \DateTime();

        $cliente = $contrato->cliente;
        //busca la dirección predeterminada d ela empresa para mostrarla en el contrato
        $direccion_predeterminada = Direccion::where('cliente_id', $cliente->id)
            ->where('predeterminada', true)->first();
        $direccion = $contrato->direccion;
        $telefono = $contrato->telefono;
        $autorizado = $contrato->autorizado;
        $serie = $contrato->serie;
        $maquina = $serie->maquina;
        $subfamilia = $maquina->subfamilia;
        $fechaCierre = $now->format('Y-m-d');
        $contrato->fecha_entrega = $fechaCierre;

        if ($contrato->fecha_retirada == $fechaCierre) {
            $total_dias_alquiler = 1;
        } else {
            $total_dias_alquiler = Contrato::calcularDiasDeAlquiler($contrato->fecha_retirada, $fechaCierre, $conf_cliente);
        }

        $contrato->dias = $total_dias_alquiler;
        // Calcular el importe total según los precio estipulado en la tabla subfamilia
        $importeFinal = $subfamilia->precio_dia * $total_dias_alquiler;
        $contrato->importe_total = $importeFinal;
        return Inertia::render('Contratos/VistaFin', [
            'cliente' => $cliente,
            'direccion' => $direccion,
            'direccion_predeterminada' => $direccion_predeterminada,
            'telefono' => $telefono,
            'autorizado' => $autorizado,
            'contrato' => $contrato,
            'subfamilia' => $subfamilia,
            'maquina' => $maquina,
            'serie' => $serie
        ]);
    }


    public function cerrarContrato(Request $request, $id)
    {
        $contrato = Contrato::findOrFail($id);
        //Desactiva el contrato
        $contrato->activo = false;
        //actualiza la fecha y el importe al día de cierre 
        $contrato->fecha_entrega = $request['fecha_entrega'];
        $contrato->importe_total = $request['importe_total'];
        $contrato->dias = $request['dias'];
        //permite introducir cambios en los campos de anotaciones
        $contrato->notas1 = $request['notas1'];
        $contrato->notas2 = $request['notas2'];
        //obtiene la serie del contrate y activa la disponobilidad
        $serie = Serie::findOrFail($contrato->serie->id);
        $serie->disponible = true;
        $contrato->save();
        $serie->save();

        $cliente = $contrato->cliente;
        //busca la dirección predeterminada d ela empresa para mostrarla en el contrato
        $direccion_predeterminada = Direccion::where('cliente_id', $cliente->id)
            ->where('predeterminada', true)->first();
        $direccion = $contrato->direccion;
        $telefono = $contrato->telefono;
        $autorizado = $contrato->autorizado;
        $serie = $contrato->serie;
        $maquina = $serie->maquina;
        $subfamilia = $maquina->subfamilia;

        Session::flash('success', 'Se ha cerrado el contrato correctamente');

        return Inertia::render('Contratos/VistaContrato', [
            'cliente' => $cliente,
            'direccion' => $direccion,
            'direccion_predeterminada' => $direccion_predeterminada,
            'telefono' => $telefono,
            'autorizado' => $autorizado,
            'contrato' => $contrato,
            'subfamilia' => $subfamilia,
            'maquina' => $maquina,
            'serie' => $serie
        ]);
    }
}
