import './style/node/node.css'

let nodeContainer = document.querySelector('#nodes')
window.currentSizeWithText = [];
displayElements()
export function displayElements() {
  checkTheLargestIndexStructure();
  calculateSpaceInsideStructureArray()
  calculateSizeForDisplay()
  // changeTemplatesForNodeContainer();
  displayInNodes()
}

function checkTheLargestIndexStructure() {
  window.highestAmountOfElements = 0;
  window.currentIndexForTheStructure = 0;
  // check if the current structure is larger than the previous structure 
  selectedStructure.forEach(node => {
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




function calculateSizeForDisplay() {
  for (let structureIndex in selectedStructure) {
    for (let node of selectedStructure[structureIndex]) {
      getCurrentSize(node)
    }
    getTextForGridTemplate(structureIndex)
  }
}

function getCurrentSize(node) {
  // it's a comparison because 0 as a number is falsy
  if (`${node.indexForParent}` != 'false') {
    // if there's a parent then...

    let percentageCalculation = (node.amountOfSpace / amountOfSpaceInStructure[node.indexForStructure])

    let parentElementSize = window.currentSize[node.indexForStructure - 1][node.indexForParent]

    let calculation2 = (percentageCalculation * parentElementSize)

    if (currentSize[node.indexForStructure]) {
      window.currentSize[node.indexForStructure][node.indexForSibling] = calculation2;
    }
    else {
      currentSize[node.indexForStructure] = []
      window.currentSize[node.indexForStructure][node.indexForSibling] = calculation2;
    }
  }
  else {
    window.currentSize = [[100]];
  }
}

function getTextForGridTemplate(structureIndex) {
  let textArray = []
  for (let size of currentSize[structureIndex]) {
    textArray.push(`${size}%`)
    textArray.push(' ')
  }
  window.currentSizeWithText[structureIndex] = textArray.join('')
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
  for (let indexForNodeStructure in selectedStructure) {
    let div = document.createElement('div');
    console.log(`${currentSizeWithText[indexForNodeStructure]}`)
    div.style.gridTemplateColumns = `${currentSizeWithText[indexForNodeStructure]}`;
    // div.style.gridTemplate = ''
    nodeContainer.appendChild(div)
    for (let node of selectedStructure[indexForNodeStructure]) {
      let nodeText = document.createElement('p')
      nodeText.innerText = node.text;
      nodeText.style.backgroundColor = node.color;
      div.appendChild(nodeText);
    }
  }
}

