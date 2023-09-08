import { currentWindow, closeWindow, displayWindow, displayWindowError } from './../currentWindow.js'
import { applyEditChanges} from './../../nodes/editNodes.js'

export function generateWindowForEditNodesButton() {

  if (windowProperties.isWindowNotOpen) {
    alert('generateWindowForEditNodesButton')

    currentWindow.innerHTML = `<button id='closeWindow'>close</button>
    <p>text:</p>
    <input type="text">
    <p>color:</p>
    <input type="color" id="">
    <button id='applyEditChanges'>apply</button>`;

    document.querySelector('#closeWindow').addEventListener('click', closeWindow);
    document.querySelector('#applyEditChanges').addEventListener('click', applyEditChanges);

    windowProperties.isWindowNotOpen = false;
    displayWindow();
  }
  else{
  displayWindowError()
  }
}

