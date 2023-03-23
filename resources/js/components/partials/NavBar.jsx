import React from "react";
import { usePage } from "@inertiajs/react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "@inertiajs/react";

function NavBar() {
    // Se obtiene la autenticación del usuario de las props de la página
    const { auth } = usePage().props;
console.log(auth.user.name)
    return (
        <Navbar  bg="light" expand="lg" className="p-3 accesibilidad-texto">
            <Navbar.Brand className='ms-5 h1' href="/clientes">BigRent</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNavDropdown" />
            <Navbar.Collapse id="navbarNavDropdown">
                <Nav className="ms-auto">
                    <Nav.Item>
                        <Nav.Link href="/clientes" className="mx-2 active bi bi-house">
                            Inicio
                        </Nav.Link>
                    </Nav.Item>
                    {/* Si el usuario no ha iniciado sesión, se muestra el botón de inicio de sesión y el de registro */}
                    {auth.user == null ? (
                        <>
                            <Nav.Item>
                                <Nav.Link
                                    href="/login"
                                    className="mx-2 bi bi-door-open"
                                >
                                    Inicio de sesión
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    href="/register"
                                    className="mx-2 bi bi-check-circle"
                                >
                                    Registrarme
                                </Nav.Link>
                            </Nav.Item>
                        </>
                    ) : null}
                     {/* Si el usuario ha iniciado sesión, se muestra el menú desplegable con opciones */}
                    {auth.user != null && (
                        <NavDropdown
                            title={auth.user.username}
                            id="navbarDropdownMenuLink"
                            className="mx-2 me-5"
                            align="end"
                        >
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <Link
                                    href="/logout"
                                    as='button'
                                    method="post"
                                    className="border-0 bi bi-door-closed"
                                >
                                    Cerrar sesión
                                </Link>
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