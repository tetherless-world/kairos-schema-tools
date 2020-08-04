import {Schema} from "./Schema";

export interface SdfDocument {
  id: string;
  name: string;
  schemas: Schema[];
  sourceJson: string;
}
