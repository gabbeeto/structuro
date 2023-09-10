
let children = 0;
let amountOfSpace = 1;

// empty elements are for displaying purposes only

window.emptyElement = function(text = 'empty', indexForParent = true) {
  return { text, indexForParent }
}


window.nodeElement = function(text = 'empty', color = 'black', children = emptyElement(), indexForSibling = 0, indexForParent = false, indexForStructure = 0, amountOfSpace = 1) {
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

updateNodeStructure(firstNode)


// work on this
export function updateNodeStructure() {
  children = 0;
  amountOfSpace = 1;
  iterateThroughChildren(firstNode)
}



function iterateThroughChildren(node) {
  if (node.children.color) {
    children += 1;
    checkParent()
    let child = returnChildrenParameter(children)
    iterateThroughChildren(eval(child))
  }
  else {

    children = 0;
    amountOfSpace = amountOfSpace + 1;
  }
}


function checkParent() {
  if (node.indexForStructure != 0) {
    node.indexForStructure == false;
  }
  else {

    // work on this 
  }
}


// checks that the children is not an empty element 

export function returnChildrenParameter(childNumber) {
  let array = ['firstNode']
  // console.log(`ddd:${childNumber}`)
  for (let index = 0; index < childNumber; index++) {
    array.push(`['children']`)
  }
  // console.log(array)
  return array.join('')

}


