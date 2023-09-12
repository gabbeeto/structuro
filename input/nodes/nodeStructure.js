
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



function iterateThroughChildren(node) {
  // console.log(node.children[siblingIndex].color)
  // console.log('lol')
  if (node.children[siblingIndex].color) {
    // make sister variable for looking to the next sibling
    children += 1;
    getIndexForParent(node)
    newArray.push(node);
    // let child = returnChildrenVariableDependingOnChildNumber(children)
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


function getIndexForParent(node) {
  if (node.indexForStructure != 0) {
    node.indexForParent == false;
  }
  else {
    node.indexForParent = newArray[children -1].indexForSibling
    // work on this 
  }
}


// checks that the children is not an empty element 

export function returnChildrenVariableDependingOnChildNumber(childNumber) {
  let array = ['firstNode']
  // console.log(`ddd:${childNumber}`)
  for (let index = 0; index < childNumber; index++) {
    array.push(`['children']`)
  }
  // console.log(array)
  return array.join('')

}


export function appendArgument(variableToAppend,appendedVariable,numberOfTimes) {
  let array = [`${variableToAppend}`]
  // console.log(`ddd:${childNumber}`)
  for (let index = 0; index < numberOfTimes; index++) {
    array.push(`.${appendedVariable}`)
  }
  // console.log(array)
  return array.join('')

}


