import { ItemDto } from "./item.dto";
import { UserDto } from "./user.dto";

export interface PointItemDto {
  identifier: string;
  item: ItemDto;
  collectedBy?: UserDto;
}
