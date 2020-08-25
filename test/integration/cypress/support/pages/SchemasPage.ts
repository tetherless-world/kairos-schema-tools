import {Page} from "./Page";
import {SchemasTable} from "./SchemasTable";

export class SchemasPage extends Page {
  get schemasTable() {
    return new SchemasTable("[data-cy=schemas-table]");
  }

  readonly relativeUrl: string = "/schema/";
}
