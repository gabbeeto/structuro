import './../style/windows.css'

window.windowProperties = {isWindowNotOpen: true,}

export let  currentWindow = document.querySelector('#currentWindow');

export function closeWindow(){
currentWindow.style.display = 'none';
currentWindow.innerHTML = '';
}

export function  displayWindow(){
currentWindow.style.display = 'flex';
}

export function hideWindow(){
}
