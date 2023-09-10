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
  console.log(divIndex);
  console.log(nodeIndex);

}

function pushToNodeStructureArrayAndPushToParent() {
  let pushedNode = nodeElement('new Element', 'black', emptyElement(), nodeIndex + 1, nodeStructure[divIndex][nodeIndex].indexForParent, divIndex);
  console.log(pushedNode)

  nodeStructure[divIndex].splice(nodeIndex, 0, pushedNode)

  pushToParent(JSON.stringify(pushedNode))
}

function pushToParent(pushedNode) {
  let child = returnChildrenParameter(Number(divIndex));
  // console.log(child)
 console.log(`${child}.push(${pushedNode})`) 
  eval(`${child}.push(${pushedNode})`)
}

// function updateFollowingElements() {
//   console.log(nodeStructure[divIndex][nodeIndex])
//   let parentElement = nodeStructure[divIndex - 1][nodeStructure[divIndex][nodeIndex].indexForParent];
//   // increase amount of space on the Parent because new element was created
//   parentElement.amountOfSpace = parentElement.amountOfSpace + 1;
//   for (let index in nodeStructure) {
//     for (let node of nodeStructure[index]) {
//       if (node.indexForSibling > nodeIndex && node.indexForStructure == divIndex) {
//       node.indexForSibling += 1;
//       }

//     }


//   }


// }
