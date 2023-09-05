import './style/node/node.css'

let nodeContainer = document.querySelector('#nodes')
export function displayElements() {
  checkTheLargestIndexStructure();
  changeTemplatesForNodeContainer();
  displayInNodes()
}


// work on this
functionForTheFuture(){
}

displayElements()
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
      let nodeText = document.createElement('p')
      nodeText.innerText = node.text;
      nodeText.style.backgroundColor = node.color;
      div.appendChild(nodeText);
    }
  }
}
