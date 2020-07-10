import {SdfDocument} from "./models/SdfDocument";
import {Schema} from "./models/Schema";

export class TestData {
  static readonly schema: Schema = {
    id: "https://caci.com/kairos/Schemas/CoordinatedBombingAttack",
    name: "Coordinated Bombing Attack",
  };

  static readonly sdfDocument: SdfDocument = {
    id: "sha1:61b869c787d305e0dc30fb4999f1d54d247ca099",
    schemas: [TestData.schema],
  };
}
