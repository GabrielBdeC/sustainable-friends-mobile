import { ItemDto } from "../models/item.dto";

export class ItemService {
  private url = "http://localhost:4200/api/v1/item"

  public async getAll(): Promise<ItemDto[]> {
    return fetch(this.url).then((resp: Response): Promise<ItemDto[]> => {
      return resp.json();
    });
  }
}