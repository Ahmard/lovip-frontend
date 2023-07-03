import BaseModel from "~/models/base.model";

export class ListingItem extends BaseModel {
  id: string
  name: string
  thumbnail: string
  is_video: boolean
  is_subtitle: boolean
}
