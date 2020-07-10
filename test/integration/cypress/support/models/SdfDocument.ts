import {Schema} from "./Schema";

export interface SdfDocument {
  id: string;
  schemas: Schema[];
}
