export interface SignupDto {
  email: string;
  name: string;
  password: string;
  cpf: string;
  preferences: {
    items: string[]
  }
};