import {Page} from "./Page";
import * as qs from "qs";

export class SearchResultsPage extends Page {
  constructor(readonly query: string) {
    super();
  }

  readonly relativeUrl = "/search?" + qs.stringify({query: this.query});
}
