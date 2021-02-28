import "./App.css";
import { SlideShow, Slide, TextoSlide } from "./components/SlideShow";
import styled from "styled-components";
import img1 from "./img/1.jpg";
import img2 from "./img/2.jpg";
import img3 from "./img/3.jpg";
import img4 from "./img/4.jpg";
function App() {
  return (
    <div className="App">
      <main>
        <Titulo>productos destacados</Titulo>
        <SlideShow autoplay={true} velocidad="3000" intervalo="5000">
          <Slide>
            <a href="https://github.com/">
              <img src={img1} alt="Una" />
            </a>
            <TextoSlide colorFondo="navy" colorTexto="">
              <p>15% descuento en productos Apple</p>
            </TextoSlide>
          </Slide>
          <Slide>
            <a href="https://github.com/">
              <img src={img2} alt="Una" />
            </a>
            <TextoSlide>
              <p>15% descuento en productos Apple</p>
            </TextoSlide>
          </Slide>
          <Slide>
            <a href="https://github.com/">
              <img src={img3} alt="Una" />
            </a>
            <TextoSlide>
              <p>15% descuento en productos Apple</p>
            </TextoSlide>
          </Slide>
          <Slide>
            <a href="https://github.com/">
              <img src={img4} alt="Una" />
            </a>
            <TextoSlide>
              <p>15% descuento en productos Apple</p>
            </TextoSlide>
          </Slide>
        </SlideShow>
        <Titulo>productos Nuevos</Titulo>
        <SlideShow controles={true}>
          <Slide>
            <a href="https://github.com/">
              <img src={img2} alt="Una" />
            </a>
            <TextoSlide>
              <p>15% descuento en productos Apple</p>
            </TextoSlide>
          </Slide>
          <Slide>
            <a href="https://github.com/">
              <img src={img3} alt="Una" />
            </a>
            <TextoSlide>
              <p>15% descuento en productos Apple</p>
            </TextoSlide>
          </Slide>
        </SlideShow>
      </main>
    </div>
  );
}

const Titulo = styled.p`
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

export default App;
