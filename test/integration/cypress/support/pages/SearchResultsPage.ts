import {Page} from "./Page";
import * as qs from "qs";

class SearchResultsTableRow {
  constructor(private readonly selector: string) {}

  get() {
    return cy.get(this.selector);
  }

  get labelLink() {
    return cy.get(`${this.selector} [data-cy=label-link]`);
  }

  get type() {
    return cy.get(`${this.selector} [data-cy=type]`);
  }
}

class SearchResultsTable {
  constructor(private readonly selector: string) {}

  row(id: string) {
    return new SearchResultsTableRow(this.selector + ` [data-cy="row-${id}"]`);
  }
}

export class SearchResultsPage extends Page {
  constructor(readonly query: string) {
    super();
  }

  readonly table = new SearchResultsTable("[data-cy=search-results]");

  readonly relativeUrl = "/search?" + qs.stringify({query: this.query});
}
