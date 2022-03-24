import { PointDto } from './point.dto';

export interface PagedPointDto {
  totalPoints?: number;
  pageSize: number;
  pageIndex: number;
  points?: PointDto[];
}
