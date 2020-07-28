import * as React from "react";

import {Graph} from "react-d3-graph";
import {AutoSizer} from "react-virtualized";

// graph payload (with minimalist structure)
const data = {
  nodes: [{id: "Harry"}, {id: "Sally"}, {id: "Alice"}],
  links: [
    {source: "Harry", target: "Sally"},
    {source: "Harry", target: "Alice"},
  ],
};

// graph event callbacks
const onClickGraph = function () {
  window.alert(`Clicked the graph background`);
};

const onClickNode = function (nodeId: any) {
  window.alert(`Clicked node ${nodeId}`);
};

const onDoubleClickNode = function (nodeId: any) {
  window.alert(`Double clicked node ${nodeId}`);
};

const onRightClickNode = function (event: any, nodeId: any) {
  window.alert(`Right clicked node ${nodeId}`);
};

const onMouseOverNode = function (nodeId: any) {
  window.alert(`Mouse over node ${nodeId}`);
};

const onMouseOutNode = function (nodeId: any) {
  window.alert(`Mouse out node ${nodeId}`);
};

const onClickLink = function (source: any, target: any) {
  window.alert(`Clicked link between ${source} and ${target}`);
};

const onRightClickLink = function (event: any, source: any, target: any) {
  window.alert(`Right clicked link between ${source} and ${target}`);
};

const onMouseOverLink = function (source: any, target: any) {
  window.alert(`Mouse over in link between ${source} and ${target}`);
};

const onMouseOutLink = function (source: any, target: any) {
  window.alert(`Mouse out link between ${source} and ${target}`);
};

const onNodePositionChange = function (nodeId: any, x: any, y: any) {
  window.alert(
    `Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}`
  );
};

export const SchemaGraph: React.FunctionComponent = () => (
  <AutoSizer
  // onResize={({height, width}) =>
  //   console.log(`Resize: height=${height}, width=${width}`)
  // }
  >
    {({height, width}) => {
      if (height <= 0 || width <= 0) {
        return null;
      }

      const config = {
        height,
        link: {
          highlightColor: "lightblue",
        },
        nodeHighlightBehavior: true,
        node: {
          color: "lightgreen",
          size: 800,
          highlightStrokeColor: "blue",
        },
        width,
      };

      return (
        <Graph
          id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
          data={data}
          config={config}
          onClickNode={onClickNode}
          onDoubleClickNode={onDoubleClickNode}
          onRightClickNode={onRightClickNode}
          onClickGraph={onClickGraph}
          onClickLink={onClickLink}
          onRightClickLink={onRightClickLink}
          onMouseOverNode={onMouseOverNode}
          onMouseOutNode={onMouseOutNode}
          onMouseOverLink={onMouseOverLink}
          onMouseOutLink={onMouseOutLink}
          onNodePositionChange={onNodePositionChange}
        />
      );
    }}
  </AutoSizer>
);
