import * as React from "react";

import {Graph} from "react-d3-graph";

// graph payload (with minimalist structure)
const data = {
  nodes: [{id: "Harry"}, {id: "Sally"}, {id: "Alice"}],
  links: [
    {source: "Harry", target: "Sally"},
    {source: "Harry", target: "Alice"},
  ],
};

// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
const myConfig = {
  nodeHighlightBehavior: true,
  node: {
    color: "lightgreen",
    size: 120,
    highlightStrokeColor: "blue",
  },
  link: {
    highlightColor: "lightblue",
  },
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
  <Graph
    id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
    data={data}
    config={myConfig}
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
