import { LoginDto } from "../models/login.dto";
import { SessionDto } from "../models/session.dto";
import { SignupDto } from "../models/signup.dto";

export class AuthService {
  private url = "http://localhost:4200/api/v1/auth";

  public async login(loginDto: LoginDto): Promise<SessionDto> {
    return fetch(`${this.url}/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginDto),
    })
      .then((req: Response) => {
        if (req.status != 201) {
          throw req;
        }
        return req.json();
      }).catch(error => {
        throw error;
      })
      .then((resp: SessionDto) => {
        if (resp.access_token) {
          localStorage.setItem("user", JSON.stringify(resp.access_token));
        }
        return resp;
      }).catch(error => {
        throw error;
      });
  }

  public async signup(signupDto: SignupDto): Promise<SessionDto> {
    return fetch(`${this.url}/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupDto),
    })
      .then((req: Response) => {
        if (req.status != 201) {
          throw req;
        }
        return req.json();
      }).catch(error => {
        throw error;
      })
      .then((resp: SessionDto) => {
        if (resp.access_token) {
          localStorage.setItem("user", JSON.stringify(resp.access_token));
        }
        return resp;
      }).catch(error => {
        throw error;
      });
  }

  public static logout() {
    localStorage.removeItem("user");
  }

  public static getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  public async protected(): Promise<boolean> {
    const token = AuthService.getCurrentUser();

    return fetch(`${this.url}/user/protected/`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` },
    })
      .then((req: Response) => {
        if (req.status != 201) {
          throw req;
        }
        return req.text();
      }).catch(error => {
        throw error;
      })
      .then((resp: string) => {
        return resp === "This is the protected route. You can only access it with the JWT token.";
      }).catch(error => {
        throw error;
      });;
  }
}
