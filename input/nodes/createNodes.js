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
  // let child = appendArgument('firstNode', 'children', Number(divIndex));
  let child = appendElementText()

  let length = `${child}.length`;
  let color = `${child}.color`;


  console.log(length);
  // console.log(color);

  // if(color) {
  // console.log(length)
  // }
  // else{
  // console.log(length)
  // }

}


function appendElementText() {
  let elementTextArray = [];

  console.log(`nodeindex:${nodeIndex}`)
  console.log(`divIndex:${divIndex}`)
  for (let index = divIndex; index > -1; index--) {
    if (index == divIndex) {
      let pushedElement = `.children[${nodeStructure[index][nodeIndex].indexForSibling}]`;
      console.log(pushedElement)
      elementTextArray.unshift(pushedElement)
    }
    else if (index == 0) {
      elementTextArray.unshift('firstNode');
    }
    else {
      let previousElementNodeIndex = elementTextArray[0].substring(elementTextArray[0].indexOf('['), elementTextArray[0].length);
      let parentIndex = Number(nodeStructure[index + 1][Number(previousElementNodeIndex)].indexForParent);
      let pushedElement = `.children[${nodeStructure[index][parentIndex]}]`
      console.log(pushedElement)
      elementTextArray.unshift(pushedElement)
    }
  }

  return elementTextArray.join('');

}
