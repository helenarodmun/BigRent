import { usePage } from "@inertiajs/react";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import FormActualizaCliente from "../../components/clientes/FormActualizaCliente";
import TablaEdicionDirecciones from "../../components/clientes/TablaEdicionDirecciones";
import TablaEdicionTelefonos from "../../components/clientes/TablaEdicionTelefonos";
import TablaEdicionAutorizados from "../../components/clientes/TablaEdicionAutorizados";
import NavBar from "../../components/partials/NavBar";
import Sidebar from "../../components/partials/Sidebar";

export default function ActualizaCliente() {
    const { flash } = usePage().props;
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <NavBar></NavBar>              
                <Container fluid className="update-container">
          <Row>
            <Col lg={6}>
              <div className="form-container">
                <FormActualizaCliente />
              </div>
            </Col>
            <Col lg={6}>
              <div className="tables-container">
                <div className="table-container">
                  <TablaEdicionDirecciones />
                </div>
                <div className="table-container">
                  <TablaEdicionTelefonos />
                </div>
                <div className="table-container">
                  <TablaEdicionAutorizados />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
            </div>
        </div>
    );
}
