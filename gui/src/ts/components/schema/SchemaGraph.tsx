import * as React from "react";
import {useHistory} from "react-router-dom";

import {Graph, GraphConfiguration, GraphLink, GraphNode} from "react-d3-graph";
import {AutoSizer} from "react-virtualized";
import {SchemaPageQuery_schemaById} from "api/queries/types/SchemaPageQuery";
import {SchemaHrefs} from "Hrefs";

// graph event callbacks
// const onClickGraph = function () {
//   window.alert(`Clicked the graph background`);
// };
//
// const onClickNode = function (nodeId: any) {
//   window.alert(`Clicked node ${nodeId}`);
// };
//
// const onDoubleClickNode = function (nodeId: any) {
//   window.alert(`Double clicked node ${nodeId}`);
// };
//
// const onRightClickNode = function (event: any, nodeId: any) {
//   window.alert(`Right clicked node ${nodeId}`);
// };
//
// const onMouseOverNode = function (nodeId: any) {
//   window.alert(`Mouse over node ${nodeId}`);
// };
//
// const onMouseOutNode = function (nodeId: any) {
//   window.alert(`Mouse out node ${nodeId}`);
// };
//
// const onClickLink = function (source: any, target: any) {
//   window.alert(`Clicked link between ${source} and ${target}`);
// };
//
// const onRightClickLink = function (event: any, source: any, target: any) {
//   window.alert(`Right clicked link between ${source} and ${target}`);
// };
//
// const onMouseOverLink = function (source: any, target: any) {
//   window.alert(`Mouse over in link between ${source} and ${target}`);
// };
//
// const onMouseOutLink = function (source: any, target: any) {
//   window.alert(`Mouse out link between ${source} and ${target}`);
// };
//
// const onNodePositionChange = function (nodeId: any, x: any, y: any) {
//   window.alert(
//     `Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}`
//   );
// };

interface SchemaNode extends GraphNode {
  readonly href: string;
  readonly label: string;
  readonly __typename: "Schema" | "Slot" | "Step" | "StepParticipant";
}

interface SchemaLink extends GraphLink {}

export const SchemaGraph: React.FunctionComponent<{
  hrefs: SchemaHrefs;
  schema: SchemaPageQuery_schemaById & {id: string};
}> = ({hrefs, schema}) => {
  const history = useHistory();

  const nodes: SchemaNode[] = [];
  const links: SchemaLink[] = [];

  nodes.push({
    color: "red",
    href: hrefs.home,
    id: schema.id,
    label: `Schema: ${schema.name}`,
    __typename: "Schema",
  });

  schema.slots.forEach((slot) => {
    nodes.push({
      color: "blue",
      href: hrefs.slot({id: slot.id}),
      id: slot.id,
      label: `Slot: ${slot.roleName}`,
      __typename: "Slot",
    });
    links.push({source: schema.id, target: slot.id});
  });
  schema.steps.forEach((step) => {
    nodes.push({
      color: "darkgreen",
      href: hrefs.step({id: step.id}),
      id: step.id,
      label: `Step: ${step.name}`,
      __typename: "Step",
    });
    links.push({source: schema.id, target: step.id});

    // step.participants?.forEach((participant) => {
    //   nodes.push({
    //     color: "lightgreen",
    //     id: participant.id,
    //     label: `Step participant: ${participant.name}`,
    //     __typename: "StepParticipant",
    //   });
    //   links.push({source: step.id, target: participant.id});
    // });
  });

  const onClickNode = (nodeId: string) => {
    const node = nodes.find((node) => node.id === nodeId);
    if (!node) {
      return;
    }
    history.push(node.href);
  };

  return (
    <AutoSizer
    // onResize={({height, width}) =>
    //   console.log(`Resize: height=${height}, width=${width}`)
    // }
    >
      {({height, width}) => {
        if (height === 0 || width === 0) {
          return null;
        }

        const config: Partial<GraphConfiguration<SchemaNode, SchemaLink>> = {
          height,
          node: {
            labelProperty: "label",
            size: 800,
          },
          width,
        };

        return (
          <Graph
            id="schema-graph" // id is mandatory, if no id is defined rd3g will throw an error
            data={{nodes, links}}
            config={config}
            onClickNode={onClickNode}
            // onDoubleClickNode={onDoubleClickNode}
            // onRightClickNode={onRightClickNode}
            // onClickGraph={onClickGraph}
            // onClickLink={onClickLink}
            // onRightClickLink={onRightClickLink}
            // onMouseOverNode={onMouseOverNode}
            // onMouseOutNode={onMouseOutNode}
            // onMouseOverLink={onMouseOverLink}
            // onMouseOutLink={onMouseOutLink}
            // onNodePositionChange={onNodePositionChange}
          />
        );
      }}
    </AutoSizer>
  );
};
