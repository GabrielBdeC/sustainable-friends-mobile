import React from "react";

import { Link } from 'react-router-dom';
import EntryPage from "../../shared/components/entry-page/entry-page";
import EntryCard from "../../shared/components/entry-card/entry-card";
import PageHeader from "../../shared/components/page-header/page-header";
import InputGroup from "../../shared/components/input-group/input-group";
import Input from "../../shared/components/input/input";
import Button from "../../shared/components/button/button";

import Img from '../../assets/img/Teste_Logo2.png'

import "./signup.css";

export function Signup() {
  return (
    <EntryPage>
      <PageHeader to="/"> Logo</PageHeader>
      <EntryCard>
        <img src={Img} className="imgLogo"/>
        <h2>Cadastre-se</h2>
        <form onSubmit={(e) => e.preventDefault}>
          <InputGroup>
            <label htmlFor="signup-name">Nome Completo</label> 
            <Input type="text" placeholder="Seu nome" id="signup-name" />
          </InputGroup>
          <InputGroup>
            <label htmlFor="signup-email" className="label-text">Endereço de Email</label> 
            <Input type="text" placeholder="name@mail.com" id="signup-email" />
          </InputGroup>
          <InputGroup>
            <label htmlFor="signup-password">Senha</label> 
            <Input type="password" placeholder="Sua senha" id="signup-password" />
          </InputGroup>
          <Button type="submit" buttonSize="btn--little">Criar</Button>
        </form>
        <span>
          Já possui uma conta?
          <Link to="/login">Entrar</Link>
        </span>
      </EntryCard>
    </EntryPage>
  );
}