
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
  pushToNodeStructureArray()
  updateFollowingElements()
}

function divideSelectedNode() {
  let hyphen = selectedNode.indexOf('-');
  divIndex = selectedNode.substring(0, hyphen);
  nodeIndex = selectedNode.substring(hyphen + 1, selectedNode.length);
  console.log(divIndex);
  console.log(nodeIndex);

}

function pushToNodeStructureArray() {
  nodeStructure[divIndex].splice(nodeIndex, 0, nodeElement('new Element', 'black', emptyElement(), nodeIndex + 1, nodeStructure[divIndex][nodeIndex].indexForParent, divIndex))
}

function updateFollowingElements() {
  console.log(nodeStructure[divIndex][nodeIndex])
  let parentElement = nodeStructure[divIndex - 1][nodeStructure[divIndex][nodeIndex].indexForParent];
  // increase amount of space on the Parent because new element was created
  parentElement.amountOfSpace = parentElement.amountOfSpace + 1;
  for (let index in nodeStructure) {
    for (let node of nodeStructure[index2]) {
      if (node.indexForSibling > nodeIndex && node.indexForStructure > divIndex) {
        

      }

    }


  }


}
