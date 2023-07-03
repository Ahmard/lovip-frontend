import {LooseObject} from "~/types/loose.object";

export default class BaseModel implements LooseObject {
  [key: string]: any;

  public created_at: string
  public updated_at: string


  update(data: LooseObject) {
    for (const dataKey in data) {
      this[dataKey] = data[dataKey]
    }

    return this
  }

  static fromData<T>(this: new () => T, data: any): T {
    // @ts-ignore
    return Object.assign(new this(), data);
  }
}

export class StaticObjectCreator {
  static fromData<T>(this: new () => T, data: any): T {
    // @ts-ignore
    return Object.assign(new this(), data);
  }
}
