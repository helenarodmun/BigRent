<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>BIGRENT</title>
     <!-- Favicon-->
     <link rel="icon" type="image/x-icon" href="{{ asset('assets/movifpsostenible_v2.ico') }}" />
     <!-- Bootstrap icons-->
     <link
        rel="stylesheet"
         href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
        crossorigin="anonymous"
    />
     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
     <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
     <!-- Google fonts-->
     <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic" rel="stylesheet"
         type="text/css" />
    
     {{-- DayJS --}}
     <script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
     <script src="https://unpkg.com/dayjs@1.9.4/locale/es.js"></script>
     <!-- My styles -->
     <style>
         .card {
             margin-top: 1.5rem;
         }
     </style>
    {{-- @routes --}}
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
    </head>
    <body>
    @inertia
    </body>
    </html>