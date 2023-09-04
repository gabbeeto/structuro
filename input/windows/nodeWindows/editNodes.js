import { currentWindow } from './../currentWindow.js'
import { applyEditChanges} from './../../nodes/editNodes.js'

export function generateWindowForEditNodesButton() {

  if (windowProperties.isWindowNotOpen) {
    alert('generateWindowForEditNodesButton')

    currentWindow.innerHTML = `<p>text:</p>
    <input type="text">
    <p>color:</p>
    <input type="color" id="">
    <button id='applyEditChanges'>apply</button>`

    document.querySelector('#applyEditChanges').addEventListener('click', applyEditChanges)
  }
}

