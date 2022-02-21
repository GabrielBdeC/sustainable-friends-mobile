import { ChangeEvent } from "react";
import "./login.css";

import { Link } from "react-router-dom";

import Button from "../../shared/components/button/button";
import EntryPage from "../../shared/components/entry-page/entry-page";
import EntryCard from "../../shared/components/entry-card/entry-card";
import PageHeader from "../../shared/components/page-header/page-header";
import InputGroup from "../../shared/components/input-group/input-group";
import Input from "../../shared/components/input/input";
import EmailValidator from "../../shared/validators/email.validator";

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
        <h2>Log in</h2>
        <form onSubmit={(e) => e.preventDefault}>
          <InputGroup>
            <label htmlFor="login-email">Email Adress</label>
            <Input
              type="text"
              placeholder="name@mail.com"
              id="login-email"
              onChange={emailInputValidator}
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="login-password">Password</label>
            <Input
              type="password"
              placeholder="Your password"
              id="login-password"
            />
            {error.email.hasError && <label>{error.email.msg}</label>}
          </InputGroup>
          <Button type="submit">Log in</Button>
        </form>
        <span>
          Don't have an account?
          <Link to="/signup">Sign up</Link>
        </span>
      </EntryCard>
    </EntryPage>
  );
}
