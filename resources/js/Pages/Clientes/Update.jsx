
import React from "react";
import { Container} from "react-bootstrap";
import FormActualizaCliente from "../../components/FormActualizaCliente";
import TablaDirecciones from "../../components/TablaDirecciones";
import TablaTelefonos from "../../components/TablaTelefonos";

export default function Update() {


    return (
        <>
            <Container className="align-items-center justify-content-center accesibilidad-texto">
              <FormActualizaCliente/>
              <TablaDirecciones/>
              <TablaTelefonos/>
            </Container>
        </>
    );
}
