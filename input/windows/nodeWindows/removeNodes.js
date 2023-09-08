import { currentWindow, closeWindow, displayWindow,displayWindowError } from './../currentWindow.js'
import { removeNode } from './../../nodes/removeNodes.js'
export function generateWindowForRemoveNodesButton() {

  if (windowProperties.isWindowNotOpen) {
    currentWindow.innerHTML = `<p>are you sure you want to delete this?</p>
    <div><button id='acceptDelete'>yes</button><button id='denyDelete'>no</button></div>`;

    document.querySelector('#acceptDelete').addEventListener('click', removeNode);
    document.querySelector('#denyDelete').addEventListener('click', closeWindow );

    windowProperties.isWindowNotOpen = false;
    displayWindow()
  }
  else{
  displayWindowError()
  }
}


