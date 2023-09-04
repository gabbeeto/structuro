import {currentWindow, closeWindow } from './../currentWindow.js'
import { addNodeToLeft, addNodeToRight, addNodeChild } from './../../nodes/createNodes.js'


export function generateWindowForCreateNodesButton() {
  if (windowProperties.isWindowNotOpen) {
    console.log(currentWindow)
    currentWindow.innerHTML = `<button id='closeWindow'>close</button>
    <div>
    <button id="addNodeToTheLeft">left</button>
    <button id="addNodeChild">child</button>
    <button id="addNodeToTheRight">right</button>
    </div>`


    document.querySelector('#closeWindow').addEventListener('click', closeWindow)
    document.querySelector('#addNodeToTheLeft').addEventListener('click', addNodeToLeft)
    document.querySelector('#addNodeChild').addEventListener('click', addNodeChild)
    document.querySelector('#addNodeToTheRight').addEventListener('click', addNodeToRight)
  }


}
