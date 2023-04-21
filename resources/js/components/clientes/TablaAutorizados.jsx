import { usePage, useForm } from "@inertiajs/react";
import { Container, Row, Col, Button, Card, Modal, Table } from "react-bootstrap";
import React, { useState } from "react";


export default function TablaAutorizados() {
    const { clientes, autorizados } = usePage().props;
    console.log(clientes)
      //estado  y una función para actualizarlo llamada que controla la visualización de modal de confirmación.
      const { data, delete: destroy } = useForm({
        nombre_persona_autorizada: autorizados.nombre_persona_autorizada,
        dni: autorizados.dni,
        notas: autorizados.notas,
        url_dni: autorizados.url_dni
      });
      const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
      //función es llamada cuando se hace clic en el botón de eliminar, la cual establece el valor de showConfirmDeleteModal en true.
          const handleDeleteClick = () => {
              setShowConfirmDeleteModal(true);
          };
          // Esta función es llamada cuando se confirma la eliminación. Hace una petición al servidor para eliminar el registro y cierra el Modal de confirmación.
          const handleDelete = (id) => {
              destroy(
                  `/eliminarAutorizado/${id}`,
                  {
                      onSuccess: () => {
                          console.log("registro eliminado");
                      },
                  },
                  id
              );
              setShowConfirmDeleteModal(false);
          };
    return (
        <>       
        <Col className="shadow">  
        <h1 className="m-3">Autorizados</h1> 
                 {autorizados.length === 0 ? (
                    <div className="d-flex justify-content-center align-items-center">
                        <p className="me-4">No existen personas autorizadas asociadas a este cliente </p><br/>
                    
                    </div>
                ) : (
                         <Col className="pt-3 shadow p-3 ">
                              
                         <Table
                             striped
                             bordered
                             hover
                             className="shadow"
                             size="sm"
                             responsive
                         >
                            <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>DNI</th>
                                <th>Observaciones</th>
                                <th>Dni:</th>
                            </tr>
                        </thead>
                        {autorizados.map((autorizado) => (
                            <tbody  key={autorizado.id}>
                                <tr>
                                    <td>{autorizado.nombre_persona_autorizada}</td>
                                    <td>{autorizado.dni}</td>
                                    <td>{autorizado.notas}</td>
                                    <td>{autorizado.url_dni}</td>
                                    </tr>
                            </tbody>
                        ))}
                    </Table>
                </Col>
                )}
        </Col>
        </>
    );
}