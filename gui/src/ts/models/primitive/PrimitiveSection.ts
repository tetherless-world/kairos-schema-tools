import {PrimitiveSectionId} from "models/primitive/PrimitiveSectionId";
import {TopLevelDefinitionSection} from "models/definition/TopLevelDefinitionSection";

export interface PrimitiveSection extends TopLevelDefinitionSection {
  id: PrimitiveSectionId;
  title: string;
}
