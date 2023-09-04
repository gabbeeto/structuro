import './../style/windows.css'

window.windowProperties = {isWindowNotOpen: true,}

export let  currentWindow = document.querySelector('#currentWindow');

export function closeWindow(){
alert('the feature of the future');

}

export function  displayWindow(){
currentWindow.style.display = 'flex';
}

export function hideWindow(){
currentWindow.style.display = 'none';
}
