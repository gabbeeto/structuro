import './style/node/node.css'

let nodeContainer = document.querySelector('#nodes')

displayElements()
export function displayElements() {
  checkTheLargestIndexStructure();
  calculateSpaceInsideStructureArray()
  changeTemplatesForNodeContainer();
  displayInNodes()
}

function checkTheLargestIndexStructure() {
  window.highestAmountOfElements = 0;
  window.currentIndexForTheStructure = 0;
  // check if the current structure is larger than the previous structure 
  nodeStructure.forEach(node => {
    if (node.length > highestAmountOfElements) {
      highestAmountOfElements = node.length;
      currentIndexForTheStructure = node[0].indexForStructure;
    }
  })
}



// works but maybe not necessary because checkTheLargestIndexStructure do its job
function calculateSpaceInsideStructureArray() {
  window.amountOfSpaceInStructure = []
  for (let index in nodeStructure) {
    let valueForIndex = 0
    for (let index2 in nodeStructure[index]) {
      valueForIndex = valueForIndex + nodeStructure[index][index2].amountOfSpace
    }
    amountOfSpaceInStructure.push(valueForIndex)

  }
}



// log I'll apply later
// get the parent size, (if none then 100% is the size) and get the length of all the siblings.
// divide all the space of siblings  by the father length to get your current length.
// repeat until it displays all elements


function changeTemplatesForNodeContainer() {
  nodeContainer.style.gridTemplateRows = `repeat(${nodeStructure.length}, 1fr)`
}


function displayInNodes() {
  let nodeContainer = document.querySelector('#nodes');
  for (let indexForNodeStructure in nodeStructure) {
    let div = document.createElement('div');
    div.style.gridTemplateColumns = `repeat(${highestAmountOfElements}, 1fr)`
    div.style.gridTemplate
    nodeContainer.appendChild(div)
    for (let node of nodeStructure[indexForNodeStructure]) {
      getParentSize(node)
      let nodeText = document.createElement('p')
      nodeText.innerText = node.text;
      nodeText.style.backgroundColor = node.color;
      div.appendChild(nodeText);
    }
  }
}

// work on this later on
function getParentSize(node) {
  // it's a comparison because 0 as a number is falsy
  if (`${node.indexForParent}` != 'false') {
    // if there's a parent then...

    percentageCalculation = (node.amountOfSpace / amountOfSpaceInStructure[node.indexForStructure]) 
    calculation2 = (percentageCalculation * currentSize[node.indexForStructure - 1][node.indexForParent])


    // window.currentSize[node.indexForStructure][node.indexForSibling] = ;
  }
  else {
    window.currentSize = [[100]];
  }
}
