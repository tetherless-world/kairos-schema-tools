import {Schema} from "./Schema";
import {Primitive} from "./Primitive";

export interface SdfDocument {
  id: string;
  name: string;
  primitives: Primitive[];
  schemas: Schema[];
  sourceJson: string;
}
