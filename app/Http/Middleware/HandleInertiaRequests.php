<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request): array
    {        
        // comprueba si $authUser es null antes de acceder a su propiedad "tienda".
        // Si $authUser es null, entonces $tienda se establece como null. De esta manera, evito el error de intentar leer una propiedad en null
        $authUser = $request->user();
        $tienda = $authUser ? $authUser->tienda : null;
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
                'tienda' => $tienda,
                ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'creacion' => fn () => $request->session()->get('creacion'),
                'errorCreacion' => fn () => $request->session()->get('errorCreacion'),
                'edicion' => fn () => $request->session()->get('edicion'),
                'errorEdicion' => fn () => $request->session()->get('errorEdicion'),
                'borrar' => fn () => $request->session()->get('borrar'),
                'errorBorrado' => fn () => $request->session()->get('errorBorrado')
            ],
        ]);
    }
}
