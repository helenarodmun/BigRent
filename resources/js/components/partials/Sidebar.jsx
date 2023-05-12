import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
export default function (){
    const [expanded, setExpanded] = useState(false);
    
    const items = [
      {
        label: "Contratos",
        link: "#",
        icon: "bi bi-card-checklist m-2",
        subItems: [
            {
                label: "Nuevo",
                link: "/clientes",
            },
            {
              label: "Listado",
              link: "/listarContratos",
          },
        ],
    },
        {
            label: "Clientes",
            link: "#",
            icon: "bi bi-people m-2",
            subItems: [
                {
                    label: "Listado",
                    link: "/clientes",
                },
                {
                    label: "Nuevo",
                    link: "/nuevoCliente",
                },
            ],
        },
        {
            label: "Maquinaria",
            link: "#",
            icon: "bi bi-tools m-2",
            subItems: [
                {
                    label: "Familias",
                    link: "/familias",
                },
                {
                    label: "Subfamilias",
                    link: "/subfamilias",
                },
                {
                    label: "Marcas",
                    link: "/marcas",
                },
                {
                    label: "Máquinas",
                    link: "/maquinas",
                },
                {
                    label: "Series",
                    link: "/series",
                },
            ],
        },
       
    ];
    const handleToggle = () => {
        setExpanded(!expanded);
      };      
    return (
        <Navbar expand="lg" expanded={expanded} className="flex-column sidebar" variant="dark">
        <Navbar.Toggle aria-controls="sidebar-nav" onClick={handleToggle} className="mx-2"/>
        <Navbar.Collapse id="sidebar-nav">
          <Nav className="flex-column">
            {items.map((item) => (
              <Nav.Item key={item.label}>
                {item.subItems ? (
                  <NavDropdown
                    title={
                      <>
                        <i className={item.icon} /> {item.label}
                      </>
                    }
                    id={`item-${item.label}`}
                  >
                    {item.subItems.map((subItem) => (
                           <NavDropdown.Item key={subItem.label} as={Link} href={subItem.link}>
                           {subItem.label}
                         </NavDropdown.Item>
                       ))}
                     </NavDropdown>
                   ) : (
                     <Nav.Link as={Link} href={item.link}>
                       <i className={item.icon} /> {item.label}
                     </Nav.Link>
                   )}
                 </Nav.Item>
               ))}
             </Nav>
           </Navbar.Collapse>
         </Navbar>
       );
     };     
