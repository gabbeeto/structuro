import { displayElements} from './../displayContentInhtml'

let children = 0;
let amountOfSpace = 1;
let siblingIndex = 0;
let newArray = [[]];
let previousNode = '';


// update Node Structure Functionality


export function updateNodeStructure() {
  children = 0;
  amountOfSpace = 1;
  siblingIndex = 0;
  previousNode = 'firstNode';
  newArray = [[firstNode]];


  iterateThroughChildrenToUpdateIndex(firstNode)
  updateAmountOfSpace()
  nodeStructure = newArray;
  selectedStructure = nodeStructure;
  displayElements()
}






// in the moment this works but don't be surprised if you have to fix it in the future
function iterateThroughChildrenToUpdateIndex(node) {
  // this is a recursive method that does the following:

  // 1 from top to bottom try to reach the empty element
  // 2. check if last element has siblings, if not.. come back to the previous children with siblings
  // 3. find previous children with sibling and repeat top to bottom procress until it reaches to empty element
  // (also updates information such as indexForParent,indexForSibling,IndexForStructure)

  if (node.children[0].color) {

    updateInformationForCurrentNode(node)
    updateArray(node)

    children = children + 1;


    let child = appendArgument(`${previousNode}`, `children[${siblingIndex}]`, 1)
    previousNode = child;

    iterateThroughChildrenToUpdateIndex(eval(child))
  }
  else {
    amountOfSpace += 1;
    siblingIndex += 1;
    findSibling(node)
  }
}


function updateArray(node) {
  //creates new array in case of inexisting array;
  if (!newArray[children + 1]) {
    newArray[children + 1] = []
  }
  // it doesn't update the first node because it is always 'first node'
  newArray[children + 1][siblingIndex] = eval(appendArgument(`${previousNode}`, `children[${siblingIndex}]`, 1));

}





function updateInformationForCurrentNode() {
  let node = eval(appendArgument(`${previousNode}`, `children[${siblingIndex}]`, 1));

  // update index for parent
  if (node.indexForParent) {
    node.indexForParent = newArray[children + 1][siblingIndex].indexForSibling
  }

  // update index for sibling 
  node.indexForSibling = siblingIndex;
  // update index for sibling 
  node.indexForStructure = children + 1;

}





export function appendArgument(variableToAppend, appendedVariable, numberOfTimes) {
  let array = [`${variableToAppend}`]
  for (let index = 0; index < numberOfTimes; index++) {
    array.push(`.${appendedVariable}`)
  }
  return array.join('')

}






function findSibling(node) {
  // 2. check if last element has siblings, if not.. come back to the previous children with siblings

console.log(previousNode)
  let nodeWithoutPreviousSibling = previousNode.substring(0, previousNode.length - 3);

  let nodeWithUpdatedSibling = `${nodeWithoutPreviousSibling}[${siblingIndex}]`;

  let arrayWithoutTheLastChildren = nodeWithoutPreviousSibling.split('.')
  children -= 1;
  arrayWithoutTheLastChildren.pop()
  arrayWithoutTheLastChildren = arrayWithoutTheLastChildren.join('.')

  if (eval(nodeWithUpdatedSibling)) {

    previousNode = arrayWithoutTheLastChildren;

    iterateThroughChildrenToUpdateIndex(eval(arrayWithoutTheLastChildren))
  }
  else {
    if (amountOfSpace < firstNode.amountOfSpace) {
      let previousSplitted = previousNode.split('.');
      previousSplitted.pop()
      previousNode = previousSplitted.join('.')
      findSibling()

    }
  }
}






function updateAmountOfSpace() {
  removeAmountOfSpaceToArray()
  addAmountOfSpaceToArray()
}

function removeAmountOfSpaceToArray() {
  for (let subArray = newArray.length - 1; subArray > -1; subArray = subArray - 1) {
    for (let index2 = 0; index2 < newArray[subArray].length; index2++) {
      let node = newArray[subArray][index2];
      node.amountOfSpace = 0;
    }
  }
}

function addAmountOfSpaceToArray() {
  for (let subArray = newArray.length - 1; subArray > -1; subArray = subArray - 1) {
    for (let index2 = 0; index2 < newArray[subArray].length; index2++) {
      let node = newArray[subArray][index2];
      node.amountOfSpace = node.children.length;
      if (node.children[0].amountOfSpace) {
        node.amountOfSpace = getChildrenAmountOfSpace(node)
      }
    }
  }
}


function getChildrenAmountOfSpace(node) {
  let amountOfSpace = 0;
  for (let index3 in node.children) {
    let children = node.children[index3];
    amountOfSpace = amountOfSpace + children.amountOfSpace
  }
  return amountOfSpace
}
