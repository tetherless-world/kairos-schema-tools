import {TopLevelDefinitionSection} from "models/definition/TopLevelDefinitionSection";

export interface TopLevelDefinitionSectionContents
  extends TopLevelDefinitionSection {
  children: React.ReactNode;
}
