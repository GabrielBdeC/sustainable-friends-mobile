import { LoginDto } from "../models/login.dto";
import { SessionDto } from "../models/session.dto";
import { SignupDto } from "../models/signup.dto";

export class AuthService {
  private url = "http://localhost:4200/api/v1/auth";

  public async login(loginDto: LoginDto): Promise<SessionDto> {
    return fetch(`$this.url/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginDto),
    })
      .then((req: Response) => {
        return req.json();
      })
      .then((resp: SessionDto) => {
        if (resp.access_token) {
          localStorage.setItem("user", JSON.stringify(resp.access_token));
        }
        return resp;
      });
  }

  public async signup(signupDto: SignupDto): Promise<SessionDto> {
    return fetch(`$this.url/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupDto),
    })
      .then((req: Response) => {
        return req.json();
      })
      .then((resp: SessionDto) => {
        if (resp.access_token) {
          localStorage.setItem("user", JSON.stringify(resp.access_token));
        }
        return resp;
      });
  }

  public logout() {
    localStorage.removeItem("user");
  };

  public getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }
}
