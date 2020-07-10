import {SdfDocument} from "./models/SdfDocument";
import {Schema} from "./models/Schema";

export class TestData {
  static readonly schema: Schema = {
    id: "https://caci.com/kairos/Schemas/CoordinatedBombingAttack",
    name: "Coordinated Bombing Attack",
  };

  static readonly sdfDocument: SdfDocument = {
    id:
      "file:/Users/minor/projects/kairos-schema-tools/target/scala-2.12/classes/data/examples/coordinated-bombing-attack-ta1.json",
    schemas: [TestData.schema],
  };
}
