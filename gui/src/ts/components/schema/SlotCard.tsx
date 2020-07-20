import {SchemaPageQuery_schemaById_slots} from "api/queries/types/SchemaPageQuery";
import {Card, CardContent, CardHeader} from "@material-ui/core";
import * as React from "react";
import {SlotDetailsTable} from "components/schema/SlotDetailsTable";

export const SlotCard: React.FunctionComponent<{
  slot: SchemaPageQuery_schemaById_slots;
}> = ({slot}) => (
  <Card>
    <CardHeader title={slot.id} />
    <CardContent>
      <SlotDetailsTable slot={slot} />
    </CardContent>
  </Card>
);
