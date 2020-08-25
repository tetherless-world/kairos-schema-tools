import {Page} from "./Page";
import {PrimitivesTable} from "./PrimitivesTable";

export class PrimitivesPage extends Page {
  get primitivesTable() {
    return new PrimitivesTable("[data-cy=primitives-table]");
  }

  readonly relativeUrl: string = "/primitive/";
}
