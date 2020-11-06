import {SchemaSection} from "models/schema/SchemaSection";

export const schemaSections: readonly SchemaSection[] = [
  {id: "details", title: "Details"},
  {id: "entities", title: "Entities"},
  {id: "entity-relations", title: "Entity relations"},
  {id: "provenance-data", title: "Provenance data"},
  {id: "slots", title: "Slots"},
  {id: "steps", title: "Steps"},
  {id: "step-order", title: "Step order"},
];
