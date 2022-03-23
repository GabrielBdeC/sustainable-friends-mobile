import { SessionDto } from "../models/session.dto";
import { SignupDto } from "../models/signup.dto";

export class SignUpService {
  private url = "http://localhost:4200/api/v1/auth/signup"

  public async signup(signupDto: SignupDto): Promise<SessionDto> {
    return fetch(this.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signupDto)
    }
      ).then((resp: Response): Promise<SessionDto> => {
      return resp.json();
    });
  }
}
