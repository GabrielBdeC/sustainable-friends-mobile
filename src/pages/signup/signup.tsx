// Validation
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from "react-hook-form";
//*******//


import { Link } from 'react-router-dom';
import EntryPage from "../../shared/components/entry-page/entry-page";
import EntryCard from "../../shared/components/entry-card/entry-card";
import PageHeader from "../../shared/components/page-header/page-header";
import InputGroup from "../../shared/components/input-group/input-group";
import Button from "../../shared/components/button/button";

import Img from '../../assets/img/Teste_Logo2.png'

import "./signup.css";

interface CreateUserFormData {
  name: string;
  email: string;
  password: string;
  cpf: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email('Insira um email válido').required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
  cpf: yup.string().required("CPF é obrigatório"),
}).required()


export function Signup() {

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
      <PageHeader to="/"> Logo</PageHeader>
      <EntryCard>
        <img src={Img} className="imgLogo-signup" />

        <h2>Cadastre-se</h2>

        <form onSubmit={handleSubmit(handleCreateUser)} >

          <InputGroup>
            <label htmlFor="signup-name">Nome Completo</label>
            <input
              className="inputs-signup"
              type="text"
              placeholder="Seu nome"
              id="signup-name"
              {...register("name")}
            />
            <span className="span-error">{errors.name?.message}</span>
          </InputGroup>

          <InputGroup>
            <label htmlFor="signup-email" className="label-text">Endereço de Email</label>
            <input
              className="inputs-signup"
              type="email"
              placeholder="name@mail.com"
              id="signup-email"
              {...register("email")} />
            <span className="span-error">{errors.email?.message}</span>
          </InputGroup>

          <InputGroup>
            <label htmlFor="signup-password">Senha</label>
            <input
              className="inputs-signup"
              type="password"
              placeholder="Sua senha"
              id="signup-password"
              {...register("password")} />
            <span className="span-error">{errors.password?.message}</span>
          </InputGroup>

          <InputGroup>
            <label htmlFor="signup-cpf">CPF</label>
            <input
              className="inputs-signup"
              type="text"
              placeholder="000.000.000-00"
              id="signup-cpf"
              {...register("cpf")} />
            <span className="span-error">{errors.cpf?.message}</span>
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