import "./not-found.css";

import Img from '../../assets/img/Teste_Logo2.png'

export const NotFound = () => {
  return (
    <div className="not-found">
      <img src={Img} alt="imgLogo" className="imgLogo" />
      <div className="text">
        <p>Amigos Sustentáveis</p>
        <p>Página não encontrada :(</p>
      </div>
    </div>
  );
};
