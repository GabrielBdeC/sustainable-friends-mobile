import { LoggedDto } from "../models/logged.dto";
import { LoginDto } from "../models/login.dto";

export class ItemService {
  private url = "http://localhost:4200/api/v1/auth/login"

  public async login(loginDto: LoginDto): Promise<LoggedDto> {
    return fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(loginDto)
    }
      ).then((resp: Response): Promise<LoggedDto> => {
      return resp.json();
    });
  }
}