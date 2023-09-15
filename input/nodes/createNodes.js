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
  divideSelectedNode()
  pushToNodeStructureArrayAndPushToParent()
  updateNodeStructure()
}

function divideSelectedNode() {
  let hyphen = selectedNode.indexOf('-');
  divIndex = selectedNode.substring(0, hyphen);
  nodeIndex = selectedNode.substring(hyphen + 1, selectedNode.length);
  // console.log(divIndex);
  // console.log(nodeIndex);

}

function pushToNodeStructureArrayAndPushToParent() {
  let pushedNode = nodeElement('new Element', 'black', [emptyElement()], nodeIndex + 1, nodeStructure[divIndex][nodeIndex].indexForParent, divIndex);
  // console.log(pushedNode)

  console.log(`nodeIndex:${nodeIndex}`)
  console.log(`divIndex:${divIndex}`)
  nodeStructure[divIndex].splice(nodeIndex + 1, 0, pushedNode)

  pushToParent(JSON.stringify(pushedNode))
}

function pushToParent(pushedNode) {
  // let child = returnChildrenVariableDependingOnChildNumber(Number(divIndex));
  let child = appendArgument('firstNode','children',Number(divIndex));
  // console.log(divIndex)
 eval(`${child}.splice(nodeIndex + 1, 0,${pushedNode})`) 
  // eval(`${child}.push(${pushedNode})`)
}

