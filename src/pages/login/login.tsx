import { ChangeEvent } from "react";
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

import { CgCloseO } from "react-icons/cg";

interface CreateUserFormData {
  email: string;
  password: string;
}

const createUserFormSchema = yup.object().shape({
  email: yup.string().email('Insira um email válido').required("Email incorreto"),
  password: yup.string().required("Senha incorreta"),
}).required()

export function Login() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema),
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    console.log(values);
    alert("cadastro realizado com sucesso!");
  };

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
              {... register("email")}
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
              {... register("password")} 
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
            <Button type="submit" buttonSize="btn--medium">Material</Button>
            <Button type="submit" buttonSize="btn--medium">Material</Button>
            <Button type="submit" buttonSize="btn--medium">Material</Button>
            <Button type="submit" buttonSize="btn--medium">Material</Button>
            <Button type="submit" buttonSize="btn--medium">Material</Button>
            <Button type="submit" buttonSize="btn--medium">Material</Button>
            <Button type="submit" buttonSize="btn--medium">Material</Button>
            <Button type="submit" buttonSize="btn--medium">Material</Button>
            <Button type="submit" buttonSize="btn--little"><p className="p">Pronto</p></Button>
          </AddItems>      */}
        </form>
        <span>
          Não tem uma conta?
          <Link to="/signup">Cadastre-se</Link>
        </span>
      </EntryCard>
    </EntryPage>
  );
}
