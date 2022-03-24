import { Link, useNavigate } from "react-router-dom";

import { ItemDto } from "../../shared/models/item.dto";
import { ItemService } from "../../shared/services/item.service";
import Img from '../../assets/img/Teste_Logo2.png'
import Button from "../../shared/components/button/button";

import "./home.css";
import { PointService } from "../../shared/services/point.service";
import { PointDto } from "../../shared/models/point.dto";
import { PagedPointDto } from "../../shared/models/paged.dto";
import { AuthService } from "../../shared/services/auth.service";

/* const itemService = new ItemService();
itemService.getAll().then((item: ItemDto) => {
  console.log(item);
});

const pointService = new PointService();
pointService.getAllByLatLong(-28.930480, -49.472340, {
  "pageSize": 25,
  "pageIndex": 1
}).then((pagePoint: PagedPointDto) => {
  console.log(pagePoint);
}); */

/* pointService.createPoint({
  latitude: "-28.930580",
  longitude: "-49.479340",
  items: [1, 4, 6]
}).then((point: PointDto) => {
  console.log(point);
}); */

// @ts-ignore
/* pointService.removePoint({
  identifier: "3357986579324A19B02825E73F913108"
}).then((resp)=>{
  console.log(resp);
}) */



export const Home = () => {

  const navigate = useNavigate();

  const onInit = async () => {
    const authService = new AuthService();
    if (authService.getCurrentUser()) {
      if (await authService.protected()){
        navigate("/map");
      }
    };
  }
  
  onInit();
  
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
