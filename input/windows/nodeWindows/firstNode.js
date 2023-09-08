import { currentWindow, closeWindow, displayWindow } from './../currentWindow.js';
import {applyFirstNodeFunc} from './../../nodes/firstNode.js';


export function generateWindowForFirstNodeButton(){


  if (windowProperties.isWindowNotOpen) {

    currentWindow.innerHTML = `<button id='closeWindow'>close</button>
    <p>First Node</p>
    <select name="" id="">
    <option value="">empty</option>
    </select>
    <button id="applyFirstNodeFunc">apply</button>`

    document.querySelector('#closeWindow').addEventListener('click', closeWindow);
    document.querySelector('#applyFirstNodeFunc').addEventListener('click', applyFirstNodeFunc);

    windowProperties.isWindowNotOpen = false;
    displayWindow();
  }

}
