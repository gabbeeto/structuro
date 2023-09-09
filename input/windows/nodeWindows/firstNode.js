import { currentWindow, closeWindow, displayWindow, displayWindowError } from './../currentWindow.js';
import { applyFirstNodeFunc } from './../../nodes/firstNode.js';



export function generateWindowForFirstNodeButton() {


  if (windowProperties.isWindowNotOpen) {
    currentWindow.innerHTML = `<button id='closeWindow'>close</button>
    <p>First Node</p>
    <select name="" id="">
    </select>
    <button id="applyFirstNodeFunc">apply</button>`;

    appendNodesFromNodeStructure()
    document.querySelector('#closeWindow').addEventListener('click', closeWindow);
    document.querySelector('#applyFirstNodeFunc').addEventListener('click', applyFirstNodeFunc);

    windowProperties.isWindowNotOpen = false;
    displayWindow();
  }
  else {
    displayWindowError()
  }

}

function appendNodesFromNodeStructure() {
let select = document.querySelector('#currentWindow select')
  for (let div of nodeStructure) {
    for (let node of div) {
      // this checks that it's not an empty element
      if (node.color) {
        let option = document.createElement('option');
        option.innerText = node.text;
        option.value = `${node.indexForStructure}-${node.indexForSibling}`;
        checkIfItMarchesSelectedNode(option)
        select.appendChild(option);
      }
    }
  }
}

function checkIfItMarchesSelectedNode(option){
if(option.value == window.selectedNode){
option.selected = true;
}
}
