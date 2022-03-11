import { ChangeEvent } from "react";
import Img from './Teste_Logo2.png'
import "./login.css";

import { Link } from "react-router-dom";

import Button from "../../shared/components/button/button";
// take Alert out of here later
import AddItems from "../../shared/components/addItems/addItems";
import Alert from "../../shared/components/alert/alert";
///////////////////////////////////////////////////////////////
import EntryPage from "../../shared/components/entry-page/entry-page";
import EntryCard from "../../shared/components/entry-card/entry-card";
import PageHeader from "../../shared/components/page-header/page-header";
import InputGroup from "../../shared/components/input-group/input-group";
import Input from "../../shared/components/input/input";
import EmailValidator from "../../shared/validators/email.validator";

import { CgCloseO } from "react-icons/cg";

const error = {
  email: {
    hasError: false,
    msg: "E-mail inválido",
  },
};

const emailInputValidator = (event: ChangeEvent<HTMLInputElement>) => {
  if (!EmailValidator.isValid(event?.target?.nodeValue!)) {
    alert("oi");
  }
  alert("noi");
};

export function Login() {
  return (
    <EntryPage>
      <PageHeader to="/">Logo</PageHeader>
      <EntryCard>
        <img src={Img} className="imgLogo" />
        <h2>Log in</h2>
        <form onSubmit={(e) => e.preventDefault}>
          <InputGroup>
            <label htmlFor="login-email">Endereço de Email</label>
            <Input
              type="text"
              placeholder="Email"
              id="login-email"
              onChange={emailInputValidator}
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="login-password">Insira a senha</label>
            <Input
              type="password"
              placeholder="Senha"
              id="login-password"
            />
            {error.email.hasError && <label>{error.email.msg}</label>}
          </InputGroup>
          <Button type="submit" buttonSize="btn--little">Entrar</Button>
          {/* // take Alert out of here later */}
           {/* <Alert alertStyle="alert--error-solid" alertSize="alert--size">
            <Button type="submit" buttonSize="btn--circle"><CgCloseO /></Button>
            <p className="text">Notificação</p>
            <Button type="submit" buttonSize="btn--little">teste</Button>
            <Button type="submit" buttonSize="btn--little">teste</Button>
            <Button type="submit" buttonSize="btn--little">teste</Button>
          </Alert>     */}
          {/* <AddItems addSize="add--itens--size" addStyle="alert--primary--solid" userId=" " latitude={0} longitude={0} itens={[]}>
            <Button type="submit" buttonSize="btn--circle"><CgCloseO /></Button>
            <p className="text">Selecione os Materiais:</p>
            <Button type="submit" buttonSize="btn--medium">Material 1</Button>
            <Button type="submit" buttonSize="btn--medium">Material 2</Button>
            <Button type="submit" buttonSize="btn--medium">Material 3</Button>
            <Button type="submit" buttonSize="btn--medium">Material 4</Button>
            <Button type="submit" buttonSize="btn--medium">Material 5</Button>
            <Button type="submit" buttonSize="btn--medium">Material 6</Button>
            <Button type="submit" buttonSize="btn--medium">Material 7</Button>
            <Button type="submit" buttonSize="btn--medium">Material 8</Button>
            <Button type="submit" buttonSize="btn--little"><p className="p">Pronto</p></Button>
          </AddItems>   */}
        </form>
        <span>
          Don't have an account?
          <Link to="/signup">Sign up</Link>
        </span>
      </EntryCard>
    </EntryPage>
  );
}
