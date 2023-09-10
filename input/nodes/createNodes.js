import { returnChildrenParameter, updateNodeStructure } from './nodeStructure.js'
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
  let pushedNode = nodeElement('new Element', 'black', emptyElement(), nodeIndex + 1, nodeStructure[divIndex][nodeIndex].indexForParent, divIndex);
  // console.log(pushedNode)

  nodeStructure[divIndex].splice(nodeIndex, 0, pushedNode)

  pushToParent(JSON.stringify(pushedNode))
}

function pushToParent(pushedNode) {
  let child = returnChildrenParameter(Number(divIndex));
  // console.log(child)
 // console.log(`${child}.push(${pushedNode})`) 
  eval(`${child}.push(${pushedNode})`)
}

