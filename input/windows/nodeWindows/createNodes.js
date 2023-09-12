import { currentWindow, closeWindow, displayWindow, displayWindowError } from './../currentWindow.js'
import { addNodeToLeft, addNodeToRight, addNodeChild } from './../../nodes/createNodes.js'


export function generateWindowForCreateNodesButton() {
  if(windowProperties.isWindowNotOpen) {


if(selectedNode[0] == '0'){
    currentWindow.innerHTML = `<button id='closeWindow'>close</button>
    <div>
    <button id="addNodeChild">add child</button>
    </div>`;
    }
    else{

    currentWindow.innerHTML = `<button id='closeWindow'>close</button>
    <div>
    <button id="addNodeToTheLeft">left</button>
    <button id="addNodeChild">add child</button>
    <button id="addNodeToTheRight">right</button>
    </div>`;

    document.querySelector('#addNodeToTheLeft').addEventListener('click', addNodeToLeft);
    document.querySelector('#addNodeToTheRight').addEventListener('click', addNodeToRight);
    }




    document.querySelector('#closeWindow').addEventListener('click', closeWindow);
    document.querySelector('#addNodeChild').addEventListener('click', addNodeChild);

    windowProperties.isWindowNotOpen = false;
    displayWindow();
  }
  else{
  displayWindowError()
  }
}
