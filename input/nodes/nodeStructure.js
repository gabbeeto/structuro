
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
  previousNode = 'firstNode';
  newArray = [[firstNode]];
  // console.log(newArray)


// 1 from top to bottom try to reach the empty element
// 2. check if last element has siblings, if not.. come back to the previous children with siblings
// 3. repeat top to bottom procress until it reaches to empty element
  iterateThroughChildren(firstNode)
  nodeStructure = newArray;
  console.log(newArray)
}







function iterateThroughChildren(node) {
console.log('intialize iterate...')
console.log('<<')
console.log(node)
console.log(node.children)
console.log(`sibling: ${siblingIndex}`)
console.log(`children: ${children}`)
console.log('>>')
  if (node.children[0].color) {
    console.log('children detected...')

    updateInformationForCurrentNode(node)
    updateArray(node)
    children = children + 1;


    let child = appendArgument(`${previousNode}`, `children[${siblingIndex}]`, 1)
    previousNode = child;

    iterateThroughChildren(eval(child))

  }
  else {
    amountOfSpace += 1;
    siblingIndex += 1;
    findSibling(node)
  }
}


function updateArray(node) {
console.log('intialize array update...')
  if(!newArray[children +1]){
newArray[children +1] = []
  }
    newArray[children + 1][siblingIndex] = eval(appendArgument(`${previousNode}`, `children[${siblingIndex}]`, 1));

}

function updateInformationForCurrentNode() {
console.log('intialize info update...')
  let node =  eval(appendArgument(`${previousNode}`, `children[${siblingIndex}]`, 1));

  // update index for parent
  if (node.indexForParent) {
    // console.log(children)
    // console.log(siblingIndex)
    node.indexForParent = newArray[children +1][siblingIndex].indexForSibling
  }


  // update index for sibling 
  node.indexForSibling = siblingIndex;


  // update index for sibling 
  node.indexForStructure = children + 1;

}





export function appendArgument(variableToAppend, appendedVariable, numberOfTimes) {
console.log('intialize append...')
  let array = [`${variableToAppend}`]
  for (let index = 0; index < numberOfTimes; index++) {
    array.push(`.${appendedVariable}`)
  }
  return array.join('')

}


function findSibling(node) {
  console.log('initialize find sibling..')
// 2. check if last element has siblings, if not.. come back to the previous children with siblings


  let nodeWithoutPreviousSibling = previousNode.substring(0, previousNode.length - 3);

  let nodeWithUpdatedSibling = `${nodeWithoutPreviousSibling}[${siblingIndex}]`;

  let arrayWithoutTheLastChildren = nodeWithoutPreviousSibling.split('.')
  children -= 1;
  arrayWithoutTheLastChildren.pop()
  arrayWithoutTheLastChildren = arrayWithoutTheLastChildren.join('.')

  // console.log(arrayWithoutTheLastChildren)
  if (eval(nodeWithUpdatedSibling)) {

    console.log('***')
    console.log('if eval(nodeWithUpdatedSibling) ')
    console.log(arrayWithoutTheLastChildren)
    console.log(`previousNode: ${previousNode}`)
    console.log('***')
    previousNode = arrayWithoutTheLastChildren;
    
    iterateThroughChildren(eval(arrayWithoutTheLastChildren))
  }
  else{
    if(amountOfSpace < firstNode.amountOfSpace){

  findSibling()
    }
    console.log('**')
    console.log('sibling not found')
    console.log('**')
  }
 }


