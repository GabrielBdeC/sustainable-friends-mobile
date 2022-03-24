import { Link } from "react-router-dom";

import { ItemDto } from "../../shared/models/item.dto";
import { ItemService } from "../../shared/services/item.service";
import Img from '../../assets/img/Teste_Logo2.png'
import Button from "../../shared/components/button/button";

import "./home.css";


const itemService = new ItemService();
itemService.getAll().then((item: ItemDto) => {
  console.log(item);
});

export const Home = () => {
  return (
    <div className="home-page">
      <img src={Img} alt="imgLogo" className="imgLogo" />
      <div className="text">
        <p>Amigos Sustentáveis</p>
        <p>Seja Bem Vindo(a)!</p>
      </div>
      <div className="buttons">
        <Link className="link" to={"/login"}>
          <Button type="submit" buttonSize="btn--little">
            Entrar
          </Button>
        </Link>
        <Link className="link" to={"/signup"}>
          <Button type="submit" buttonSize="btn--little">
            Cadastrar-se
          </Button>
        </Link>
      </div>
    </div >

  );
};
