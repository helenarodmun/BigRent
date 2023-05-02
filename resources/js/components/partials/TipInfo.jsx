import React, { useState } from "react";
import "../../../css/tooltip.css";

const TipInfo = (props) => {
  let timeout;
  const [active, setActive] = useState(false);
  // Función para mostrar el tooltip
  const showTip = () => {
    timeout = setTimeout(() => {// Definir un timeout para mostrar el tooltip
      setActive(true);
    }, props.delay || 400);// El timeout se define con el valor proporcionado en 'props.delay', o en su defecto, con un valor de 400
  };
  // Función para ocultar el tooltip
  const hideTip = () => {
    clearInterval(timeout);// Limpiar el timeout
    setActive(false);
  };

  return (
    <div
      className="Tooltip-Wrapper"
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {props.children} {/* Renderizar el contenido que se va a envolver con el tooltip */}
      {active && ( // Si el estado 'active' es verdadero, mostrar el tooltip
        <div className={`Tooltip-Tip ${props.direction || "top"}`}> {/* Clase CSS para el tooltip y dirección en la que se va a mostrar */}
          {props.content} {/* Renderizar el contenido del tooltip */}
        </div>
      )}
    </div>
  );
};

export default TipInfo;