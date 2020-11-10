import {SchemaPageQuery_schemaById} from "api/queries/types/SchemaPageQuery";
import * as React from "react";
import {SchemaHrefs} from "Hrefs";
import {Graph, GraphConfiguration, GraphLink, GraphNode} from "react-d3-graph";
import {AutoSizer} from "react-virtualized";
import {useHistory} from "react-router-dom";
import {useTheme} from "@material-ui/core/styles";
import {Alert} from "@material-ui/lab";

interface OrdersGraphNode extends GraphNode {
  label: string;
}

interface OrdersGraphLink extends GraphLink {
  label: string;
}

export const OrdersGraph: React.FunctionComponent<{
  hrefs: SchemaHrefs;
  schema: SchemaPageQuery_schemaById;
}> = ({hrefs, schema}) => {
  const history = useHistory();
  const theme = useTheme();

  const nodes: OrdersGraphNode[] = [];
  const links: OrdersGraphLink[] = [];

  for (let orderI = 0; orderI < schema.order.length; orderI++) {
    const order = schema.order[orderI];
    switch (order.__typename) {
      case "BeforeAfterOrder": {
        // if (
        //   !order.flags ||
        //   !order.flags.some((flag) => flag === OrderFlag.Precondition)
        // ) {
        //   continue;
        // }

        for (const stepId of order.before.concat(order.after)) {
          const step = schema.steps.list.find((step) => step.id === stepId);
          if (!step) {
            throw new EvalError(`order step ${stepId} not found in schema`);
          }
          const node: OrdersGraphNode = {
            color: theme.palette.primary.main,
            id: step.id,
            label: step.label,
          };
          if (!nodes.some((existingNode) => existingNode.id === node.id)) {
            nodes.push(node);
          }
        }

        for (const beforeStepId of order.before) {
          for (const afterStepId of order.after) {
            links.push({
              label: orderI.toString(),
              source: beforeStepId,
              target: afterStepId,
            });
          }
        }

        break;
      }
      default:
        continue;
    }
  }

  const onClickNode = (nodeId: string) => {
    const node = nodes.find((node) => node.id === nodeId);
    if (!node) {
      return;
    }
    history.push(hrefs.step({id: nodeId}));
  };

  if (nodes.length === 0 || links.length === 0) {
    return <Alert severity="error">No before-after orders.</Alert>;
  }

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

        const config: Partial<GraphConfiguration<
          OrdersGraphNode,
          OrdersGraphLink
        >> = {
          directed: true,
          height,
          link: {
            // labelProperty: "label",
            // renderLabel: true,
          },
          node: {
            labelProperty: "label",
            size: 600,
          },
          width,
        };

        return (
          <Graph
            id="schema-graph" // id is mandatory, if no id is defined rd3g will throw an error
            data={{nodes, links}}
            config={config}
            onClickNode={onClickNode}
          />
        );
      }}
    </AutoSizer>
  );

  return <div></div>;
};
