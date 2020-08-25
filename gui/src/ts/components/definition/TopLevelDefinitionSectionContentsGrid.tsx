import * as React from "react";
import {Grid, Typography} from "@material-ui/core";
import {TopLevelDefinitionSectionContents} from "components/definition/TopLevelDefinitionSectionContents";

export const TopLevelDefinitionSectionContentsGrid: React.FunctionComponent<{
  dataCyPrefix: string;
  sections: readonly TopLevelDefinitionSectionContents[];
}> = ({dataCyPrefix, sections}) => {
  return (
    <Grid container direction="column" spacing={8}>
      {sections.map((section) => (
        <Grid data-cy={`${dataCyPrefix}-${section.id}`} key={section.id} item>
          <Grid container direction="column" id={section.id} spacing={4}>
            <Grid item>
              <Typography variant="h4">{section.title}</Typography>
            </Grid>
            <Grid>{section.children}</Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};
