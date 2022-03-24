import { ChangeEvent, MouseEvent, MouseEventHandler } from "react";
import Img from '../../assets/img/Teste_Logo2.png'
import "./login.css";

import { Link } from "react-router-dom";

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../../shared/components/button/button";

import AddItems from "../../shared/components/addItems/addItems";
import Alert from "../../shared/components/alert/alert";

import EntryPage from "../../shared/components/entry-page/entry-page";
import EntryCard from "../../shared/components/entry-card/entry-card";
import PageHeader from "../../shared/components/page-header/page-header";
import InputGroup from "../../shared/components/input-group/input-group";
import { useNavigate } from "react-router-dom";

import { CgCloseO } from "react-icons/cg";
import { ItemService } from "../../shared/services/item.service";
import { SessionDto } from "../../shared/models/session.dto";
import { AuthService } from "../../shared/services/auth.service";

interface CreateUserFormData {
  email: string;
  password: string;
}

const createUserFormSchema = yup.object().shape({
  email: yup.string().email('Insira um email válido').required("Email incorreto"),
  password: yup.string().required("Senha incorreta"),
}).required()

const authService: AuthService = new AuthService();

export function Login() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema),
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values: CreateUserFormData) => {
    authService.login({
      email: values.email,
      password: values.password,
    }).then((resp: SessionDto) => {
      navigate("/map");
    }, (error) =>{
      // Colocar alert aqui!
    });
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    let listaMarcados = document.getElementsByTagName("input");
    for (let loop = 0; loop < listaMarcados.length; loop++) {
      let item = listaMarcados[loop];
      if (item.type == "checkbox" && item.checked) {
        alert(item.id);
      }
    };
  }

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
    <EntryPage>
      <PageHeader to="/">Logo</PageHeader>
      <EntryCard>
        <img src={Img} className="imgLogo" />
        <h2>Log in</h2>
        <form onSubmit={handleSubmit(handleCreateUser)}>
          <InputGroup>
            <label htmlFor="login-email">Endereço de Email</label>
            <input
              className="inputs-login"
              type="text"
              placeholder="Email"
              id="login-email"
              {...register("email")}
            />
            <span className="span-error">{errors.email?.message}</span>
          </InputGroup>
          <InputGroup>
            <label htmlFor="login-password">Insira a senha</label>
            <input
              className="inputs-login"
              type="password"
              placeholder="Senha"
              id="login-password"
              {...register("password")}
            />
            <span className="span-error">{errors.password?.message}</span>
          </InputGroup>
          <Button type="submit" buttonSize="btn--little">Entrar</Button>
          {/* // take Alert out of here later */}
          {/* <Alert alertStyle="alert--error-solid" alertSize="alert--size">
            <Button type="submit" buttonSize="btn--circle"><CgCloseO /></Button>
            <p className="text">Notificação</p>
            <Button type="submit" buttonSize="btn--little">teste</Button>
            <Button type="submit" buttonSize="btn--little">teste</Button>
            <Button type="submit" buttonSize="btn--little">teste</Button>
          </Alert>        */}
          {/* <AddItems addSize="add--itens--size" addStyle="alert--primary--solid" userId=" " latitude={0} longitude={0} itens={[]}>
              <Button type="submit" buttonSize="btn--circle"><CgCloseO /></Button>
              <p className="text">Selecione os Materiais:</p>
              <div className="materiais" id="materiais">
                <input id="cb-1" type="checkbox" className="checkbox" value="Material 1"/> 
                <label htmlFor="cb-1">Material 1</label> 
                <input id="cb-2" type="checkbox" className="checkbox" value="Material 2" />
                <label htmlFor="cb-2">Material 2</label>
                <input id="cb-3" type="checkbox" className="checkbox" value="Material 3" />
                <label htmlFor="cb-3">Material 3</label>
                <input id="cb-4" type="checkbox" className="checkbox" value="Material 4" />
                <label htmlFor="cb-4">Material 4</label>
              </div>
              <Button type="submit" buttonSize="btn--little" onClick={handleClick}><p className="p">Pronto</p></Button>
          </AddItems> */}
        </form>
        <span>
          Não tem uma conta?
          <Link to="/signup">Cadastre-se</Link>
        </span>
      </EntryCard>
    </EntryPage>
  );
}

