# BigRent

Este proyecto es un sistema de gestión de alquiler de maquinaria.

## Descripción

El proyecto BigRent es una aplicación web para la gestión de alquiler de maquinaria. Está diseñada para ser integrada en la intranet de la empresa, permitiendo un control eficiente de los servicios de alquiler.

La aplicación ofrece funcionalidades como inicio de sesión, gestión de clientes y maquinaria, generación de contratos en formato PDF, control de stock y administración de usuarios. Su objetivo es mejorar la eficiencia en la gestión de alquiler de maquinaria y proporcionar una herramienta integral para el control y seguimiento de los servicios.

## Requisitos Previos

Antes de utilizar este proyecto, asegúrate de cumplir con los siguientes requisitos:

* Sistema de Gestión de Base de Datos (SGBD): Este proyecto utiliza MySQL como el SGBD principal. Asegúrate de tener instalado y configurado MySQL Server (versión 5.7 o superior). Puedes encontrar más información sobre MySQL en la documentación oficial.

* Herramienta de Gestión de Base de Datos: Se utiliza Workbench como una herramienta visual para el modelado y gestión de bases de datos relacionales. Te recomendamos tener Workbench instalado para facilitar el diseño y la estructuración de las tablas y relaciones de la base de datos. Puedes obtener más información sobre Workbench en la documentación oficial.

* ORM (Object-Relational Mapping): En este proyecto se utiliza Eloquent, un ORM que simplifica la interacción con la base de datos utilizando modelos y relaciones. Asegúrate de familiarizarte con Eloquent, ya que se utiliza para realizar consultas y manipulaciones de datos. Puedes encontrar más información sobre Eloquent en la documentación de Laravel.

* Laravel Framework: El backend de la aplicación se desarrolló utilizando Laravel, un framework PHP conocido por su elegancia y facilidad de uso en el desarrollo web. Asegúrate de tener instalado Laravel Framework (versión 8.0 o superior) para ejecutar el proyecto correctamente. Puedes obtener más información sobre Laravel en la documentación oficial.

* Herramientas de Desarrollo: Se utilizan diversas herramientas de desarrollo que facilitan el proceso de construcción y mantenimiento de la aplicación. Asegúrate de tener instaladas las siguientes herramientas:

* Artisan: Es el sistema de línea de comandos integrado en Laravel. Se utiliza para realizar tareas comunes de desarrollo, como generar código, ejecutar migraciones de base de datos y limpiar cachés. Puedes obtener más información sobre Artisan en la documentación de Laravel.

* Composer y NPM: Se utilizan para gestionar las dependencias del proyecto. Composer se encarga de administrar las dependencias de PHP, mientras que NPM se utiliza para las dependencias de JavaScript. Asegúrate de tener Composer y NPM instalados para gestionar eficientemente las bibliotecas y componentes externos utilizados en el proyecto. Puedes obtener más información sobre Composer en su documentación oficial y sobre NPM en su documentación oficial.


## Dependencias

El proyecto hace uso de varias dependencias para brindar funcionalidades adicionales y facilitar el desarrollo. A continuación, se enumeran las principales dependencias utilizadas:

* @inertiajs/react: Proporciona integración entre Laravel e Inertia.js, permitiendo el desarrollo de vistas en React.

* dayjs: Biblioteca para manipulación y formateo de fechas y horas.

* react-bootstrap: Framework de interfaz de usuario basado en Bootstrap para React.

* react-icons: Librería que ofrece una amplia gama de iconos para su uso en aplicaciones React.

* barryvdh/laravel-dompdf: Biblioteca que permite generar archivos PDF a partir de vistas HTML en Laravel.

* inertiajs/inertia-laravel: Biblioteca que integra Inertia con Laravel, facilitando la comunicación entre el backend de Laravel y el frontend de React.

* laravel/framework: El propio framework de Laravel, que proporciona una amplia gama de características y funcionalidades para el desarrollo de aplicaciones web.

* picqer/php-barcode-generator: Biblioteca de generación de códigos de barras en PHP. Permite generar códigos de barras en diferentes formatos, como Code 128, Code 39, EAN-13, entre otros.

Estas son solo algunas de las dependencias mencionadas en el archivo composer.json. Cada una de ellas cumple una función específica en el proyecto y contribuye al funcionamiento y desarrollo de la aplicación.


# Instalación
Sigue los siguientes pasos para instalar y configurar el proyecto:

+ Clona el repositorio en tu máquina local utilizando el siguiente comando:

`git clone <URL_del_repositorio>`

+ Accede al directorio del proyecto:

`cd <nombre_del_directorio>`

+ Instala las dependencias del proyecto ejecutando el siguiente comando:

`npm install`
Esto instalará las dependencias necesarias para el frontend de la aplicación.

#3 Configuración del entorno:

+ Crea un archivo de configuración de entorno .env basado en el archivo de ejemplo .env.example.
Actualiza las variables de entorno según tu configuración local, como la conexión a la base de datos, las credenciales de autenticación, etc.
Genera la clave de la aplicación ejecutando el siguiente comando:

`php artisan key:generate`

+ Ejecuta las migraciones de la base de datos y los seeders (datos de prueba) con el siguiente comando:

`php artisan migrate --seed`
Esto creará las tablas necesarias en la base de datos y llenará los datos de prueba.

+ Inicia el servidor de desarrollo ejecutando el siguiente comando:

`npm run dev`

+ Accede a la aplicación en tu navegador web utilizando la URL:

<span style="font-family: Arial;">(http://localhost:8000)</span>
Ahora deberías poder ver y utilizar la aplicación.

Ten en cuenta que estos pasos son generales y pueden variar según las especificidades de tu proyecto. Asegúrate de consultar la documentación o los archivos de configuración proporcionados en el repositorio para obtener instrucciones más detalladas si es necesario.

Si encuentras algún problema durante la instalación, asegúrate de verificar que hayas seguido todos los pasos correctamente y que tu entorno cumpla con los requisitos del proyecto.

¡Y eso es todo! Ahora deberías tener el proyecto instalado y listo para su uso.

# 3 Instalación de Laravel

Si deseas instalar Laravel como parte de tu proyecto, aquí tienes algunos pasos adicionales que puedes seguir:

### Opción 1: Laravel Sail
Laravel Sail es una opción recomendada por el equipo de desarrollo de Laravel. Proporciona un entorno de desarrollo basado en contenedores Docker. Si has decidido utilizar Sail, sigue estos pasos:

+ Asegúrate de tener Docker instalado en tu máquina. Puedes descargar e instalar Docker desde su sitio web oficial: <span style="font-family: Arial;">(https://www.docker.com/)</span>

+ Crea un nuevo proyecto de Laravel utilizando el comando sail:

`curl -s "https://laravel.build/nombre_proyecto" | bash`
Esto creará un nuevo proyecto de Laravel con Sail.

+ Ve al directorio del proyecto:

`cd nombre_proyecto`

+ Inicia los contenedores de Docker con Sail:

`./vendor/bin/sail up`
Esto iniciará los contenedores Docker necesarios para ejecutar Laravel.

+ Accede a la página por defecto de Laravel en tu navegador web:

<span style="font-family: Arial;">(http://localhost)</span>

Deberías poder ver la página por defecto de Laravel.

Recuerda que la instalación y configuración de Sail puede llevar tiempo la primera vez, ya que se descargan y configuran los contenedores Docker. Sin embargo, una vez configurado, el entorno de desarrollo con Sail será fácil de usar.

### Opción 2: Laragon
Laragon es otra opción para configurar el entorno de desarrollo de Laravel, especialmente para usuarios de Windows. Si has decidido utilizar Laragon, sigue estos pasos:

+ Asegúrate de tener Laragon instalado en tu máquina. Puedes descargar Laragon desde su sitio web oficial: <span style="font-family: Arial;">(https://laragon.org/)</span>

+ Abre Laragon y crea un nuevo proyecto de Laravel utilizando el comando laravel new:

`laravel new nombre_proyecto`
Esto creará un nuevo proyecto de Laravel en la carpeta especificada.

+ Reinicia los servicios de Laragon para que reconozca el nuevo proyecto.

+ Accede a la página por defecto de Laravel en tu navegador web utilizando el host virtual creado por Laragon:

<span style="font-family: Arial;">(http://nombre_proyecto.test)</span>

Deberías poder ver la página por defecto de Laravel.

Recuerda que Laragon ofrece un entorno de desarrollo local completo y simplificado para Laravel en Windows.

Ten en cuenta que estas instrucciones son generales y pueden variar según tu sistema operativo y configuración. Asegúrate de consultar la documentación oficial de Laravel Sail o Laragon.

# Uso
A continuación, se presentan los casos de uso más importantes considerados para el desarrollo de la aplicación, divididos en los diagramas de casos de uso del usuario estándar y del usuario administrador:

## Diagrama de casos de uso del usuario estándar:
* Iniciar sesión: El usuario estándar puede iniciar sesión en la aplicación utilizando sus credenciales.
* Consultar clientes: Permite al usuario estándar acceder a la lista de clientes registrados y ver sus detalles.
* Gestionar clientes: El usuario estándar puede crear, modificar y eliminar clientes.
* Consultar maquinaria: Permite al usuario estándar acceder a la lista de maquinaria disponible y ver sus detalles.
* Generar contrato: Permite al usuario estándar generar un contrato en formato PDF a partir de la contratación de un servicio.
* Consultar stock: El usuario estándar puede verificar el stock de maquinaria disponible.
* Cerrar sesión: Permite al usuario estándar cerrar sesión en la aplicación.
## Diagrama de casos de uso del usuario administrador:
* Iniciar sesión: El usuario administrador puede iniciar sesión en la aplicación utilizando sus credenciales.
* Registrar usuarios: Permite al usuario administrador crear nuevos usuarios para acceder a la aplicación.
* Modificar usuarios: El usuario administrador puede modificar los datos de los usuarios existentes.
* Eliminar usuarios: Permite al usuario administrador eliminar usuarios del sistema.
* Consultar clientes: Permite al usuario administrador acceder a la lista de clientes registrados y ver sus detalles.
* Gestionar clientes: El usuario administrador puede crear, modificar y eliminar clientes.
* Consultar maquinaria: Permite al usuario administrador acceder a la lista de maquinaria disponible y ver sus detalles.
* Gestionar maquinaria: El usuario administrador puede añadir, modificar y eliminar maquinaria.
* Generar contrato: Permite al usuario administrador generar un contrato en formato PDF a partir de la contratación de un servicio.
* Estos son los principales casos de uso que se han considerado en la aplicación, y proporcionan una visión general de las funcionalidades disponibles para cada tipo de usuario.

Recuerda que esta lista de casos de uso es solo una muestra, y puede variar según los requerimientos y la lógica específica de tu aplicación.

# Contribución
¡Gracias por tu interés en contribuir a este proyecto! Se agradecen todas las contribuciones que puedas hacer para mejorarlo. A continuación, se detallan las pautas para la contribución:

## Informe de problemas
Si encuentras algún problema o error en el proyecto, por favor, abre un nuevo problema en la sección de "Issues" en este repositorio. Asegúrate de proporcionar detalles claros y concisos sobre el problema encontrado, incluyendo pasos reproducibles, mensajes de error y cualquier información relevante que facilite su resolución.

## Solicitud de características
Si tienes alguna idea para mejorar el proyecto o deseas solicitar una nueva característica, por favor, abre un nuevo problema en la sección de "Issues". Describe en detalle la función que te gustaría ver implementada y proporciona cualquier contexto adicional que pueda ser útil para su desarrollo.

## Envío de aportes
Si deseas enviar una contribución al código fuente, te invito a seguir los siguientes pasos:

+ Haz un "fork" de este repositorio y clónalo en tu máquina local.
+ Crea una rama nueva para trabajar en tu mejora o solución: git checkout -b nombre-de-la-rama.
+ Realiza los cambios necesarios y asegúrate de que el código sigue las guías de estilo y buenas prácticas.
+ Realiza las pruebas necesarias para asegurarte de que tus cambios funcionan correctamente.
+ Confirma tus cambios y realiza un "push" a tu repositorio: git push origin nombre-de-la-rama.
+ Abre una solicitud de extracción ("pull request") en este repositorio, describiendo los cambios realizados y proporcionando cualquier información adicional relevante.
+ Se revisarán todas las solicitudes de extracción y se responderá lo antes posible. Agradezco tu paciencia durante el proceso de revisión.

## Nota importante
Al realizar contribuciones, por favor, asegúrate de seguir un código de conducta y buenas prácticas.

# Licencia
Este trabajo se encuentra bajo la licencia Creative Commons Reconocimiento-NoComercial 4.0 Internacional License. Para ver una copia de esta licencia, visita <span style="font-family: Arial;">(http://creativecommons.org/licenses/by-nc/4.0/)</span>.

Esta licencia permite a otros copiar, redistribuir, adaptar y construir sobre tu trabajo, siempre y cuando se reconozca tu autoría y no se utilice con fines comerciales.