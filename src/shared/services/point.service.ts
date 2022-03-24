import { PagedPointDto } from "../models/paged.dto";
import { CreatePointDto, PointDto } from "../models/point.dto";
import { AuthService } from "./auth.service";

export class PointService {
  private url = "http://localhost:4200/api/v1/point";
  private authService: AuthService
  private token: string;

  constructor(){
    this.authService = new AuthService();
    this.token = this.authService.getCurrentUser();
  }

  public async getAllByLatLong(lat: number, lng: number, pagedPoint: PagedPointDto): Promise<PagedPointDto> {
    return fetch(`${this.url}/getByLatLong?lat=${lat}&long=${lng}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`
      },
      body: JSON.stringify(pagedPoint),
    }).then((resp: Response): Promise<PagedPointDto> => {
      return resp.json();
    });
  }

  public async createPoint(point: CreatePointDto): Promise<PointDto> {
    return fetch(`${this.url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`
      },
      body: JSON.stringify(point),
    }).then((resp: Response): Promise<PointDto> => {
      return resp.json();
    });
  }

  public async removePoint(point: PointDto) {
    return fetch(`${this.url}/${point.identifier}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`
      },
      body: JSON.stringify(point),
    }).then((resp: Response): void => {
      return;
    });
  }

}
