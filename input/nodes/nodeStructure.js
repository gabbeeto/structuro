
let children = 0;
let amountOfSpace = 1;
let siblingIndex = 0;
let newArray = [[]];
let previousNode = '';
// empty elements are for displaying purposes only

window.emptyElement = function(text = 'empty', indexForParent = true) {
  return { text, indexForParent }
}


window.nodeElement = function(text = 'empty', color = 'black', children = [emptyElement()], indexForSibling = 0, indexForParent = false, indexForStructure = 0, amountOfSpace = 1) {
  return { text, color, children, indexForSibling, indexForParent, indexForStructure, amountOfSpace }
}

if (localStorage.nodeStructure) {
  window.nodeStructure = JSON.parse(localStorage.nodeStructure.main)
  window.selectedStructure = JSON.parse(localStorage.nodeStructure.selected)
}
else {
  window.firstNode = nodeElement('firstElement', 'black', [nodeElement('secondElement', 'pink'), nodeElement('thirdElement', 'gray')]);
  firstNode.amountOfSpace = 2;
  firstNode.children[0].indexForStructure = 1;
  firstNode.children[1].indexForStructure = 1;
  firstNode.children[1].indexForSibling = 1;
  firstNode.children[0].indexForParent = 0;
  firstNode.children[1].indexForParent = 0;

  window.nodeStructure = [[firstNode], [firstNode.children[0], firstNode.children[1]]];

  window.selectedStructure = nodeStructure;
}

// updateNodeStructure(firstNode)


// work on this
export function updateNodeStructure() {
  children = 0;
  amountOfSpace = 1;
  siblingIndex = 0;
  newArray = [[]];
  previousNode = 'firstNode';
  iterateThroughChildren(firstNode)
}



// make sister variable for looking to the next sibling
function iterateThroughChildren(node) {
  if (node.children[siblingIndex].color) {
    updateArray(node)
    updateInformationForCurrentNode(node)

    children += 1;
    let child = appendArgument(`${previousNode}`, `children[${siblingIndex}]`, 1)
    previousNode = child;
    iterateThroughChildren(eval(child))

  }
  else {
    // make it a function and make recursion with that function trying to see if the parent container has a sister or not
    // if it finds the sister, work with that sister and its children
    children = 0;
    amountOfSpace = amountOfSpace + 1;
  }
}

function updateArray(node) {

  if (newArray[children][siblingIndex]) {
    newArray[children][siblingIndex] = node;
    console.log('this workeddddd')
  }
  else {
    console.log('this worked')
    newArray[children].push(node);
  }

}

function updateInformationForCurrentNode(node) {
  updateIndexForParent(node)
  node.indexForSibling = siblingIndex;
  node.indexForStructure = children;

}

function updateIndexForParent(node) {
  if (node.indexForStructure != 0) {
    node.indexForParent == false;
  }
  else {
    node.indexForParent = newArray[children][siblingIndex].indexForSibling
  }
}




export function appendArgument(variableToAppend, appendedVariable, numberOfTimes) {
  let array = [`${variableToAppend}`]
  for (let index = 0; index < numberOfTimes; index++) {
    array.push(`.${appendedVariable}`)
  }
  return array.join('')

}


