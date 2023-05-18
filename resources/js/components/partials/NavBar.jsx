import React from "react";
import { usePage } from "@inertiajs/react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "@inertiajs/react";
import TituloPortada from '../../../img/titulo_bigrent.png'

function NavBar() {
    // Se obtiene la autenticación del usuario de las props de la página
    const { auth } = usePage().props;
    return (
        <Navbar bg="light" expand="lg" className="accesibilidad-texto">
            <Navbar.Brand className="h1" href="/clientes">
                <img className='' src={TituloPortada} alt="Titulo BigRent" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNavDropdown" />
            <Navbar.Collapse id="navbarNavDropdown">
                <Nav className="ms-auto">
                {/* {auth.user?.rol == 1 && ( 
                        <>
                            <Nav.Item>
                                <Nav.Link
                                    href="/registro"
                                    className="mx-2 me-5 bi bi-check-circle"
                                >
                                    Registro Usuarios
                                </Nav.Link>
                            </Nav.Item>
                        </>
                    )} */}
                    {/* Si el usuario no ha iniciado sesión, se muestra el botón de inicio de sesión y el de registro */}
                    {auth.user == null ? (
                        <>
                            <Nav.Item>
                                <Nav.Link href="/login" className="mx-2 h5 bi bi-door-open">
                                    <strong className="h4">Inicio de sesión</strong>
                                </Nav.Link>
                            </Nav.Item>
                        </>
                    ) : null}
                    {/* Si el usuario ha iniciado sesión, se muestra el menú desplegable con opciones */}
                    {auth.user != null && (
                        <NavDropdown title={<strong>{`${auth.user.username} - ${auth.user.tienda.nombre}`}</strong>} id="navbarDropdownMenuLink" className=" me-5 h5" align="end">
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <Link href="/logout" as="button" method="post" className=" h5 border-0 bi bi-door-closed">Cerrar sesión</Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
export default NavBar;
if (document.getElementById("nav")) {
    const Index = ReactDOM.createRoot(document.getElementById("nav"));

    Index.render(
        <React.StrictMode>
            <NavBar />
        </React.StrictMode>
    );
}
