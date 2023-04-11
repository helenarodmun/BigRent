import { Link } from "@inertiajs/react";
import React, { useState } from "react";

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const sidebarItems = [
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
                    label: "Máquinas",
                    link: "/maquinas",
                },
                {
                    label: "Series",
                    link: "/series",
                },
            ],
        },
        {
            label: "Contratos",
            link: "#",
            icon: "bi bi-card-checklist m-2",
            subItems: null,
        },
    ];

    return (
        <div className="sidebar-wrapper">
            <div className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
                <ul>
                    {sidebarItems.map((item, index) => (
                        <li key={index}>
                            <Link href={item.link}>
                                <i className={item.icon}></i>
                                {item.label}
                                {item.subItems && <i className=""></i>}
                            </Link>
                            {item.subItems && (
                                <ul className="sub-menu">
                                    {item.subItems.map((subItem, subIndex) => (
                                        <li key={subIndex}>
                                            <Link href={subItem.link}>
                                                {subItem.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
