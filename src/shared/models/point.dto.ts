import { PointItemDto } from "./point-item.dto";
import { UserDto } from "./user.dto";

export interface PointDto {
  identifier: string;
  distance?: number;
  latitude: number;
  longitude: number;
  description?: string;
  pointItems: PointItemDto[];
  createdBy: UserDto;
}

export interface CreatePointDto {
  latitude: string;
  longitude: string;
  description?: string;
  items: number[];
}