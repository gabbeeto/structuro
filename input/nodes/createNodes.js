// import { appendArgument } from './nodeStructure.js'
import {  updateNodeStructure, appendArgument } from './updateStructure.js'
let divIndex;
let nodeIndex;


export function addNodeToLeft() {
  alert('addNodeToLeft')
}


export function addNodeChild() {
  alert('addNodeToRight')
}


export function addNodeToRight() {
  firstNode.amountOfSpace += 1;
  divIndex = 0;
  nodeIndex = 1;
  divideSelectedNode()
  pushToNodeStructureArrayAndPushToParent()


  updateNodeStructure()
}

function divideSelectedNode() {
  let hyphen = selectedNode.indexOf('-');
  divIndex = selectedNode.substring(0, hyphen);
  nodeIndex = selectedNode.substring(hyphen + 1, selectedNode.length);
}


function pushToNodeStructureArrayAndPushToParent() {
  let pushedNode = nodeElement('new Element', 'black', [emptyElement()], nodeIndex + 1, nodeStructure[divIndex][nodeIndex].indexForParent, divIndex);

  nodeStructure[divIndex].splice(nodeIndex + 1, 0, pushedNode)

  pushToParent(JSON.stringify(pushedNode))
}


function pushToParent(pushedNode) {
  let child = appendArgument('firstNode','children',Number(divIndex));

 eval(`${child}.splice(${nodeIndex} + 1, 0,${pushedNode})`) 
}

