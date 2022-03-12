import { ItemDto } from "../../shared/models/item.dto";
import { ItemService } from "../../shared/services/item.service";

import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import Img from '../../assets/img/Teste_Logo2.png'
import Button from "../../shared/components/button/button";

import "./home.css";
import { Login } from "../../pages/login/login";
import { Signup } from "../../pages/signup/signup";


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
          <Button type="submit" buttonSize="btn--little">
            <Link className="link" to={"/login"}>Entrar</Link>
          </Button>
          <Button type="submit" buttonSize="btn--little">
            <Link className="link" to={"/signup"}>Cadastrar-se</Link>
          </Button>
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/login" element={<Signup />} />
        </Routes>
      </div >

  );
};
