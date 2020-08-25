import {SchemaSectionId} from "models/schema/SchemaSectionId";
import {TopLevelDefinitionSection} from "models/definition/TopLevelDefinitionSection";

export interface SchemaSection extends TopLevelDefinitionSection {
  id: SchemaSectionId;
  title: string;
}
