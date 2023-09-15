import { updateNodeStructure, appendArgument } from './updateStructure.js'
let divIndex;
let nodeIndex;


export function addNodeToLeft() {
  firstNode.amountOfSpace += 1;
  divIndex = 0;
  nodeIndex = 1;
  divideSelectedNode()
  pushTofirstNode(false)

  updateNodeStructure()
}


export function addNodeChild() {
  firstNode.amountOfSpace += 1;
  divIndex = 0;
  nodeIndex = 1;
  divideSelectedNode()
  pushChild()
}


export function addNodeToRight() {
  firstNode.amountOfSpace += 1;
  divIndex = 0;
  nodeIndex = 1;
  divideSelectedNode()
  pushTofirstNode(true)


  updateNodeStructure()
}

function divideSelectedNode() {
  let hyphen = selectedNode.indexOf('-');
  divIndex = selectedNode.substring(0, hyphen);
  nodeIndex = selectedNode.substring(hyphen + 1, selectedNode.length);
}


function pushTofirstNode(orientation) {
  let pushedNode = nodeElement('new Element', 'black', [emptyElement()], nodeIndex + 1, nodeStructure[divIndex][nodeIndex].indexForParent, divIndex);
  pushToParent(JSON.stringify(pushedNode), orientation)
}


function pushToParent(pushedNode, rightOrientation) {
  let child = appendArgument('firstNode', 'children', Number(divIndex));
  if (rightOrientation) {
    eval(`${child}.splice(${nodeIndex} + 1, 0,${pushedNode})`)
  }
  else {
    eval(`${child}.splice(${nodeIndex} , 0,${pushedNode})`)
  }

}


// continue tomorrow
function pushChild() {
  let pushedNode = nodeElement('new Element', 'black', [emptyElement()], nodeStructure[divIndex][nodeIndex].children.length - 1, nodeStructure[divIndex][nodeIndex].indexForSibling, divIndex);
  let child = appendArgument('firstNode', 'children.children', Number(divIndex));


  let length = `${child}.length`;
  let color = `${child}.color`;

  if (eval(color)) {
    console.log(length)
  }
  else {

  }

}
