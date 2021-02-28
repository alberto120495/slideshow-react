import React, { useEffect, useRef, useCallback } from "react";

import { ReactComponent as FlechaIzquierda } from "../img/iconmonstr-angel-left-thin.svg";
import { ReactComponent as FlechaDerecha } from "../img/iconmonstr-angel-right-thin.svg";
import styled from "styled-components";

function SlideShow({
  children,
  controles = false,
  autoplay = false,
  velocidad = "500",
  intervalo = "5000",
}) {
  const slideshow = useRef(null);
  const intervaloSlideshow = useRef(null);

  const siguiente = useCallback(() => {
    if (slideshow.current.children.length > 0) {
      console.log("siguiente");
      const primerElemento = slideshow.current.children[0];
      //Transicion de slideshow
      slideshow.current.style.transition = `${velocidad}ms ease-out all`;

      //Calcular tamaño del slide
      const slideSize = slideshow.current.children[0].offsetWidth;

      //Mover slideshow
      slideshow.current.style.transform = `translate(-${slideSize}px)`;

      const transicion = () => {
        //Regresar a posicion 0 sin transicion
        slideshow.current.style.transition = "none";
        slideshow.current.style.transform = `translate(0)`;

        //Mover primer elemento y mandarlo al final
        slideshow.current.appendChild(primerElemento);

        slideshow.current.removeEventListener("transitionend", transicion);
      };

      //Event listener para cuando termina la animacion
      slideshow.current.addEventListener("transitionend", transicion);
    }
  }, [velocidad]);

  const anterior = () => {
    if (slideshow.current.children.length > 0) {
      //Obtener ultimo elemento
      const index = slideshow.current.children.length - 1;
      const ultimoElemento = slideshow.current.children[index];

      slideshow.current.insertBefore(
        ultimoElemento,
        slideshow.current.firstChild
      );
      slideshow.current.style.transition = "none";
      const slideSize = slideshow.current.children[0].offsetWidth;
      slideshow.current.style.transform = `translateX(-${slideSize}px)`;

      setTimeout(() => {
        slideshow.current.style.transition = `${velocidad}ms ease-out all`;
        slideshow.current.style.transform = `translateX(0)`;
      }, 30);
    }
  };

  useEffect(() => {
    if (autoplay) {
      intervaloSlideshow.current = setInterval(() => {
        siguiente();
      }, intervalo);

      //Eliminar intervalo
      slideshow.current.addEventListener("mouseenter", () => {
        clearInterval(intervaloSlideshow.current);
      });

      //Volver a iniciar el intervalo
      slideshow.current.addEventListener("mouseleave", () => {
        intervaloSlideshow.current = setInterval(() => {
          siguiente();
        }, intervalo);
      });
    }
  }, [autoplay, intervalo, siguiente]);

  return (
    <ContendorPrincipal>
      <ContenedorSlideshow ref={slideshow}>{children}</ContenedorSlideshow>

      {controles && (
        <Controles>
          <Boton onClick={anterior}>
            <FlechaIzquierda />
          </Boton>

          <Boton derecho onClick={siguiente}>
            <FlechaDerecha />
          </Boton>
        </Controles>
      )}
    </ContendorPrincipal>
  );
}

const ContendorPrincipal = styled.div`
  position: relative;
`;

const ContenedorSlideshow = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const Slide = styled.div`
  min-width: 100%;
  overflow: hidden;
  transition: 0.3s ease all;
  z-index: 9;
  max-height: 500px;
  position: relative;

  img {
    width: 100%;
    vertical-align: top;
  }
`;

const TextoSlide = styled.div`
  background-color: ${(props) =>
    props.colorFondo ? props.colorFondo : "rgba(0, 0, 0, 0.3)"};
  color: ${(props) => (props.colorTexto ? props.colorTexto : "#fff")};
  width: 100%;
  padding: 10px 60px;
  text-align: center;
  position: absolute;
  bottom: 0;

  @media screen and (max-width: 700px) {
    position: relative;
    background-color: #000;
  }
`;

const Controles = styled.div`
  position: absolute;
  top: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;
const Boton = styled.button`
  pointer-events: all;
  background: none;
  cursor: pointer;
  border: none;
  outline: none;
  width: 50px;
  height: 100%;
  text-align: center;
  position: absolute;
  transition: 0.3s ease all;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
    path {
      fill: #fff;
    }
  }

  path {
    filter: ${(props) =>
      props.derecho
        ? "drop-shadow(-2px 0px 0px #fff)"
        : "drop-shadow(2px 0px 0px #fff)"};
  }

  ${(props) => (props.derecho ? "right: 0" : "left:0")}
`;

export { SlideShow, Slide, TextoSlide };
