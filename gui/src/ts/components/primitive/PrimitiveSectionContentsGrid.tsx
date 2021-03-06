import {PrimitivePageQuery_primitiveById} from "api/queries/types/PrimitivePageQuery";
import * as React from "react";
import {PrimitiveDetailsTable} from "components/primitive/PrimitiveDetailsTable";
import {Grid} from "@material-ui/core";
import {PrimitiveHrefs} from "Hrefs";
import {primitiveSections} from "models/primitive/primitiveSections";
import {TopLevelDefinitionSectionContentsGrid} from "components/definition/TopLevelDefinitionSectionContentsGrid";
import {TopLevelDefinitionSectionContents} from "components/definition/TopLevelDefinitionSectionContents";
import {PrimitiveSlotCard} from "components/primitive/PrimitiveSlotCard";
import {NamespacePrefixFragment} from "api/queries/types/NamespacePrefixFragment";

export const PrimitiveSectionContentsGrid: React.FunctionComponent<{
  hrefs: PrimitiveHrefs;
  namespacePrefixes: readonly NamespacePrefixFragment[] | null;
  primitive: PrimitivePageQuery_primitiveById & {id: string};
}> = ({hrefs, namespacePrefixes, primitive}) => {
  const primitiveSectionContents: TopLevelDefinitionSectionContents[] = [];
  for (const primitiveSection of primitiveSections) {
    let children: React.ReactNode;
    switch (primitiveSection.id) {
      case "details": {
        children = (
          <PrimitiveDetailsTable
            namespacePrefixes={namespacePrefixes}
            primitive={primitive}
          />
        );
        break;
      }
      case "slots": {
        children = (
          <Grid container direction="column" spacing={4}>
            {primitive.slots.map((slot) => (
              <Grid item id={hrefs.slotId(slot)} key={slot.id}>
                <PrimitiveSlotCard
                  namespacePrefixes={namespacePrefixes}
                  slot={slot}
                />
              </Grid>
            ))}
          </Grid>
        );
        break;
      }
      default:
        throw new EvalError(primitiveSection.id);
    }
    primitiveSectionContents.push({...primitiveSection, children});
  }

  return (
    <TopLevelDefinitionSectionContentsGrid
      dataCyPrefix="primitive"
      sections={primitiveSectionContents}
    />
  );
};
