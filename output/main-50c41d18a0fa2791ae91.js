/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./input/displayContentInhtml.js":
/*!***************************************!*\
  !*** ./input/displayContentInhtml.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displayElements: () => (/* binding */ displayElements)
/* harmony export */ });
/* harmony import */ var _style_node_node_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/node/node.css */ "./input/style/node/node.css");
/* harmony import */ var _nodes_selectedNodes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nodes/selectedNodes.js */ "./input/nodes/selectedNodes.js");




let nodeContainer = document.querySelector('#nodes')
window.nodeSizeForColumnTemplate = [];
window.nodeSize = [];

displayElements()

function displayElements() {
  nodeContainer.innerHTML = '';
  calculateSpaceInsideStructureArray()
  calculateSizeForDisplay()
  displayInNodes()
}




function calculateSpaceInsideStructureArray() {
  window.amountOfSpaceInNodeDivs = []

  selectedStructure.forEach((divForNode) => {

    let AmountOfExistingSpaceFromThisDiv = divForNode.reduce((accumulator, currentNode) => accumulator + currentNode.amountOfSpace, 0);
    amountOfSpaceInNodeDivs.push(AmountOfExistingSpaceFromThisDiv)

  })
}




function calculateSizeForDisplay() {
  for (let structureIndex in selectedStructure) {
    for (let node of selectedStructure[structureIndex]) {
      getWidthSizeForNode(node)
    }
    getTextForGridTemplate(structureIndex)
  }
}

function getWidthSizeForNode(node) {
  // it's a comparison because 0 as a number is falsy
  if (`${node.indexForParent}` != 'false') {
    // if there's a parent then...

    let nodeSpace = node.amountOfSpace;
    let divSpace = amountOfSpaceInNodeDivs[node.indexForStructure];
    let percentageCalculation = (nodeSpace / divSpace)

    // console.log(node.indexForStructure -1)
    let parentElementSize = window.nodeSize[node.indexForStructure - 1][node.indexForParent]

    let calculation2 = (percentageCalculation * parentElementSize)

    // if statement made to combat the undefined problem
    if (nodeSize[node.indexForStructure]) {
      window.nodeSize[node.indexForStructure][node.indexForSibling] = calculation2;
    }
    else {
      nodeSize[node.indexForStructure] = []
      window.nodeSize[node.indexForStructure][node.indexForSibling] = calculation2;
    }
  }
  else {
    // if there's no parent, it is 100% width
    window.nodeSize = [[100]];
  }
}

function getTextForGridTemplate(structureIndex) {
  let sizeInformationArray = []
  for (let size of nodeSize[structureIndex]) {
    sizeInformationArray.push(`${size}%`)
    sizeInformationArray.push(' ')
  }
  window.nodeSizeForColumnTemplate[structureIndex] = sizeInformationArray.join('')
}





function displayInNodes() {
  let nodeContainer = document.querySelector('#nodes');
  for (let divIndex in selectedStructure) {
    let divForNodes = document.createElement('div');
    divForNodes.style.gridTemplateColumns = `${nodeSizeForColumnTemplate[divIndex]}`;
    nodeContainer.appendChild(divForNodes)
    for (let node of selectedStructure[divIndex]) {
      let nodeText = document.createElement('p')
      nodeText.innerText = node.text;
      nodeText.style.backgroundColor = node.color;
      nodeText.value = `${node.indexForStructure}-${node.indexForSibling}`;
      nodeText.addEventListener('click', _nodes_selectedNodes_js__WEBPACK_IMPORTED_MODULE_1__.changeSelectedNode);
      divForNodes.appendChild(nodeText);
    }
  }
}



/***/ }),

/***/ "./input/nodes/createNodes.js":
/*!************************************!*\
  !*** ./input/nodes/createNodes.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addNodeChild: () => (/* binding */ addNodeChild),
/* harmony export */   addNodeToLeft: () => (/* binding */ addNodeToLeft),
/* harmony export */   addNodeToRight: () => (/* binding */ addNodeToRight)
/* harmony export */ });
/* harmony import */ var _updateStructure_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateStructure.js */ "./input/nodes/updateStructure.js");



let divIndex;
let nodeIndex;


function addNodeToLeft() {
  firstNode.amountOfSpace += 1;
  divIndex = 0;
  nodeIndex = 1;
  divideSelectedNode()
  pushTofirstNode(false)

  ;(0,_updateStructure_js__WEBPACK_IMPORTED_MODULE_0__.updateNodeStructure)()
}


function addNodeChild() {
  firstNode.amountOfSpace += 1;
  divIndex = 0;
  nodeIndex = 1;
  divideSelectedNode()
  pushChild()
console.log(firstNode)
  ;(0,_updateStructure_js__WEBPACK_IMPORTED_MODULE_0__.updateNodeStructure)()
}


function addNodeToRight() {
  firstNode.amountOfSpace += 1;
  divIndex = 0;
  nodeIndex = 1;
  divideSelectedNode()
  pushTofirstNode(true)


  ;(0,_updateStructure_js__WEBPACK_IMPORTED_MODULE_0__.updateNodeStructure)()
}

function divideSelectedNode() {
  let hyphen = selectedNode.indexOf('-');
  divIndex = selectedNode.substring(0, hyphen);
  nodeIndex = selectedNode.substring(hyphen + 1, selectedNode.length);
}


function pushTofirstNode(orientation) {
  let pushedNode = nodeElement('new Element', 'black', [emptyElement()], nodeIndex + 1, nodeStructure[divIndex][nodeIndex].indexForParent, divIndex);
  pushToParent(JSON.stringify(pushedNode), orientation)
}


function pushToParent(pushedNode, rightOrientation) {
  let child = (0,_updateStructure_js__WEBPACK_IMPORTED_MODULE_0__.appendArgument)('firstNode', 'children', Number(divIndex));
  if (rightOrientation) {
    eval(`${child}.splice(${nodeIndex} + 1, 0,${pushedNode})`)
  }
  else {
    eval(`${child}.splice(${nodeIndex} , 0,${pushedNode})`)
  }

}


// continue tomorrow
function pushChild() {
  let pushedNode = nodeElement('new Element', 'black', [emptyElement()], nodeStructure[divIndex][nodeIndex].children.length - 1, nodeStructure[divIndex][nodeIndex].indexForSibling, divIndex);
  // let child = appendArgument('firstNode', 'children', Number(divIndex));
  let child = appendElementText()

  let colorOfTheChildren = `${child}.children[0].color`;

  if(eval(colorOfTheChildren)) {
    eval(`${child}.children.push(${JSON.stringify(pushedNode)})`)
  }
  else{
    eval(`${child}.children[0] = ${JSON.stringify(pushedNode)}`)
  }

}


function appendElementText() {
  let elementTextArray = [];

  console.log(`nodeindex:${nodeIndex}`)
  console.log(`divIndex:${divIndex}`)
  for (let index = divIndex; index > -1; index--) {
    if (index == divIndex) {
      let pushedElement = `.children[${nodeStructure[index][nodeIndex].indexForSibling}]`;
      // console.log(pushedElement)
      elementTextArray.unshift(pushedElement)
    }
    else if (index == 0) {
      elementTextArray.unshift('firstNode');
    }
    else {
      let previousElementNodeIndex = elementTextArray[0].substring(elementTextArray[0].indexOf('['), elementTextArray[0].length);
      let parentIndex = Number(nodeStructure[index + 1][Number(previousElementNodeIndex)].indexForParent);
      let pushedElement = `.children[${nodeStructure[index][parentIndex]}]`
      // console.log(pushedElement)
      elementTextArray.unshift(pushedElement)
    }
  }

  return elementTextArray.join('');

}


/***/ }),

/***/ "./input/nodes/editNodes.js":
/*!**********************************!*\
  !*** ./input/nodes/editNodes.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyEditChanges: () => (/* binding */ applyEditChanges)
/* harmony export */ });
function applyEditChanges(){
alert('applyEditChanges Works')


}


/***/ }),

/***/ "./input/nodes/firstNode.js":
/*!**********************************!*\
  !*** ./input/nodes/firstNode.js ***!
  \**********************************/
/***/ (() => {



/***/ }),

/***/ "./input/nodes/nodeStructure.js":
/*!**************************************!*\
  !*** ./input/nodes/nodeStructure.js ***!
  \**************************************/
/***/ (() => {


// empty elements are for displaying purposes only

window.emptyElement = function(text = 'empty', indexForParent = true) {
  return { text, indexForParent }
}


window.nodeElement = function(text = 'empty', color = 'black', children = [emptyElement()], indexForSibling = 0, indexForParent = false, indexForStructure = 0, amountOfSpace = 1) {
  return { text, color, children, indexForSibling, indexForParent, indexForStructure, amountOfSpace }
}

if (localStorage.nodeStructure) {
  window.nodeStructure = JSON.parse(localStorage.nodeStructure.main)
  window.selectedStructure = JSON.parse(localStorage.nodeStructure.selected)
}
else {
  window.firstNode = nodeElement('firstElement', 'black', [nodeElement('secondElement', 'pink'), nodeElement('thirdElement', 'gray')]);
  firstNode.amountOfSpace = 2;
  firstNode.children[0].indexForStructure = 1;
  firstNode.children[1].indexForStructure = 1;
  firstNode.children[1].indexForSibling = 1;
  firstNode.children[0].indexForParent = 0;
  firstNode.children[1].indexForParent = 0;

  window.nodeStructure = [[firstNode], [firstNode.children[0], firstNode.children[1]]];

  window.selectedStructure = nodeStructure;
}












/***/ }),

/***/ "./input/nodes/removeNodes.js":
/*!************************************!*\
  !*** ./input/nodes/removeNodes.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   removeNode: () => (/* binding */ removeNode)
/* harmony export */ });
alert('removeNodes working')
function removeNode(){
alert('removeNode')


}


/***/ }),

/***/ "./input/nodes/selectedNodes.js":
/*!**************************************!*\
  !*** ./input/nodes/selectedNodes.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   changeSelectedNode: () => (/* binding */ changeSelectedNode)
/* harmony export */ });
window.selectedNode = '';

function changeSelectedNode(event) {
  window.selectedNode = event.target.value
  displaySelected();
  displayNodeButtons();
}

function displaySelected() {
  let pTags = document.querySelectorAll('#nodes p');
  for (let pTag of pTags) {
    // console.log(pTag);
    pTag.classList.remove('selected')
    if (pTag.value == selectedNode) {
      pTag.classList.add('selected')
    }
  }
}

function displayNodeButtons() {
  let nodeButtons = document.querySelector('#nodeButtons')
  nodeButtons.style.display = 'flex';
  setTimeout(() => nodeButtons.style.opacity = '1', 50
  )
}



/***/ }),

/***/ "./input/nodes/updateStructure.js":
/*!****************************************!*\
  !*** ./input/nodes/updateStructure.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appendArgument: () => (/* binding */ appendArgument),
/* harmony export */   updateNodeStructure: () => (/* binding */ updateNodeStructure)
/* harmony export */ });
/* harmony import */ var _displayContentInhtml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../displayContentInhtml */ "./input/displayContentInhtml.js");


let children = 0;
let amountOfSpace = 1;
let siblingIndex = 0;
let newArray = [[]];
let previousNode = '';


// update Node Structure Functionality


function updateNodeStructure() {
  children = 0;
  amountOfSpace = 1;
  siblingIndex = 0;
  previousNode = 'firstNode';
  newArray = [[firstNode]];


  iterateThroughChildrenToUpdateIndex(firstNode)
  updateAmountOfSpace()
  nodeStructure = newArray;
  selectedStructure = nodeStructure;
  (0,_displayContentInhtml__WEBPACK_IMPORTED_MODULE_0__.displayElements)()
}






// in the moment this works but don't be surprised if you have to fix it in the future
function iterateThroughChildrenToUpdateIndex(node) {
  // this is a recursive method that does the following:

  // 1 from top to bottom try to reach the empty element
  // 2. check if last element has siblings, if not.. come back to the previous children with siblings
  // 3. find previous children with sibling and repeat top to bottom procress until it reaches to empty element
  // (also updates information such as indexForParent,indexForSibling,IndexForStructure)

  if (node.children[0].color) {

    updateInformationForCurrentNode(node)
    updateArray(node)

    children = children + 1;


    let child = appendArgument(`${previousNode}`, `children[${siblingIndex}]`, 1)
    previousNode = child;

    iterateThroughChildrenToUpdateIndex(eval(child))
  }
  else {
    amountOfSpace += 1;
    siblingIndex += 1;
    findSibling(node)
  }
}


function updateArray(node) {
  //creates new array in case of inexisting array;
  if (!newArray[children + 1]) {
    newArray[children + 1] = []
  }
  // it doesn't update the first node because it is always 'first node'
  newArray[children + 1][siblingIndex] = eval(appendArgument(`${previousNode}`, `children[${siblingIndex}]`, 1));

}





function updateInformationForCurrentNode() {
  let node = eval(appendArgument(`${previousNode}`, `children[${siblingIndex}]`, 1));

  // update index for parent
  if (node.indexForParent) {
    node.indexForParent = newArray[children + 1][siblingIndex].indexForSibling
  }

  // update index for sibling 
  node.indexForSibling = siblingIndex;
  // update index for sibling 
  node.indexForStructure = children + 1;

}





function appendArgument(variableToAppend, appendedVariable, numberOfTimes) {
  let array = [`${variableToAppend}`]
  for (let index = 0; index < numberOfTimes; index++) {
    array.push(`.${appendedVariable}`)
  }
  return array.join('')

}






function findSibling(node) {
  // 2. check if last element has siblings, if not.. come back to the previous children with siblings

console.log(previousNode)
  let nodeWithoutPreviousSibling = previousNode.substring(0, previousNode.length - 3);

  let nodeWithUpdatedSibling = `${nodeWithoutPreviousSibling}[${siblingIndex}]`;

  let arrayWithoutTheLastChildren = nodeWithoutPreviousSibling.split('.')
  children -= 1;
  arrayWithoutTheLastChildren.pop()
  arrayWithoutTheLastChildren = arrayWithoutTheLastChildren.join('.')

  if (eval(nodeWithUpdatedSibling)) {

    previousNode = arrayWithoutTheLastChildren;

    iterateThroughChildrenToUpdateIndex(eval(arrayWithoutTheLastChildren))
  }
  else {
    if (amountOfSpace < firstNode.amountOfSpace) {
      let previousSplitted = previousNode.split('.');
      previousSplitted.pop()
      previousNode = previousSplitted.join('.')
      findSibling()

    }
  }
}






function updateAmountOfSpace() {
  removeAmountOfSpaceToArray()
  addAmountOfSpaceToArray()
}

function removeAmountOfSpaceToArray() {
  for (let subArray = newArray.length - 1; subArray > -1; subArray = subArray - 1) {
    for (let index2 = 0; index2 < newArray[subArray].length; index2++) {
      let node = newArray[subArray][index2];
      node.amountOfSpace = 0;
    }
  }
}

function addAmountOfSpaceToArray() {
  for (let subArray = newArray.length - 1; subArray > -1; subArray = subArray - 1) {
    for (let index2 = 0; index2 < newArray[subArray].length; index2++) {
      let node = newArray[subArray][index2];
      node.amountOfSpace = node.children.length;
      if (node.children[0].amountOfSpace) {
        node.amountOfSpace = getChildrenAmountOfSpace(node)
      }
    }
  }
}


function getChildrenAmountOfSpace(node) {
  let amountOfSpace = 0;
  for (let index3 in node.children) {
    let children = node.children[index3];
    amountOfSpace = amountOfSpace + children.amountOfSpace
  }
  return amountOfSpace
}


/***/ }),

/***/ "./input/windows/currentWindow.js":
/*!****************************************!*\
  !*** ./input/windows/currentWindow.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeWindow: () => (/* binding */ closeWindow),
/* harmony export */   currentWindow: () => (/* binding */ currentWindow),
/* harmony export */   displayWindow: () => (/* binding */ displayWindow),
/* harmony export */   displayWindowError: () => (/* binding */ displayWindowError)
/* harmony export */ });
/* harmony import */ var _style_windows_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../style/windows.css */ "./input/style/windows.css");


window.windowProperties = {isWindowNotOpen: true,}

let  currentWindow = document.querySelector('#currentWindow');

function closeWindow(){
currentWindow.style.display = 'none';
currentWindow.innerHTML = '';
windowProperties.isWindowNotOpen = true;
}

function  displayWindow(){
currentWindow.style.display = 'flex';
}

const errorContainer = document.querySelector('header div');

function displayWindowError(){
errorContainer.innerText = `can't open 2 windows`;
setTimeout(makeItVisible,100)
}

function makeItVisible(){
errorContainer.style.opacity = '1'
setTimeout(makeItInvisible, 4000)
}


function makeItInvisible(){
errorContainer.style.opacity = '0'
}




/***/ }),

/***/ "./input/windows/nodeWindows/createNodes.js":
/*!**************************************************!*\
  !*** ./input/windows/nodeWindows/createNodes.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateWindowForCreateNodesButton: () => (/* binding */ generateWindowForCreateNodesButton)
/* harmony export */ });
/* harmony import */ var _currentWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../currentWindow.js */ "./input/windows/currentWindow.js");
/* harmony import */ var _nodes_createNodes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../nodes/createNodes.js */ "./input/nodes/createNodes.js");




function generateWindowForCreateNodesButton() {
  if(windowProperties.isWindowNotOpen) {


if(selectedNode[0] == '0'){
    _currentWindow_js__WEBPACK_IMPORTED_MODULE_0__.currentWindow.innerHTML = `<button id='closeWindow'>close</button>
    <div>
    <button id="addNodeChild">add child</button>
    </div>`;
    }
    else{

    _currentWindow_js__WEBPACK_IMPORTED_MODULE_0__.currentWindow.innerHTML = `<button id='closeWindow'>close</button>
    <div>
    <button id="addNodeToTheLeft">left</button>
    <button id="addNodeChild">add child</button>
    <button id="addNodeToTheRight">right</button>
    </div>`;

    document.querySelector('#addNodeToTheLeft').addEventListener('click', _nodes_createNodes_js__WEBPACK_IMPORTED_MODULE_1__.addNodeToLeft);
    document.querySelector('#addNodeToTheRight').addEventListener('click', _nodes_createNodes_js__WEBPACK_IMPORTED_MODULE_1__.addNodeToRight);
    }




    document.querySelector('#closeWindow').addEventListener('click', _currentWindow_js__WEBPACK_IMPORTED_MODULE_0__.closeWindow);
    document.querySelector('#addNodeChild').addEventListener('click', _nodes_createNodes_js__WEBPACK_IMPORTED_MODULE_1__.addNodeChild);

    windowProperties.isWindowNotOpen = false;
    (0,_currentWindow_js__WEBPACK_IMPORTED_MODULE_0__.displayWindow)();
  }
  else{
  (0,_currentWindow_js__WEBPACK_IMPORTED_MODULE_0__.displayWindowError)()
  }
}


/***/ }),

/***/ "./input/windows/nodeWindows/editNodes.js":
/*!************************************************!*\
  !*** ./input/windows/nodeWindows/editNodes.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateWindowForEditNodesButton: () => (/* binding */ generateWindowForEditNodesButton)
/* harmony export */ });
/* harmony import */ var _currentWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../currentWindow.js */ "./input/windows/currentWindow.js");
/* harmony import */ var _nodes_editNodes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../nodes/editNodes.js */ "./input/nodes/editNodes.js");



function generateWindowForEditNodesButton() {

  if (windowProperties.isWindowNotOpen) {
    alert('generateWindowForEditNodesButton')

    _currentWindow_js__WEBPACK_IMPORTED_MODULE_0__.currentWindow.innerHTML = `<button id='closeWindow'>close</button>
    <p>text:</p>
    <input type="text">
    <p>color:</p>
    <input type="color" id="">
    <button id='applyEditChanges'>apply</button>`;

    document.querySelector('#closeWindow').addEventListener('click', _currentWindow_js__WEBPACK_IMPORTED_MODULE_0__.closeWindow);
    document.querySelector('#applyEditChanges').addEventListener('click', _nodes_editNodes_js__WEBPACK_IMPORTED_MODULE_1__.applyEditChanges);

    windowProperties.isWindowNotOpen = false;
    (0,_currentWindow_js__WEBPACK_IMPORTED_MODULE_0__.displayWindow)();
  }
  else{
  (0,_currentWindow_js__WEBPACK_IMPORTED_MODULE_0__.displayWindowError)()
  }
}



/***/ }),

/***/ "./input/windows/nodeWindows/firstNode.js":
/*!************************************************!*\
  !*** ./input/windows/nodeWindows/firstNode.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateWindowForFirstNodeButton: () => (/* binding */ generateWindowForFirstNodeButton)
/* harmony export */ });
/* harmony import */ var _currentWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../currentWindow.js */ "./input/windows/currentWindow.js");
/* harmony import */ var _nodes_firstNode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../nodes/firstNode.js */ "./input/nodes/firstNode.js");
/* harmony import */ var _nodes_firstNode_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nodes_firstNode_js__WEBPACK_IMPORTED_MODULE_1__);





function generateWindowForFirstNodeButton() {


  if (windowProperties.isWindowNotOpen) {
    _currentWindow_js__WEBPACK_IMPORTED_MODULE_0__.currentWindow.innerHTML = `<button id='closeWindow'>close</button>
    <p>First Node</p>
    <select name="" id="">
    </select>
    <button id="applyFirstNodeFunc">apply</button>`;

    appendNodesFromNodeStructure()
    document.querySelector('#closeWindow').addEventListener('click', _currentWindow_js__WEBPACK_IMPORTED_MODULE_0__.closeWindow);
    document.querySelector('#applyFirstNodeFunc').addEventListener('click', _nodes_firstNode_js__WEBPACK_IMPORTED_MODULE_1__.applyFirstNodeFunc);

    windowProperties.isWindowNotOpen = false;
    (0,_currentWindow_js__WEBPACK_IMPORTED_MODULE_0__.displayWindow)();
  }
  else {
    (0,_currentWindow_js__WEBPACK_IMPORTED_MODULE_0__.displayWindowError)()
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


/***/ }),

/***/ "./input/windows/nodeWindows/removeNodes.js":
/*!**************************************************!*\
  !*** ./input/windows/nodeWindows/removeNodes.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateWindowForRemoveNodesButton: () => (/* binding */ generateWindowForRemoveNodesButton)
/* harmony export */ });
/* harmony import */ var _currentWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../currentWindow.js */ "./input/windows/currentWindow.js");
/* harmony import */ var _nodes_removeNodes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../nodes/removeNodes.js */ "./input/nodes/removeNodes.js");


function generateWindowForRemoveNodesButton() {

  if (windowProperties.isWindowNotOpen) {
    _currentWindow_js__WEBPACK_IMPORTED_MODULE_0__.currentWindow.innerHTML = `<p>are you sure you want to delete this?</p>
    <div><button id='acceptDelete'>yes</button><button id='denyDelete'>no</button></div>`;

    document.querySelector('#acceptDelete').addEventListener('click', _nodes_removeNodes_js__WEBPACK_IMPORTED_MODULE_1__.removeNode);
    document.querySelector('#denyDelete').addEventListener('click', _currentWindow_js__WEBPACK_IMPORTED_MODULE_0__.closeWindow );

    windowProperties.isWindowNotOpen = false;
    (0,_currentWindow_js__WEBPACK_IMPORTED_MODULE_0__.displayWindow)()
  }
  else{
  (0,_currentWindow_js__WEBPACK_IMPORTED_MODULE_0__.displayWindowError)()
  }
}




/***/ }),

/***/ "./input/windows/structureWindows/exportStructure.js":
/*!***********************************************************!*\
  !*** ./input/windows/structureWindows/exportStructure.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateWindowForExportStructureButton: () => (/* binding */ generateWindowForExportStructureButton)
/* harmony export */ });
function generateWindowForExportStructureButton(){
alert('generateWindowForExportStructureButton')


}


/***/ }),

/***/ "./input/windows/structureWindows/importStructure.js":
/*!***********************************************************!*\
  !*** ./input/windows/structureWindows/importStructure.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateWindowForImportStructureButton: () => (/* binding */ generateWindowForImportStructureButton)
/* harmony export */ });

function generateWindowForImportStructureButton(){
alert('generateWindowForImportStructureButton')
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./input/style/main.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./input/style/main.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `*{
padding: 0;
margin: 0;
box-sizing:border-box;
}


:root{
--white:white;
--black:black;
--yellow:#EA9B0E;
}

/* repetitive section */
header, #buttons{
display:flex;


}


body{
background-color: var(--black);
color: var(--white);
}

header{
position:relative;
border-bottom:2px solid var(--white);
justify-content:center;
align-items:center;
}

/* error container */
header div{
position: absolute;
right:0;
opacity: 0;
transition:opacity 2s;
}




main{
position:relative;
}

button{
background-color: var(--black);
color: var(--white);
border: 2px solid var(--white);
transition:all 500ms;
padding:0.8vw;
border-radius:10px;
}

button:hover{
background-color: var(--white);
color: var(--black);
border: 2px solid var(--black);
 
}

#buttons{
  top:2vh;
  width:100%;
  position:absolute;
  justify-content: space-between;
}

#nodeButtons{
display: none;
opacity: 0;
gap:0.5vw;
transition: opacity 2s;
}

.selected{
outline:2px solid var(--yellow)

}



`, "",{"version":3,"sources":["webpack://./input/style/main.css"],"names":[],"mappings":"AAAA;AACA,UAAU;AACV,SAAS;AACT,qBAAqB;AACrB;;;AAGA;AACA,aAAa;AACb,aAAa;AACb,gBAAgB;AAChB;;AAEA,uBAAuB;AACvB;AACA,YAAY;;;AAGZ;;;AAGA;AACA,8BAA8B;AAC9B,mBAAmB;AACnB;;AAEA;AACA,iBAAiB;AACjB,oCAAoC;AACpC,sBAAsB;AACtB,kBAAkB;AAClB;;AAEA,oBAAoB;AACpB;AACA,kBAAkB;AAClB,OAAO;AACP,UAAU;AACV,qBAAqB;AACrB;;;;;AAKA;AACA,iBAAiB;AACjB;;AAEA;AACA,8BAA8B;AAC9B,mBAAmB;AACnB,8BAA8B;AAC9B,oBAAoB;AACpB,aAAa;AACb,kBAAkB;AAClB;;AAEA;AACA,8BAA8B;AAC9B,mBAAmB;AACnB,8BAA8B;;AAE9B;;AAEA;EACE,OAAO;EACP,UAAU;EACV,iBAAiB;EACjB,8BAA8B;AAChC;;AAEA;AACA,aAAa;AACb,UAAU;AACV,SAAS;AACT,sBAAsB;AACtB;;AAEA;AACA;;AAEA","sourcesContent":["*{\npadding: 0;\nmargin: 0;\nbox-sizing:border-box;\n}\n\n\n:root{\n--white:white;\n--black:black;\n--yellow:#EA9B0E;\n}\n\n/* repetitive section */\nheader, #buttons{\ndisplay:flex;\n\n\n}\n\n\nbody{\nbackground-color: var(--black);\ncolor: var(--white);\n}\n\nheader{\nposition:relative;\nborder-bottom:2px solid var(--white);\njustify-content:center;\nalign-items:center;\n}\n\n/* error container */\nheader div{\nposition: absolute;\nright:0;\nopacity: 0;\ntransition:opacity 2s;\n}\n\n\n\n\nmain{\nposition:relative;\n}\n\nbutton{\nbackground-color: var(--black);\ncolor: var(--white);\nborder: 2px solid var(--white);\ntransition:all 500ms;\npadding:0.8vw;\nborder-radius:10px;\n}\n\nbutton:hover{\nbackground-color: var(--white);\ncolor: var(--black);\nborder: 2px solid var(--black);\n \n}\n\n#buttons{\n  top:2vh;\n  width:100%;\n  position:absolute;\n  justify-content: space-between;\n}\n\n#nodeButtons{\ndisplay: none;\nopacity: 0;\ngap:0.5vw;\ntransition: opacity 2s;\n}\n\n.selected{\noutline:2px solid var(--yellow)\n\n}\n\n\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./input/style/node/node.css":
/*!*************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./input/style/node/node.css ***!
  \*************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#nodes{
padding-top:12vh;
display: grid;
}

#nodes > div{
display: grid;
align-items:center;
justify-items:center;
} 

#nodes p{
width:15vw;
height:3vw;
font-size:1.2vw;
text-align:center;
display:flex;
justify-content:center;
align-items:center;
border-radius: 10px;
}
`, "",{"version":3,"sources":["webpack://./input/style/node/node.css"],"names":[],"mappings":"AAAA;AACA,gBAAgB;AAChB,aAAa;AACb;;AAEA;AACA,aAAa;AACb,kBAAkB;AAClB,oBAAoB;AACpB;;AAEA;AACA,UAAU;AACV,UAAU;AACV,eAAe;AACf,iBAAiB;AACjB,YAAY;AACZ,sBAAsB;AACtB,kBAAkB;AAClB,mBAAmB;AACnB","sourcesContent":["#nodes{\npadding-top:12vh;\ndisplay: grid;\n}\n\n#nodes > div{\ndisplay: grid;\nalign-items:center;\njustify-items:center;\n} \n\n#nodes p{\nwidth:15vw;\nheight:3vw;\nfont-size:1.2vw;\ntext-align:center;\ndisplay:flex;\njustify-content:center;\nalign-items:center;\nborder-radius: 10px;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./input/style/windows.css":
/*!***********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./input/style/windows.css ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#currentWindow{
display: none;
/* display:flex; */
background-color: var(--black);
position:fixed;
flex-direction:column;
gap:20px;
justify-content:center;
align-items:center;
border: 2px solid var(--white);
border-radius:20px;
padding:5vw;

left:50vw;
top:50vh;
transform:translate(-50%,-50%);
z-index: 1;
}
`, "",{"version":3,"sources":["webpack://./input/style/windows.css"],"names":[],"mappings":"AAAA;AACA,aAAa;AACb,kBAAkB;AAClB,8BAA8B;AAC9B,cAAc;AACd,qBAAqB;AACrB,QAAQ;AACR,sBAAsB;AACtB,kBAAkB;AAClB,8BAA8B;AAC9B,kBAAkB;AAClB,WAAW;;AAEX,SAAS;AACT,QAAQ;AACR,8BAA8B;AAC9B,UAAU;AACV","sourcesContent":["#currentWindow{\ndisplay: none;\n/* display:flex; */\nbackground-color: var(--black);\nposition:fixed;\nflex-direction:column;\ngap:20px;\njustify-content:center;\nalign-items:center;\nborder: 2px solid var(--white);\nborder-radius:20px;\npadding:5vw;\n\nleft:50vw;\ntop:50vh;\ntransform:translate(-50%,-50%);\nz-index: 1;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./input/style/main.css":
/*!******************************!*\
  !*** ./input/style/main.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./main.css */ "./node_modules/css-loader/dist/cjs.js!./input/style/main.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./input/style/node/node.css":
/*!***********************************!*\
  !*** ./input/style/node/node.css ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./node.css */ "./node_modules/css-loader/dist/cjs.js!./input/style/node/node.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./input/style/windows.css":
/*!*********************************!*\
  !*** ./input/style/windows.css ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_windows_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./windows.css */ "./node_modules/css-loader/dist/cjs.js!./input/style/windows.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_windows_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_windows_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_windows_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_windows_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**************************!*\
  !*** ./input/buttons.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/main.css */ "./input/style/main.css");
/* harmony import */ var _nodes_nodeStructure_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nodes/nodeStructure.js */ "./input/nodes/nodeStructure.js");
/* harmony import */ var _nodes_nodeStructure_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nodes_nodeStructure_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _displayContentInhtml_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./displayContentInhtml.js */ "./input/displayContentInhtml.js");
/* harmony import */ var _windows_nodeWindows_createNodes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./windows/nodeWindows/createNodes.js */ "./input/windows/nodeWindows/createNodes.js");
/* harmony import */ var _windows_nodeWindows_removeNodes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./windows/nodeWindows/removeNodes.js */ "./input/windows/nodeWindows/removeNodes.js");
/* harmony import */ var _windows_nodeWindows_editNodes_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./windows/nodeWindows/editNodes.js */ "./input/windows/nodeWindows/editNodes.js");
/* harmony import */ var _windows_nodeWindows_firstNode_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./windows/nodeWindows/firstNode.js */ "./input/windows/nodeWindows/firstNode.js");
/* harmony import */ var _windows_structureWindows_importStructure_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./windows/structureWindows/importStructure.js */ "./input/windows/structureWindows/importStructure.js");
/* harmony import */ var _windows_structureWindows_exportStructure_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./windows/structureWindows/exportStructure.js */ "./input/windows/structureWindows/exportStructure.js");




// functionality for node buttons from the left part of the screen





// functionality for structure buttons from the right part of the screen





// adding event listeners to node buttons from the left
const nodeBtnId = '#nodeButtons'

const createNodeBtn = document.querySelector(`${nodeBtnId} button:first-of-type`)
createNodeBtn.addEventListener('click', _windows_nodeWindows_createNodes_js__WEBPACK_IMPORTED_MODULE_3__.generateWindowForCreateNodesButton)

const removeNodeBtn = document.querySelector(`${nodeBtnId} button:nth-of-type(2)`)
removeNodeBtn.addEventListener('click', _windows_nodeWindows_removeNodes_js__WEBPACK_IMPORTED_MODULE_4__.generateWindowForRemoveNodesButton)

const editNodeBtn = document.querySelector(`${nodeBtnId} button:nth-of-type(3)`)
editNodeBtn.addEventListener('click', _windows_nodeWindows_editNodes_js__WEBPACK_IMPORTED_MODULE_5__.generateWindowForEditNodesButton)

const firstNodeBtn = document.querySelector(`${nodeBtnId} button:last-of-type`)
firstNodeBtn.addEventListener('click', _windows_nodeWindows_firstNode_js__WEBPACK_IMPORTED_MODULE_6__.generateWindowForFirstNodeButton)




// adding event listeners to structure buttons from the right 
const structureBtnId = '#structureButtons'

const importStructureBtn = document.querySelector(`${structureBtnId} button:first-of-type`)
importStructureBtn.addEventListener('click', _windows_structureWindows_importStructure_js__WEBPACK_IMPORTED_MODULE_7__.generateWindowForImportStructureButton)

const exportStructureBtn = document.querySelector(`${structureBtnId} button:last-of-type`)
exportStructureBtn.addEventListener('click', _windows_structureWindows_exportStructure_js__WEBPACK_IMPORTED_MODULE_8__.generateWindowForExportStructureButton)

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi01MGM0MWQxOGEwZmEyNzkxYWU5MS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQStCO0FBQzZCOzs7QUFHNUQ7QUFDQTtBQUNBOztBQUVBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsR0FBRztBQUNIOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVMsb0JBQW9CO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLEtBQUs7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLG9DQUFvQztBQUNuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHVCQUF1QixHQUFHLHFCQUFxQjtBQUN6RSx5Q0FBeUMsdUVBQWtCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BHMEU7OztBQUcxRTtBQUNBOzs7QUFHTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsRUFBRSx5RUFBbUI7QUFDckI7OztBQUdPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSx5RUFBbUI7QUFDckI7OztBQUdPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsRUFBRSx5RUFBbUI7QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0EsY0FBYyxtRUFBYztBQUM1QjtBQUNBLFlBQVksTUFBTSxVQUFVLFdBQVcsU0FBUyxXQUFXO0FBQzNEO0FBQ0E7QUFDQSxZQUFZLE1BQU0sVUFBVSxXQUFXLE1BQU0sV0FBVztBQUN4RDs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4QkFBOEIsTUFBTTs7QUFFcEM7QUFDQSxZQUFZLE1BQU0saUJBQWlCLDJCQUEyQjtBQUM5RDtBQUNBO0FBQ0EsWUFBWSxNQUFNLGlCQUFpQiwyQkFBMkI7QUFDOUQ7O0FBRUE7OztBQUdBO0FBQ0E7O0FBRUEsMkJBQTJCLFVBQVU7QUFDckMsMEJBQTBCLFNBQVM7QUFDbkMsNkJBQTZCLFlBQVk7QUFDekM7QUFDQSx1Q0FBdUMsZ0RBQWdEO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxrQ0FBa0M7QUFDekU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1R087QUFDUDs7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIQTs7QUFFQTtBQUNBLFdBQVc7QUFDWDs7O0FBR0E7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUJBO0FBQ087QUFDUDs7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hCMEQ7O0FBRTFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOzs7QUFHTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxzRUFBZTtBQUNqQjs7Ozs7OztBQU9BO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOzs7QUFHQSxrQ0FBa0MsYUFBYSxlQUFlLGFBQWE7QUFDM0U7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLGFBQWEsZUFBZSxhQUFhOztBQUV6Rzs7Ozs7O0FBTUE7QUFDQSxvQ0FBb0MsYUFBYSxlQUFlLGFBQWE7O0FBRTdFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7QUFNTztBQUNQLGtCQUFrQixpQkFBaUI7QUFDbkMsc0JBQXNCLHVCQUF1QjtBQUM3QyxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7O0FBRUE7Ozs7Ozs7QUFPQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsa0NBQWtDLDJCQUEyQixHQUFHLGFBQWE7O0FBRTdFO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQ0FBMkMsZUFBZTtBQUMxRCx5QkFBeUIsb0NBQW9DO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQ0FBMkMsZUFBZTtBQUMxRCx5QkFBeUIsb0NBQW9DO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEwrQjs7QUFFL0IsMkJBQTJCOztBQUVwQjs7QUFFQTtBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9CcUc7QUFDWDs7O0FBR25GO0FBQ1A7OztBQUdBO0FBQ0EsSUFBSSw0REFBYTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUksNERBQWE7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwRUFBMEUsZ0VBQWE7QUFDdkYsMkVBQTJFLGlFQUFjO0FBQ3pGOzs7OztBQUtBLHFFQUFxRSwwREFBVztBQUNoRixzRUFBc0UsK0RBQVk7O0FBRWxGO0FBQ0EsSUFBSSxnRUFBYTtBQUNqQjtBQUNBO0FBQ0EsRUFBRSxxRUFBa0I7QUFDcEI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkNxRztBQUN6Qzs7QUFFckQ7O0FBRVA7QUFDQTs7QUFFQSxJQUFJLDREQUFhO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUVBQXFFLDBEQUFXO0FBQ2hGLDBFQUEwRSxpRUFBZ0I7O0FBRTFGO0FBQ0EsSUFBSSxnRUFBYTtBQUNqQjtBQUNBO0FBQ0EsRUFBRSxxRUFBa0I7QUFDcEI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4QnNHO0FBQ3RDOzs7O0FBSXpEOzs7QUFHUDtBQUNBLElBQUksNERBQWE7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxRUFBcUUsMERBQVc7QUFDaEYsNEVBQTRFLG1FQUFrQjs7QUFFOUY7QUFDQSxJQUFJLGdFQUFhO0FBQ2pCO0FBQ0E7QUFDQSxJQUFJLHFFQUFrQjtBQUN0Qjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHVCQUF1QixHQUFHLHFCQUFxQjtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaERvRztBQUMzQztBQUNsRDs7QUFFUDtBQUNBLElBQUksNERBQWE7QUFDakI7O0FBRUEsc0VBQXNFLDZEQUFVO0FBQ2hGLG9FQUFvRSwwREFBVzs7QUFFL0U7QUFDQSxJQUFJLGdFQUFhO0FBQ2pCO0FBQ0E7QUFDQSxFQUFFLHFFQUFrQjtBQUNwQjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQk87QUFDUDs7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSE87QUFDUDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0hBO0FBQzZHO0FBQ2pCO0FBQzVGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7O0FBSUEsT0FBTyx1RkFBdUYsVUFBVSxVQUFVLFlBQVksUUFBUSxLQUFLLFVBQVUsVUFBVSxZQUFZLE9BQU8sWUFBWSxNQUFNLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLFlBQVksTUFBTSxZQUFZLFdBQVcsVUFBVSxZQUFZLFVBQVUsS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGNBQWMsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLE1BQU0sMkJBQTJCLGFBQWEsWUFBWSx3QkFBd0IsR0FBRyxZQUFZLGdCQUFnQixnQkFBZ0IsbUJBQW1CLEdBQUcsK0NBQStDLGVBQWUsT0FBTyxXQUFXLGlDQUFpQyxzQkFBc0IsR0FBRyxXQUFXLG9CQUFvQix1Q0FBdUMseUJBQXlCLHFCQUFxQixHQUFHLHNDQUFzQyxxQkFBcUIsVUFBVSxhQUFhLHdCQUF3QixHQUFHLGVBQWUsb0JBQW9CLEdBQUcsV0FBVyxpQ0FBaUMsc0JBQXNCLGlDQUFpQyx1QkFBdUIsZ0JBQWdCLHFCQUFxQixHQUFHLGlCQUFpQixpQ0FBaUMsc0JBQXNCLGlDQUFpQyxNQUFNLGFBQWEsWUFBWSxlQUFlLHNCQUFzQixtQ0FBbUMsR0FBRyxpQkFBaUIsZ0JBQWdCLGFBQWEsWUFBWSx5QkFBeUIsR0FBRyxjQUFjLHNDQUFzQywyQkFBMkI7QUFDOXREO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUZ2QztBQUNnSDtBQUNqQjtBQUMvRiw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sNEZBQTRGLFlBQVksV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxpQ0FBaUMsbUJBQW1CLGdCQUFnQixHQUFHLGlCQUFpQixnQkFBZ0IscUJBQXFCLHVCQUF1QixJQUFJLGFBQWEsYUFBYSxhQUFhLGtCQUFrQixvQkFBb0IsZUFBZSx5QkFBeUIscUJBQXFCLHNCQUFzQixHQUFHLHFCQUFxQjtBQUMvbEI7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1QnZDO0FBQzZHO0FBQ2pCO0FBQzVGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Y7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTywwRkFBMEYsVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxZQUFZLFVBQVUsVUFBVSxZQUFZLFdBQVcsd0NBQXdDLGdCQUFnQixtQkFBbUIsbUNBQW1DLGlCQUFpQix3QkFBd0IsV0FBVyx5QkFBeUIscUJBQXFCLGlDQUFpQyxxQkFBcUIsY0FBYyxjQUFjLFdBQVcsaUNBQWlDLGFBQWEsR0FBRyxxQkFBcUI7QUFDbm9CO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7OztBQ3pCMUI7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQSxxRkFBcUY7QUFDckY7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGlCQUFpQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIscUJBQXFCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNGQUFzRixxQkFBcUI7QUFDM0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLGlEQUFpRCxxQkFBcUI7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNEQUFzRCxxQkFBcUI7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNwRmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxjQUFjO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZEEsTUFBa0c7QUFDbEcsTUFBd0Y7QUFDeEYsTUFBK0Y7QUFDL0YsTUFBa0g7QUFDbEgsTUFBMkc7QUFDM0csTUFBMkc7QUFDM0csTUFBcUc7QUFDckc7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyxxRkFBTzs7OztBQUkrQztBQUN2RSxPQUFPLGlFQUFlLHFGQUFPLElBQUkscUZBQU8sVUFBVSxxRkFBTyxtQkFBbUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekI3RSxNQUFxRztBQUNyRyxNQUEyRjtBQUMzRixNQUFrRztBQUNsRyxNQUFxSDtBQUNySCxNQUE4RztBQUM5RyxNQUE4RztBQUM5RyxNQUF3RztBQUN4RztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHFGQUFPOzs7O0FBSWtEO0FBQzFFLE9BQU8saUVBQWUscUZBQU8sSUFBSSxxRkFBTyxVQUFVLHFGQUFPLG1CQUFtQixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QjdFLE1BQWtHO0FBQ2xHLE1BQXdGO0FBQ3hGLE1BQStGO0FBQy9GLE1BQWtIO0FBQ2xILE1BQTJHO0FBQzNHLE1BQTJHO0FBQzNHLE1BQXdHO0FBQ3hHO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMsd0ZBQU87Ozs7QUFJa0Q7QUFDMUUsT0FBTyxpRUFBZSx3RkFBTyxJQUFJLHdGQUFPLFVBQVUsd0ZBQU8sbUJBQW1CLEVBQUM7Ozs7Ozs7Ozs7OztBQzFCaEU7O0FBRWI7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHdCQUF3QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw2QkFBNkI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDbkZhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNqQ2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0EsY0FBYyxLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRjtBQUNqRjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM1RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQ2JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQXlCO0FBQ1E7QUFDQzs7QUFFbEM7QUFDMEY7QUFDQTtBQUNKO0FBQ0E7O0FBRXRGO0FBQ3VHO0FBQ0E7Ozs7QUFJdkc7QUFDQTs7QUFFQSxnREFBZ0QsV0FBVztBQUMzRCx3Q0FBd0MsbUdBQWtDOztBQUUxRSxnREFBZ0QsV0FBVztBQUMzRCx3Q0FBd0MsbUdBQWtDOztBQUUxRSw4Q0FBOEMsV0FBVztBQUN6RCxzQ0FBc0MsK0ZBQWdDOztBQUV0RSwrQ0FBK0MsV0FBVztBQUMxRCx1Q0FBdUMsK0ZBQWdDOzs7OztBQUt2RTtBQUNBOztBQUVBLHFEQUFxRCxnQkFBZ0I7QUFDckUsNkNBQTZDLGdIQUFzQzs7QUFFbkYscURBQXFELGdCQUFnQjtBQUNyRSw2Q0FBNkMsZ0hBQXNDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RydWN0dXJvLy4vaW5wdXQvZGlzcGxheUNvbnRlbnRJbmh0bWwuanMiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvLy4vaW5wdXQvbm9kZXMvY3JlYXRlTm9kZXMuanMiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvLy4vaW5wdXQvbm9kZXMvZWRpdE5vZGVzLmpzIiwid2VicGFjazovL3N0cnVjdHVyby8uL2lucHV0L25vZGVzL25vZGVTdHJ1Y3R1cmUuanMiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvLy4vaW5wdXQvbm9kZXMvcmVtb3ZlTm9kZXMuanMiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvLy4vaW5wdXQvbm9kZXMvc2VsZWN0ZWROb2Rlcy5qcyIsIndlYnBhY2s6Ly9zdHJ1Y3R1cm8vLi9pbnB1dC9ub2Rlcy91cGRhdGVTdHJ1Y3R1cmUuanMiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvLy4vaW5wdXQvd2luZG93cy9jdXJyZW50V2luZG93LmpzIiwid2VicGFjazovL3N0cnVjdHVyby8uL2lucHV0L3dpbmRvd3Mvbm9kZVdpbmRvd3MvY3JlYXRlTm9kZXMuanMiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvLy4vaW5wdXQvd2luZG93cy9ub2RlV2luZG93cy9lZGl0Tm9kZXMuanMiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvLy4vaW5wdXQvd2luZG93cy9ub2RlV2luZG93cy9maXJzdE5vZGUuanMiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvLy4vaW5wdXQvd2luZG93cy9ub2RlV2luZG93cy9yZW1vdmVOb2Rlcy5qcyIsIndlYnBhY2s6Ly9zdHJ1Y3R1cm8vLi9pbnB1dC93aW5kb3dzL3N0cnVjdHVyZVdpbmRvd3MvZXhwb3J0U3RydWN0dXJlLmpzIiwid2VicGFjazovL3N0cnVjdHVyby8uL2lucHV0L3dpbmRvd3Mvc3RydWN0dXJlV2luZG93cy9pbXBvcnRTdHJ1Y3R1cmUuanMiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvLy4vaW5wdXQvc3R5bGUvbWFpbi5jc3MiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvLy4vaW5wdXQvc3R5bGUvbm9kZS9ub2RlLmNzcyIsIndlYnBhY2s6Ly9zdHJ1Y3R1cm8vLi9pbnB1dC9zdHlsZS93aW5kb3dzLmNzcyIsIndlYnBhY2s6Ly9zdHJ1Y3R1cm8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3N0cnVjdHVyby8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3N0cnVjdHVyby8uL2lucHV0L3N0eWxlL21haW4uY3NzP2FiNTYiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvLy4vaW5wdXQvc3R5bGUvbm9kZS9ub2RlLmNzcz84NGYwIiwid2VicGFjazovL3N0cnVjdHVyby8uL2lucHV0L3N0eWxlL3dpbmRvd3MuY3NzPzczMmMiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3N0cnVjdHVyby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3N0cnVjdHVyby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9zdHJ1Y3R1cm8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9zdHJ1Y3R1cm8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9zdHJ1Y3R1cm8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3N0cnVjdHVyby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9zdHJ1Y3R1cm8vLi9pbnB1dC9idXR0b25zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi9zdHlsZS9ub2RlL25vZGUuY3NzJztcbmltcG9ydCB7Y2hhbmdlU2VsZWN0ZWROb2RlfSBmcm9tICcuL25vZGVzL3NlbGVjdGVkTm9kZXMuanMnO1xuXG5cbmxldCBub2RlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25vZGVzJylcbndpbmRvdy5ub2RlU2l6ZUZvckNvbHVtblRlbXBsYXRlID0gW107XG53aW5kb3cubm9kZVNpemUgPSBbXTtcblxuZGlzcGxheUVsZW1lbnRzKClcblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlFbGVtZW50cygpIHtcbiAgbm9kZUNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgY2FsY3VsYXRlU3BhY2VJbnNpZGVTdHJ1Y3R1cmVBcnJheSgpXG4gIGNhbGN1bGF0ZVNpemVGb3JEaXNwbGF5KClcbiAgZGlzcGxheUluTm9kZXMoKVxufVxuXG5cblxuXG5mdW5jdGlvbiBjYWxjdWxhdGVTcGFjZUluc2lkZVN0cnVjdHVyZUFycmF5KCkge1xuICB3aW5kb3cuYW1vdW50T2ZTcGFjZUluTm9kZURpdnMgPSBbXVxuXG4gIHNlbGVjdGVkU3RydWN0dXJlLmZvckVhY2goKGRpdkZvck5vZGUpID0+IHtcblxuICAgIGxldCBBbW91bnRPZkV4aXN0aW5nU3BhY2VGcm9tVGhpc0RpdiA9IGRpdkZvck5vZGUucmVkdWNlKChhY2N1bXVsYXRvciwgY3VycmVudE5vZGUpID0+IGFjY3VtdWxhdG9yICsgY3VycmVudE5vZGUuYW1vdW50T2ZTcGFjZSwgMCk7XG4gICAgYW1vdW50T2ZTcGFjZUluTm9kZURpdnMucHVzaChBbW91bnRPZkV4aXN0aW5nU3BhY2VGcm9tVGhpc0RpdilcblxuICB9KVxufVxuXG5cblxuXG5mdW5jdGlvbiBjYWxjdWxhdGVTaXplRm9yRGlzcGxheSgpIHtcbiAgZm9yIChsZXQgc3RydWN0dXJlSW5kZXggaW4gc2VsZWN0ZWRTdHJ1Y3R1cmUpIHtcbiAgICBmb3IgKGxldCBub2RlIG9mIHNlbGVjdGVkU3RydWN0dXJlW3N0cnVjdHVyZUluZGV4XSkge1xuICAgICAgZ2V0V2lkdGhTaXplRm9yTm9kZShub2RlKVxuICAgIH1cbiAgICBnZXRUZXh0Rm9yR3JpZFRlbXBsYXRlKHN0cnVjdHVyZUluZGV4KVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldFdpZHRoU2l6ZUZvck5vZGUobm9kZSkge1xuICAvLyBpdCdzIGEgY29tcGFyaXNvbiBiZWNhdXNlIDAgYXMgYSBudW1iZXIgaXMgZmFsc3lcbiAgaWYgKGAke25vZGUuaW5kZXhGb3JQYXJlbnR9YCAhPSAnZmFsc2UnKSB7XG4gICAgLy8gaWYgdGhlcmUncyBhIHBhcmVudCB0aGVuLi4uXG5cbiAgICBsZXQgbm9kZVNwYWNlID0gbm9kZS5hbW91bnRPZlNwYWNlO1xuICAgIGxldCBkaXZTcGFjZSA9IGFtb3VudE9mU3BhY2VJbk5vZGVEaXZzW25vZGUuaW5kZXhGb3JTdHJ1Y3R1cmVdO1xuICAgIGxldCBwZXJjZW50YWdlQ2FsY3VsYXRpb24gPSAobm9kZVNwYWNlIC8gZGl2U3BhY2UpXG5cbiAgICAvLyBjb25zb2xlLmxvZyhub2RlLmluZGV4Rm9yU3RydWN0dXJlIC0xKVxuICAgIGxldCBwYXJlbnRFbGVtZW50U2l6ZSA9IHdpbmRvdy5ub2RlU2l6ZVtub2RlLmluZGV4Rm9yU3RydWN0dXJlIC0gMV1bbm9kZS5pbmRleEZvclBhcmVudF1cblxuICAgIGxldCBjYWxjdWxhdGlvbjIgPSAocGVyY2VudGFnZUNhbGN1bGF0aW9uICogcGFyZW50RWxlbWVudFNpemUpXG5cbiAgICAvLyBpZiBzdGF0ZW1lbnQgbWFkZSB0byBjb21iYXQgdGhlIHVuZGVmaW5lZCBwcm9ibGVtXG4gICAgaWYgKG5vZGVTaXplW25vZGUuaW5kZXhGb3JTdHJ1Y3R1cmVdKSB7XG4gICAgICB3aW5kb3cubm9kZVNpemVbbm9kZS5pbmRleEZvclN0cnVjdHVyZV1bbm9kZS5pbmRleEZvclNpYmxpbmddID0gY2FsY3VsYXRpb24yO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIG5vZGVTaXplW25vZGUuaW5kZXhGb3JTdHJ1Y3R1cmVdID0gW11cbiAgICAgIHdpbmRvdy5ub2RlU2l6ZVtub2RlLmluZGV4Rm9yU3RydWN0dXJlXVtub2RlLmluZGV4Rm9yU2libGluZ10gPSBjYWxjdWxhdGlvbjI7XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIC8vIGlmIHRoZXJlJ3Mgbm8gcGFyZW50LCBpdCBpcyAxMDAlIHdpZHRoXG4gICAgd2luZG93Lm5vZGVTaXplID0gW1sxMDBdXTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRUZXh0Rm9yR3JpZFRlbXBsYXRlKHN0cnVjdHVyZUluZGV4KSB7XG4gIGxldCBzaXplSW5mb3JtYXRpb25BcnJheSA9IFtdXG4gIGZvciAobGV0IHNpemUgb2Ygbm9kZVNpemVbc3RydWN0dXJlSW5kZXhdKSB7XG4gICAgc2l6ZUluZm9ybWF0aW9uQXJyYXkucHVzaChgJHtzaXplfSVgKVxuICAgIHNpemVJbmZvcm1hdGlvbkFycmF5LnB1c2goJyAnKVxuICB9XG4gIHdpbmRvdy5ub2RlU2l6ZUZvckNvbHVtblRlbXBsYXRlW3N0cnVjdHVyZUluZGV4XSA9IHNpemVJbmZvcm1hdGlvbkFycmF5LmpvaW4oJycpXG59XG5cblxuXG5cblxuZnVuY3Rpb24gZGlzcGxheUluTm9kZXMoKSB7XG4gIGxldCBub2RlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25vZGVzJyk7XG4gIGZvciAobGV0IGRpdkluZGV4IGluIHNlbGVjdGVkU3RydWN0dXJlKSB7XG4gICAgbGV0IGRpdkZvck5vZGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2Rm9yTm9kZXMuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGAke25vZGVTaXplRm9yQ29sdW1uVGVtcGxhdGVbZGl2SW5kZXhdfWA7XG4gICAgbm9kZUNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXZGb3JOb2RlcylcbiAgICBmb3IgKGxldCBub2RlIG9mIHNlbGVjdGVkU3RydWN0dXJlW2RpdkluZGV4XSkge1xuICAgICAgbGV0IG5vZGVUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgICBub2RlVGV4dC5pbm5lclRleHQgPSBub2RlLnRleHQ7XG4gICAgICBub2RlVGV4dC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBub2RlLmNvbG9yO1xuICAgICAgbm9kZVRleHQudmFsdWUgPSBgJHtub2RlLmluZGV4Rm9yU3RydWN0dXJlfS0ke25vZGUuaW5kZXhGb3JTaWJsaW5nfWA7XG4gICAgICBub2RlVGV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNoYW5nZVNlbGVjdGVkTm9kZSk7XG4gICAgICBkaXZGb3JOb2Rlcy5hcHBlbmRDaGlsZChub2RlVGV4dCk7XG4gICAgfVxuICB9XG59XG5cbiIsImltcG9ydCB7IHVwZGF0ZU5vZGVTdHJ1Y3R1cmUsIGFwcGVuZEFyZ3VtZW50IH0gZnJvbSAnLi91cGRhdGVTdHJ1Y3R1cmUuanMnXG5cblxubGV0IGRpdkluZGV4O1xubGV0IG5vZGVJbmRleDtcblxuXG5leHBvcnQgZnVuY3Rpb24gYWRkTm9kZVRvTGVmdCgpIHtcbiAgZmlyc3ROb2RlLmFtb3VudE9mU3BhY2UgKz0gMTtcbiAgZGl2SW5kZXggPSAwO1xuICBub2RlSW5kZXggPSAxO1xuICBkaXZpZGVTZWxlY3RlZE5vZGUoKVxuICBwdXNoVG9maXJzdE5vZGUoZmFsc2UpXG5cbiAgdXBkYXRlTm9kZVN0cnVjdHVyZSgpXG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZE5vZGVDaGlsZCgpIHtcbiAgZmlyc3ROb2RlLmFtb3VudE9mU3BhY2UgKz0gMTtcbiAgZGl2SW5kZXggPSAwO1xuICBub2RlSW5kZXggPSAxO1xuICBkaXZpZGVTZWxlY3RlZE5vZGUoKVxuICBwdXNoQ2hpbGQoKVxuY29uc29sZS5sb2coZmlyc3ROb2RlKVxuICB1cGRhdGVOb2RlU3RydWN0dXJlKClcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gYWRkTm9kZVRvUmlnaHQoKSB7XG4gIGZpcnN0Tm9kZS5hbW91bnRPZlNwYWNlICs9IDE7XG4gIGRpdkluZGV4ID0gMDtcbiAgbm9kZUluZGV4ID0gMTtcbiAgZGl2aWRlU2VsZWN0ZWROb2RlKClcbiAgcHVzaFRvZmlyc3ROb2RlKHRydWUpXG5cblxuICB1cGRhdGVOb2RlU3RydWN0dXJlKClcbn1cblxuZnVuY3Rpb24gZGl2aWRlU2VsZWN0ZWROb2RlKCkge1xuICBsZXQgaHlwaGVuID0gc2VsZWN0ZWROb2RlLmluZGV4T2YoJy0nKTtcbiAgZGl2SW5kZXggPSBzZWxlY3RlZE5vZGUuc3Vic3RyaW5nKDAsIGh5cGhlbik7XG4gIG5vZGVJbmRleCA9IHNlbGVjdGVkTm9kZS5zdWJzdHJpbmcoaHlwaGVuICsgMSwgc2VsZWN0ZWROb2RlLmxlbmd0aCk7XG59XG5cblxuZnVuY3Rpb24gcHVzaFRvZmlyc3ROb2RlKG9yaWVudGF0aW9uKSB7XG4gIGxldCBwdXNoZWROb2RlID0gbm9kZUVsZW1lbnQoJ25ldyBFbGVtZW50JywgJ2JsYWNrJywgW2VtcHR5RWxlbWVudCgpXSwgbm9kZUluZGV4ICsgMSwgbm9kZVN0cnVjdHVyZVtkaXZJbmRleF1bbm9kZUluZGV4XS5pbmRleEZvclBhcmVudCwgZGl2SW5kZXgpO1xuICBwdXNoVG9QYXJlbnQoSlNPTi5zdHJpbmdpZnkocHVzaGVkTm9kZSksIG9yaWVudGF0aW9uKVxufVxuXG5cbmZ1bmN0aW9uIHB1c2hUb1BhcmVudChwdXNoZWROb2RlLCByaWdodE9yaWVudGF0aW9uKSB7XG4gIGxldCBjaGlsZCA9IGFwcGVuZEFyZ3VtZW50KCdmaXJzdE5vZGUnLCAnY2hpbGRyZW4nLCBOdW1iZXIoZGl2SW5kZXgpKTtcbiAgaWYgKHJpZ2h0T3JpZW50YXRpb24pIHtcbiAgICBldmFsKGAke2NoaWxkfS5zcGxpY2UoJHtub2RlSW5kZXh9ICsgMSwgMCwke3B1c2hlZE5vZGV9KWApXG4gIH1cbiAgZWxzZSB7XG4gICAgZXZhbChgJHtjaGlsZH0uc3BsaWNlKCR7bm9kZUluZGV4fSAsIDAsJHtwdXNoZWROb2RlfSlgKVxuICB9XG5cbn1cblxuXG4vLyBjb250aW51ZSB0b21vcnJvd1xuZnVuY3Rpb24gcHVzaENoaWxkKCkge1xuICBsZXQgcHVzaGVkTm9kZSA9IG5vZGVFbGVtZW50KCduZXcgRWxlbWVudCcsICdibGFjaycsIFtlbXB0eUVsZW1lbnQoKV0sIG5vZGVTdHJ1Y3R1cmVbZGl2SW5kZXhdW25vZGVJbmRleF0uY2hpbGRyZW4ubGVuZ3RoIC0gMSwgbm9kZVN0cnVjdHVyZVtkaXZJbmRleF1bbm9kZUluZGV4XS5pbmRleEZvclNpYmxpbmcsIGRpdkluZGV4KTtcbiAgLy8gbGV0IGNoaWxkID0gYXBwZW5kQXJndW1lbnQoJ2ZpcnN0Tm9kZScsICdjaGlsZHJlbicsIE51bWJlcihkaXZJbmRleCkpO1xuICBsZXQgY2hpbGQgPSBhcHBlbmRFbGVtZW50VGV4dCgpXG5cbiAgbGV0IGNvbG9yT2ZUaGVDaGlsZHJlbiA9IGAke2NoaWxkfS5jaGlsZHJlblswXS5jb2xvcmA7XG5cbiAgaWYoZXZhbChjb2xvck9mVGhlQ2hpbGRyZW4pKSB7XG4gICAgZXZhbChgJHtjaGlsZH0uY2hpbGRyZW4ucHVzaCgke0pTT04uc3RyaW5naWZ5KHB1c2hlZE5vZGUpfSlgKVxuICB9XG4gIGVsc2V7XG4gICAgZXZhbChgJHtjaGlsZH0uY2hpbGRyZW5bMF0gPSAke0pTT04uc3RyaW5naWZ5KHB1c2hlZE5vZGUpfWApXG4gIH1cblxufVxuXG5cbmZ1bmN0aW9uIGFwcGVuZEVsZW1lbnRUZXh0KCkge1xuICBsZXQgZWxlbWVudFRleHRBcnJheSA9IFtdO1xuXG4gIGNvbnNvbGUubG9nKGBub2RlaW5kZXg6JHtub2RlSW5kZXh9YClcbiAgY29uc29sZS5sb2coYGRpdkluZGV4OiR7ZGl2SW5kZXh9YClcbiAgZm9yIChsZXQgaW5kZXggPSBkaXZJbmRleDsgaW5kZXggPiAtMTsgaW5kZXgtLSkge1xuICAgIGlmIChpbmRleCA9PSBkaXZJbmRleCkge1xuICAgICAgbGV0IHB1c2hlZEVsZW1lbnQgPSBgLmNoaWxkcmVuWyR7bm9kZVN0cnVjdHVyZVtpbmRleF1bbm9kZUluZGV4XS5pbmRleEZvclNpYmxpbmd9XWA7XG4gICAgICAvLyBjb25zb2xlLmxvZyhwdXNoZWRFbGVtZW50KVxuICAgICAgZWxlbWVudFRleHRBcnJheS51bnNoaWZ0KHB1c2hlZEVsZW1lbnQpXG4gICAgfVxuICAgIGVsc2UgaWYgKGluZGV4ID09IDApIHtcbiAgICAgIGVsZW1lbnRUZXh0QXJyYXkudW5zaGlmdCgnZmlyc3ROb2RlJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbGV0IHByZXZpb3VzRWxlbWVudE5vZGVJbmRleCA9IGVsZW1lbnRUZXh0QXJyYXlbMF0uc3Vic3RyaW5nKGVsZW1lbnRUZXh0QXJyYXlbMF0uaW5kZXhPZignWycpLCBlbGVtZW50VGV4dEFycmF5WzBdLmxlbmd0aCk7XG4gICAgICBsZXQgcGFyZW50SW5kZXggPSBOdW1iZXIobm9kZVN0cnVjdHVyZVtpbmRleCArIDFdW051bWJlcihwcmV2aW91c0VsZW1lbnROb2RlSW5kZXgpXS5pbmRleEZvclBhcmVudCk7XG4gICAgICBsZXQgcHVzaGVkRWxlbWVudCA9IGAuY2hpbGRyZW5bJHtub2RlU3RydWN0dXJlW2luZGV4XVtwYXJlbnRJbmRleF19XWBcbiAgICAgIC8vIGNvbnNvbGUubG9nKHB1c2hlZEVsZW1lbnQpXG4gICAgICBlbGVtZW50VGV4dEFycmF5LnVuc2hpZnQocHVzaGVkRWxlbWVudClcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZWxlbWVudFRleHRBcnJheS5qb2luKCcnKTtcblxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGFwcGx5RWRpdENoYW5nZXMoKXtcbmFsZXJ0KCdhcHBseUVkaXRDaGFuZ2VzIFdvcmtzJylcblxuXG59XG4iLCJcbi8vIGVtcHR5IGVsZW1lbnRzIGFyZSBmb3IgZGlzcGxheWluZyBwdXJwb3NlcyBvbmx5XG5cbndpbmRvdy5lbXB0eUVsZW1lbnQgPSBmdW5jdGlvbih0ZXh0ID0gJ2VtcHR5JywgaW5kZXhGb3JQYXJlbnQgPSB0cnVlKSB7XG4gIHJldHVybiB7IHRleHQsIGluZGV4Rm9yUGFyZW50IH1cbn1cblxuXG53aW5kb3cubm9kZUVsZW1lbnQgPSBmdW5jdGlvbih0ZXh0ID0gJ2VtcHR5JywgY29sb3IgPSAnYmxhY2snLCBjaGlsZHJlbiA9IFtlbXB0eUVsZW1lbnQoKV0sIGluZGV4Rm9yU2libGluZyA9IDAsIGluZGV4Rm9yUGFyZW50ID0gZmFsc2UsIGluZGV4Rm9yU3RydWN0dXJlID0gMCwgYW1vdW50T2ZTcGFjZSA9IDEpIHtcbiAgcmV0dXJuIHsgdGV4dCwgY29sb3IsIGNoaWxkcmVuLCBpbmRleEZvclNpYmxpbmcsIGluZGV4Rm9yUGFyZW50LCBpbmRleEZvclN0cnVjdHVyZSwgYW1vdW50T2ZTcGFjZSB9XG59XG5cbmlmIChsb2NhbFN0b3JhZ2Uubm9kZVN0cnVjdHVyZSkge1xuICB3aW5kb3cubm9kZVN0cnVjdHVyZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLm5vZGVTdHJ1Y3R1cmUubWFpbilcbiAgd2luZG93LnNlbGVjdGVkU3RydWN0dXJlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2Uubm9kZVN0cnVjdHVyZS5zZWxlY3RlZClcbn1cbmVsc2Uge1xuICB3aW5kb3cuZmlyc3ROb2RlID0gbm9kZUVsZW1lbnQoJ2ZpcnN0RWxlbWVudCcsICdibGFjaycsIFtub2RlRWxlbWVudCgnc2Vjb25kRWxlbWVudCcsICdwaW5rJyksIG5vZGVFbGVtZW50KCd0aGlyZEVsZW1lbnQnLCAnZ3JheScpXSk7XG4gIGZpcnN0Tm9kZS5hbW91bnRPZlNwYWNlID0gMjtcbiAgZmlyc3ROb2RlLmNoaWxkcmVuWzBdLmluZGV4Rm9yU3RydWN0dXJlID0gMTtcbiAgZmlyc3ROb2RlLmNoaWxkcmVuWzFdLmluZGV4Rm9yU3RydWN0dXJlID0gMTtcbiAgZmlyc3ROb2RlLmNoaWxkcmVuWzFdLmluZGV4Rm9yU2libGluZyA9IDE7XG4gIGZpcnN0Tm9kZS5jaGlsZHJlblswXS5pbmRleEZvclBhcmVudCA9IDA7XG4gIGZpcnN0Tm9kZS5jaGlsZHJlblsxXS5pbmRleEZvclBhcmVudCA9IDA7XG5cbiAgd2luZG93Lm5vZGVTdHJ1Y3R1cmUgPSBbW2ZpcnN0Tm9kZV0sIFtmaXJzdE5vZGUuY2hpbGRyZW5bMF0sIGZpcnN0Tm9kZS5jaGlsZHJlblsxXV1dO1xuXG4gIHdpbmRvdy5zZWxlY3RlZFN0cnVjdHVyZSA9IG5vZGVTdHJ1Y3R1cmU7XG59XG5cblxuXG5cblxuXG5cblxuXG5cbiIsImFsZXJ0KCdyZW1vdmVOb2RlcyB3b3JraW5nJylcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVOb2RlKCl7XG5hbGVydCgncmVtb3ZlTm9kZScpXG5cblxufVxuIiwid2luZG93LnNlbGVjdGVkTm9kZSA9ICcnO1xuXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlU2VsZWN0ZWROb2RlKGV2ZW50KSB7XG4gIHdpbmRvdy5zZWxlY3RlZE5vZGUgPSBldmVudC50YXJnZXQudmFsdWVcbiAgZGlzcGxheVNlbGVjdGVkKCk7XG4gIGRpc3BsYXlOb2RlQnV0dG9ucygpO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5U2VsZWN0ZWQoKSB7XG4gIGxldCBwVGFncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNub2RlcyBwJyk7XG4gIGZvciAobGV0IHBUYWcgb2YgcFRhZ3MpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhwVGFnKTtcbiAgICBwVGFnLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJylcbiAgICBpZiAocFRhZy52YWx1ZSA9PSBzZWxlY3RlZE5vZGUpIHtcbiAgICAgIHBUYWcuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkaXNwbGF5Tm9kZUJ1dHRvbnMoKSB7XG4gIGxldCBub2RlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNub2RlQnV0dG9ucycpXG4gIG5vZGVCdXR0b25zLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gIHNldFRpbWVvdXQoKCkgPT4gbm9kZUJ1dHRvbnMuc3R5bGUub3BhY2l0eSA9ICcxJywgNTBcbiAgKVxufVxuXG4iLCJpbXBvcnQgeyBkaXNwbGF5RWxlbWVudHN9IGZyb20gJy4vLi4vZGlzcGxheUNvbnRlbnRJbmh0bWwnXG5cbmxldCBjaGlsZHJlbiA9IDA7XG5sZXQgYW1vdW50T2ZTcGFjZSA9IDE7XG5sZXQgc2libGluZ0luZGV4ID0gMDtcbmxldCBuZXdBcnJheSA9IFtbXV07XG5sZXQgcHJldmlvdXNOb2RlID0gJyc7XG5cblxuLy8gdXBkYXRlIE5vZGUgU3RydWN0dXJlIEZ1bmN0aW9uYWxpdHlcblxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlTm9kZVN0cnVjdHVyZSgpIHtcbiAgY2hpbGRyZW4gPSAwO1xuICBhbW91bnRPZlNwYWNlID0gMTtcbiAgc2libGluZ0luZGV4ID0gMDtcbiAgcHJldmlvdXNOb2RlID0gJ2ZpcnN0Tm9kZSc7XG4gIG5ld0FycmF5ID0gW1tmaXJzdE5vZGVdXTtcblxuXG4gIGl0ZXJhdGVUaHJvdWdoQ2hpbGRyZW5Ub1VwZGF0ZUluZGV4KGZpcnN0Tm9kZSlcbiAgdXBkYXRlQW1vdW50T2ZTcGFjZSgpXG4gIG5vZGVTdHJ1Y3R1cmUgPSBuZXdBcnJheTtcbiAgc2VsZWN0ZWRTdHJ1Y3R1cmUgPSBub2RlU3RydWN0dXJlO1xuICBkaXNwbGF5RWxlbWVudHMoKVxufVxuXG5cblxuXG5cblxuLy8gaW4gdGhlIG1vbWVudCB0aGlzIHdvcmtzIGJ1dCBkb24ndCBiZSBzdXJwcmlzZWQgaWYgeW91IGhhdmUgdG8gZml4IGl0IGluIHRoZSBmdXR1cmVcbmZ1bmN0aW9uIGl0ZXJhdGVUaHJvdWdoQ2hpbGRyZW5Ub1VwZGF0ZUluZGV4KG5vZGUpIHtcbiAgLy8gdGhpcyBpcyBhIHJlY3Vyc2l2ZSBtZXRob2QgdGhhdCBkb2VzIHRoZSBmb2xsb3dpbmc6XG5cbiAgLy8gMSBmcm9tIHRvcCB0byBib3R0b20gdHJ5IHRvIHJlYWNoIHRoZSBlbXB0eSBlbGVtZW50XG4gIC8vIDIuIGNoZWNrIGlmIGxhc3QgZWxlbWVudCBoYXMgc2libGluZ3MsIGlmIG5vdC4uIGNvbWUgYmFjayB0byB0aGUgcHJldmlvdXMgY2hpbGRyZW4gd2l0aCBzaWJsaW5nc1xuICAvLyAzLiBmaW5kIHByZXZpb3VzIGNoaWxkcmVuIHdpdGggc2libGluZyBhbmQgcmVwZWF0IHRvcCB0byBib3R0b20gcHJvY3Jlc3MgdW50aWwgaXQgcmVhY2hlcyB0byBlbXB0eSBlbGVtZW50XG4gIC8vIChhbHNvIHVwZGF0ZXMgaW5mb3JtYXRpb24gc3VjaCBhcyBpbmRleEZvclBhcmVudCxpbmRleEZvclNpYmxpbmcsSW5kZXhGb3JTdHJ1Y3R1cmUpXG5cbiAgaWYgKG5vZGUuY2hpbGRyZW5bMF0uY29sb3IpIHtcblxuICAgIHVwZGF0ZUluZm9ybWF0aW9uRm9yQ3VycmVudE5vZGUobm9kZSlcbiAgICB1cGRhdGVBcnJheShub2RlKVxuXG4gICAgY2hpbGRyZW4gPSBjaGlsZHJlbiArIDE7XG5cblxuICAgIGxldCBjaGlsZCA9IGFwcGVuZEFyZ3VtZW50KGAke3ByZXZpb3VzTm9kZX1gLCBgY2hpbGRyZW5bJHtzaWJsaW5nSW5kZXh9XWAsIDEpXG4gICAgcHJldmlvdXNOb2RlID0gY2hpbGQ7XG5cbiAgICBpdGVyYXRlVGhyb3VnaENoaWxkcmVuVG9VcGRhdGVJbmRleChldmFsKGNoaWxkKSlcbiAgfVxuICBlbHNlIHtcbiAgICBhbW91bnRPZlNwYWNlICs9IDE7XG4gICAgc2libGluZ0luZGV4ICs9IDE7XG4gICAgZmluZFNpYmxpbmcobm9kZSlcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIHVwZGF0ZUFycmF5KG5vZGUpIHtcbiAgLy9jcmVhdGVzIG5ldyBhcnJheSBpbiBjYXNlIG9mIGluZXhpc3RpbmcgYXJyYXk7XG4gIGlmICghbmV3QXJyYXlbY2hpbGRyZW4gKyAxXSkge1xuICAgIG5ld0FycmF5W2NoaWxkcmVuICsgMV0gPSBbXVxuICB9XG4gIC8vIGl0IGRvZXNuJ3QgdXBkYXRlIHRoZSBmaXJzdCBub2RlIGJlY2F1c2UgaXQgaXMgYWx3YXlzICdmaXJzdCBub2RlJ1xuICBuZXdBcnJheVtjaGlsZHJlbiArIDFdW3NpYmxpbmdJbmRleF0gPSBldmFsKGFwcGVuZEFyZ3VtZW50KGAke3ByZXZpb3VzTm9kZX1gLCBgY2hpbGRyZW5bJHtzaWJsaW5nSW5kZXh9XWAsIDEpKTtcblxufVxuXG5cblxuXG5cbmZ1bmN0aW9uIHVwZGF0ZUluZm9ybWF0aW9uRm9yQ3VycmVudE5vZGUoKSB7XG4gIGxldCBub2RlID0gZXZhbChhcHBlbmRBcmd1bWVudChgJHtwcmV2aW91c05vZGV9YCwgYGNoaWxkcmVuWyR7c2libGluZ0luZGV4fV1gLCAxKSk7XG5cbiAgLy8gdXBkYXRlIGluZGV4IGZvciBwYXJlbnRcbiAgaWYgKG5vZGUuaW5kZXhGb3JQYXJlbnQpIHtcbiAgICBub2RlLmluZGV4Rm9yUGFyZW50ID0gbmV3QXJyYXlbY2hpbGRyZW4gKyAxXVtzaWJsaW5nSW5kZXhdLmluZGV4Rm9yU2libGluZ1xuICB9XG5cbiAgLy8gdXBkYXRlIGluZGV4IGZvciBzaWJsaW5nIFxuICBub2RlLmluZGV4Rm9yU2libGluZyA9IHNpYmxpbmdJbmRleDtcbiAgLy8gdXBkYXRlIGluZGV4IGZvciBzaWJsaW5nIFxuICBub2RlLmluZGV4Rm9yU3RydWN0dXJlID0gY2hpbGRyZW4gKyAxO1xuXG59XG5cblxuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGVuZEFyZ3VtZW50KHZhcmlhYmxlVG9BcHBlbmQsIGFwcGVuZGVkVmFyaWFibGUsIG51bWJlck9mVGltZXMpIHtcbiAgbGV0IGFycmF5ID0gW2Ake3ZhcmlhYmxlVG9BcHBlbmR9YF1cbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG51bWJlck9mVGltZXM7IGluZGV4KyspIHtcbiAgICBhcnJheS5wdXNoKGAuJHthcHBlbmRlZFZhcmlhYmxlfWApXG4gIH1cbiAgcmV0dXJuIGFycmF5LmpvaW4oJycpXG5cbn1cblxuXG5cblxuXG5cbmZ1bmN0aW9uIGZpbmRTaWJsaW5nKG5vZGUpIHtcbiAgLy8gMi4gY2hlY2sgaWYgbGFzdCBlbGVtZW50IGhhcyBzaWJsaW5ncywgaWYgbm90Li4gY29tZSBiYWNrIHRvIHRoZSBwcmV2aW91cyBjaGlsZHJlbiB3aXRoIHNpYmxpbmdzXG5cbmNvbnNvbGUubG9nKHByZXZpb3VzTm9kZSlcbiAgbGV0IG5vZGVXaXRob3V0UHJldmlvdXNTaWJsaW5nID0gcHJldmlvdXNOb2RlLnN1YnN0cmluZygwLCBwcmV2aW91c05vZGUubGVuZ3RoIC0gMyk7XG5cbiAgbGV0IG5vZGVXaXRoVXBkYXRlZFNpYmxpbmcgPSBgJHtub2RlV2l0aG91dFByZXZpb3VzU2libGluZ31bJHtzaWJsaW5nSW5kZXh9XWA7XG5cbiAgbGV0IGFycmF5V2l0aG91dFRoZUxhc3RDaGlsZHJlbiA9IG5vZGVXaXRob3V0UHJldmlvdXNTaWJsaW5nLnNwbGl0KCcuJylcbiAgY2hpbGRyZW4gLT0gMTtcbiAgYXJyYXlXaXRob3V0VGhlTGFzdENoaWxkcmVuLnBvcCgpXG4gIGFycmF5V2l0aG91dFRoZUxhc3RDaGlsZHJlbiA9IGFycmF5V2l0aG91dFRoZUxhc3RDaGlsZHJlbi5qb2luKCcuJylcblxuICBpZiAoZXZhbChub2RlV2l0aFVwZGF0ZWRTaWJsaW5nKSkge1xuXG4gICAgcHJldmlvdXNOb2RlID0gYXJyYXlXaXRob3V0VGhlTGFzdENoaWxkcmVuO1xuXG4gICAgaXRlcmF0ZVRocm91Z2hDaGlsZHJlblRvVXBkYXRlSW5kZXgoZXZhbChhcnJheVdpdGhvdXRUaGVMYXN0Q2hpbGRyZW4pKVxuICB9XG4gIGVsc2Uge1xuICAgIGlmIChhbW91bnRPZlNwYWNlIDwgZmlyc3ROb2RlLmFtb3VudE9mU3BhY2UpIHtcbiAgICAgIGxldCBwcmV2aW91c1NwbGl0dGVkID0gcHJldmlvdXNOb2RlLnNwbGl0KCcuJyk7XG4gICAgICBwcmV2aW91c1NwbGl0dGVkLnBvcCgpXG4gICAgICBwcmV2aW91c05vZGUgPSBwcmV2aW91c1NwbGl0dGVkLmpvaW4oJy4nKVxuICAgICAgZmluZFNpYmxpbmcoKVxuXG4gICAgfVxuICB9XG59XG5cblxuXG5cblxuXG5mdW5jdGlvbiB1cGRhdGVBbW91bnRPZlNwYWNlKCkge1xuICByZW1vdmVBbW91bnRPZlNwYWNlVG9BcnJheSgpXG4gIGFkZEFtb3VudE9mU3BhY2VUb0FycmF5KClcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQW1vdW50T2ZTcGFjZVRvQXJyYXkoKSB7XG4gIGZvciAobGV0IHN1YkFycmF5ID0gbmV3QXJyYXkubGVuZ3RoIC0gMTsgc3ViQXJyYXkgPiAtMTsgc3ViQXJyYXkgPSBzdWJBcnJheSAtIDEpIHtcbiAgICBmb3IgKGxldCBpbmRleDIgPSAwOyBpbmRleDIgPCBuZXdBcnJheVtzdWJBcnJheV0ubGVuZ3RoOyBpbmRleDIrKykge1xuICAgICAgbGV0IG5vZGUgPSBuZXdBcnJheVtzdWJBcnJheV1baW5kZXgyXTtcbiAgICAgIG5vZGUuYW1vdW50T2ZTcGFjZSA9IDA7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFkZEFtb3VudE9mU3BhY2VUb0FycmF5KCkge1xuICBmb3IgKGxldCBzdWJBcnJheSA9IG5ld0FycmF5Lmxlbmd0aCAtIDE7IHN1YkFycmF5ID4gLTE7IHN1YkFycmF5ID0gc3ViQXJyYXkgLSAxKSB7XG4gICAgZm9yIChsZXQgaW5kZXgyID0gMDsgaW5kZXgyIDwgbmV3QXJyYXlbc3ViQXJyYXldLmxlbmd0aDsgaW5kZXgyKyspIHtcbiAgICAgIGxldCBub2RlID0gbmV3QXJyYXlbc3ViQXJyYXldW2luZGV4Ml07XG4gICAgICBub2RlLmFtb3VudE9mU3BhY2UgPSBub2RlLmNoaWxkcmVuLmxlbmd0aDtcbiAgICAgIGlmIChub2RlLmNoaWxkcmVuWzBdLmFtb3VudE9mU3BhY2UpIHtcbiAgICAgICAgbm9kZS5hbW91bnRPZlNwYWNlID0gZ2V0Q2hpbGRyZW5BbW91bnRPZlNwYWNlKG5vZGUpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cblxuZnVuY3Rpb24gZ2V0Q2hpbGRyZW5BbW91bnRPZlNwYWNlKG5vZGUpIHtcbiAgbGV0IGFtb3VudE9mU3BhY2UgPSAwO1xuICBmb3IgKGxldCBpbmRleDMgaW4gbm9kZS5jaGlsZHJlbikge1xuICAgIGxldCBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW5baW5kZXgzXTtcbiAgICBhbW91bnRPZlNwYWNlID0gYW1vdW50T2ZTcGFjZSArIGNoaWxkcmVuLmFtb3VudE9mU3BhY2VcbiAgfVxuICByZXR1cm4gYW1vdW50T2ZTcGFjZVxufVxuIiwiaW1wb3J0ICcuLy4uL3N0eWxlL3dpbmRvd3MuY3NzJ1xuXG53aW5kb3cud2luZG93UHJvcGVydGllcyA9IHtpc1dpbmRvd05vdE9wZW46IHRydWUsfVxuXG5leHBvcnQgbGV0ICBjdXJyZW50V2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2N1cnJlbnRXaW5kb3cnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlV2luZG93KCl7XG5jdXJyZW50V2luZG93LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5jdXJyZW50V2luZG93LmlubmVySFRNTCA9ICcnO1xud2luZG93UHJvcGVydGllcy5pc1dpbmRvd05vdE9wZW4gPSB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gIGRpc3BsYXlXaW5kb3coKXtcbmN1cnJlbnRXaW5kb3cuc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcbn1cblxuY29uc3QgZXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXIgZGl2Jyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5V2luZG93RXJyb3IoKXtcbmVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9IGBjYW4ndCBvcGVuIDIgd2luZG93c2A7XG5zZXRUaW1lb3V0KG1ha2VJdFZpc2libGUsMTAwKVxufVxuXG5mdW5jdGlvbiBtYWtlSXRWaXNpYmxlKCl7XG5lcnJvckNvbnRhaW5lci5zdHlsZS5vcGFjaXR5ID0gJzEnXG5zZXRUaW1lb3V0KG1ha2VJdEludmlzaWJsZSwgNDAwMClcbn1cblxuXG5mdW5jdGlvbiBtYWtlSXRJbnZpc2libGUoKXtcbmVycm9yQ29udGFpbmVyLnN0eWxlLm9wYWNpdHkgPSAnMCdcbn1cblxuXG4iLCJpbXBvcnQgeyBjdXJyZW50V2luZG93LCBjbG9zZVdpbmRvdywgZGlzcGxheVdpbmRvdywgZGlzcGxheVdpbmRvd0Vycm9yIH0gZnJvbSAnLi8uLi9jdXJyZW50V2luZG93LmpzJ1xuaW1wb3J0IHsgYWRkTm9kZVRvTGVmdCwgYWRkTm9kZVRvUmlnaHQsIGFkZE5vZGVDaGlsZCB9IGZyb20gJy4vLi4vLi4vbm9kZXMvY3JlYXRlTm9kZXMuanMnXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlV2luZG93Rm9yQ3JlYXRlTm9kZXNCdXR0b24oKSB7XG4gIGlmKHdpbmRvd1Byb3BlcnRpZXMuaXNXaW5kb3dOb3RPcGVuKSB7XG5cblxuaWYoc2VsZWN0ZWROb2RlWzBdID09ICcwJyl7XG4gICAgY3VycmVudFdpbmRvdy5pbm5lckhUTUwgPSBgPGJ1dHRvbiBpZD0nY2xvc2VXaW5kb3cnPmNsb3NlPC9idXR0b24+XG4gICAgPGRpdj5cbiAgICA8YnV0dG9uIGlkPVwiYWRkTm9kZUNoaWxkXCI+YWRkIGNoaWxkPC9idXR0b24+XG4gICAgPC9kaXY+YDtcbiAgICB9XG4gICAgZWxzZXtcblxuICAgIGN1cnJlbnRXaW5kb3cuaW5uZXJIVE1MID0gYDxidXR0b24gaWQ9J2Nsb3NlV2luZG93Jz5jbG9zZTwvYnV0dG9uPlxuICAgIDxkaXY+XG4gICAgPGJ1dHRvbiBpZD1cImFkZE5vZGVUb1RoZUxlZnRcIj5sZWZ0PC9idXR0b24+XG4gICAgPGJ1dHRvbiBpZD1cImFkZE5vZGVDaGlsZFwiPmFkZCBjaGlsZDwvYnV0dG9uPlxuICAgIDxidXR0b24gaWQ9XCJhZGROb2RlVG9UaGVSaWdodFwiPnJpZ2h0PC9idXR0b24+XG4gICAgPC9kaXY+YDtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGROb2RlVG9UaGVMZWZ0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhZGROb2RlVG9MZWZ0KTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkTm9kZVRvVGhlUmlnaHQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFkZE5vZGVUb1JpZ2h0KTtcbiAgICB9XG5cblxuXG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xvc2VXaW5kb3cnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlV2luZG93KTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkTm9kZUNoaWxkJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhZGROb2RlQ2hpbGQpO1xuXG4gICAgd2luZG93UHJvcGVydGllcy5pc1dpbmRvd05vdE9wZW4gPSBmYWxzZTtcbiAgICBkaXNwbGF5V2luZG93KCk7XG4gIH1cbiAgZWxzZXtcbiAgZGlzcGxheVdpbmRvd0Vycm9yKClcbiAgfVxufVxuIiwiaW1wb3J0IHsgY3VycmVudFdpbmRvdywgY2xvc2VXaW5kb3csIGRpc3BsYXlXaW5kb3csIGRpc3BsYXlXaW5kb3dFcnJvciB9IGZyb20gJy4vLi4vY3VycmVudFdpbmRvdy5qcydcbmltcG9ydCB7IGFwcGx5RWRpdENoYW5nZXN9IGZyb20gJy4vLi4vLi4vbm9kZXMvZWRpdE5vZGVzLmpzJ1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVXaW5kb3dGb3JFZGl0Tm9kZXNCdXR0b24oKSB7XG5cbiAgaWYgKHdpbmRvd1Byb3BlcnRpZXMuaXNXaW5kb3dOb3RPcGVuKSB7XG4gICAgYWxlcnQoJ2dlbmVyYXRlV2luZG93Rm9yRWRpdE5vZGVzQnV0dG9uJylcblxuICAgIGN1cnJlbnRXaW5kb3cuaW5uZXJIVE1MID0gYDxidXR0b24gaWQ9J2Nsb3NlV2luZG93Jz5jbG9zZTwvYnV0dG9uPlxuICAgIDxwPnRleHQ6PC9wPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiPlxuICAgIDxwPmNvbG9yOjwvcD5cbiAgICA8aW5wdXQgdHlwZT1cImNvbG9yXCIgaWQ9XCJcIj5cbiAgICA8YnV0dG9uIGlkPSdhcHBseUVkaXRDaGFuZ2VzJz5hcHBseTwvYnV0dG9uPmA7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xvc2VXaW5kb3cnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlV2luZG93KTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXBwbHlFZGl0Q2hhbmdlcycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXBwbHlFZGl0Q2hhbmdlcyk7XG5cbiAgICB3aW5kb3dQcm9wZXJ0aWVzLmlzV2luZG93Tm90T3BlbiA9IGZhbHNlO1xuICAgIGRpc3BsYXlXaW5kb3coKTtcbiAgfVxuICBlbHNle1xuICBkaXNwbGF5V2luZG93RXJyb3IoKVxuICB9XG59XG5cbiIsImltcG9ydCB7IGN1cnJlbnRXaW5kb3csIGNsb3NlV2luZG93LCBkaXNwbGF5V2luZG93LCBkaXNwbGF5V2luZG93RXJyb3IgfSBmcm9tICcuLy4uL2N1cnJlbnRXaW5kb3cuanMnO1xuaW1wb3J0IHsgYXBwbHlGaXJzdE5vZGVGdW5jIH0gZnJvbSAnLi8uLi8uLi9ub2Rlcy9maXJzdE5vZGUuanMnO1xuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlV2luZG93Rm9yRmlyc3ROb2RlQnV0dG9uKCkge1xuXG5cbiAgaWYgKHdpbmRvd1Byb3BlcnRpZXMuaXNXaW5kb3dOb3RPcGVuKSB7XG4gICAgY3VycmVudFdpbmRvdy5pbm5lckhUTUwgPSBgPGJ1dHRvbiBpZD0nY2xvc2VXaW5kb3cnPmNsb3NlPC9idXR0b24+XG4gICAgPHA+Rmlyc3QgTm9kZTwvcD5cbiAgICA8c2VsZWN0IG5hbWU9XCJcIiBpZD1cIlwiPlxuICAgIDwvc2VsZWN0PlxuICAgIDxidXR0b24gaWQ9XCJhcHBseUZpcnN0Tm9kZUZ1bmNcIj5hcHBseTwvYnV0dG9uPmA7XG5cbiAgICBhcHBlbmROb2Rlc0Zyb21Ob2RlU3RydWN0dXJlKClcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xvc2VXaW5kb3cnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlV2luZG93KTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXBwbHlGaXJzdE5vZGVGdW5jJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhcHBseUZpcnN0Tm9kZUZ1bmMpO1xuXG4gICAgd2luZG93UHJvcGVydGllcy5pc1dpbmRvd05vdE9wZW4gPSBmYWxzZTtcbiAgICBkaXNwbGF5V2luZG93KCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgZGlzcGxheVdpbmRvd0Vycm9yKClcbiAgfVxuXG59XG5cbmZ1bmN0aW9uIGFwcGVuZE5vZGVzRnJvbU5vZGVTdHJ1Y3R1cmUoKSB7XG5sZXQgc2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2N1cnJlbnRXaW5kb3cgc2VsZWN0JylcbiAgZm9yIChsZXQgZGl2IG9mIG5vZGVTdHJ1Y3R1cmUpIHtcbiAgICBmb3IgKGxldCBub2RlIG9mIGRpdikge1xuICAgICAgLy8gdGhpcyBjaGVja3MgdGhhdCBpdCdzIG5vdCBhbiBlbXB0eSBlbGVtZW50XG4gICAgICBpZiAobm9kZS5jb2xvcikge1xuICAgICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgIG9wdGlvbi5pbm5lclRleHQgPSBub2RlLnRleHQ7XG4gICAgICAgIG9wdGlvbi52YWx1ZSA9IGAke25vZGUuaW5kZXhGb3JTdHJ1Y3R1cmV9LSR7bm9kZS5pbmRleEZvclNpYmxpbmd9YDtcbiAgICAgICAgY2hlY2tJZkl0TWFyY2hlc1NlbGVjdGVkTm9kZShvcHRpb24pXG4gICAgICAgIHNlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVja0lmSXRNYXJjaGVzU2VsZWN0ZWROb2RlKG9wdGlvbil7XG5pZihvcHRpb24udmFsdWUgPT0gd2luZG93LnNlbGVjdGVkTm9kZSl7XG5vcHRpb24uc2VsZWN0ZWQgPSB0cnVlO1xufVxufVxuIiwiaW1wb3J0IHsgY3VycmVudFdpbmRvdywgY2xvc2VXaW5kb3csIGRpc3BsYXlXaW5kb3csZGlzcGxheVdpbmRvd0Vycm9yIH0gZnJvbSAnLi8uLi9jdXJyZW50V2luZG93LmpzJ1xuaW1wb3J0IHsgcmVtb3ZlTm9kZSB9IGZyb20gJy4vLi4vLi4vbm9kZXMvcmVtb3ZlTm9kZXMuanMnXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVXaW5kb3dGb3JSZW1vdmVOb2Rlc0J1dHRvbigpIHtcblxuICBpZiAod2luZG93UHJvcGVydGllcy5pc1dpbmRvd05vdE9wZW4pIHtcbiAgICBjdXJyZW50V2luZG93LmlubmVySFRNTCA9IGA8cD5hcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXM/PC9wPlxuICAgIDxkaXY+PGJ1dHRvbiBpZD0nYWNjZXB0RGVsZXRlJz55ZXM8L2J1dHRvbj48YnV0dG9uIGlkPSdkZW55RGVsZXRlJz5ubzwvYnV0dG9uPjwvZGl2PmA7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWNjZXB0RGVsZXRlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZW1vdmVOb2RlKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVueURlbGV0ZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VXaW5kb3cgKTtcblxuICAgIHdpbmRvd1Byb3BlcnRpZXMuaXNXaW5kb3dOb3RPcGVuID0gZmFsc2U7XG4gICAgZGlzcGxheVdpbmRvdygpXG4gIH1cbiAgZWxzZXtcbiAgZGlzcGxheVdpbmRvd0Vycm9yKClcbiAgfVxufVxuXG5cbiIsImV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVdpbmRvd0ZvckV4cG9ydFN0cnVjdHVyZUJ1dHRvbigpe1xuYWxlcnQoJ2dlbmVyYXRlV2luZG93Rm9yRXhwb3J0U3RydWN0dXJlQnV0dG9uJylcblxuXG59XG4iLCJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVdpbmRvd0ZvckltcG9ydFN0cnVjdHVyZUJ1dHRvbigpe1xuYWxlcnQoJ2dlbmVyYXRlV2luZG93Rm9ySW1wb3J0U3RydWN0dXJlQnV0dG9uJylcbn1cbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAqe1xucGFkZGluZzogMDtcbm1hcmdpbjogMDtcbmJveC1zaXppbmc6Ym9yZGVyLWJveDtcbn1cblxuXG46cm9vdHtcbi0td2hpdGU6d2hpdGU7XG4tLWJsYWNrOmJsYWNrO1xuLS15ZWxsb3c6I0VBOUIwRTtcbn1cblxuLyogcmVwZXRpdGl2ZSBzZWN0aW9uICovXG5oZWFkZXIsICNidXR0b25ze1xuZGlzcGxheTpmbGV4O1xuXG5cbn1cblxuXG5ib2R5e1xuYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmxhY2spO1xuY29sb3I6IHZhcigtLXdoaXRlKTtcbn1cblxuaGVhZGVye1xucG9zaXRpb246cmVsYXRpdmU7XG5ib3JkZXItYm90dG9tOjJweCBzb2xpZCB2YXIoLS13aGl0ZSk7XG5qdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xuYWxpZ24taXRlbXM6Y2VudGVyO1xufVxuXG4vKiBlcnJvciBjb250YWluZXIgKi9cbmhlYWRlciBkaXZ7XG5wb3NpdGlvbjogYWJzb2x1dGU7XG5yaWdodDowO1xub3BhY2l0eTogMDtcbnRyYW5zaXRpb246b3BhY2l0eSAycztcbn1cblxuXG5cblxubWFpbntcbnBvc2l0aW9uOnJlbGF0aXZlO1xufVxuXG5idXR0b257XG5iYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ibGFjayk7XG5jb2xvcjogdmFyKC0td2hpdGUpO1xuYm9yZGVyOiAycHggc29saWQgdmFyKC0td2hpdGUpO1xudHJhbnNpdGlvbjphbGwgNTAwbXM7XG5wYWRkaW5nOjAuOHZ3O1xuYm9yZGVyLXJhZGl1czoxMHB4O1xufVxuXG5idXR0b246aG92ZXJ7XG5iYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS13aGl0ZSk7XG5jb2xvcjogdmFyKC0tYmxhY2spO1xuYm9yZGVyOiAycHggc29saWQgdmFyKC0tYmxhY2spO1xuIFxufVxuXG4jYnV0dG9uc3tcbiAgdG9wOjJ2aDtcbiAgd2lkdGg6MTAwJTtcbiAgcG9zaXRpb246YWJzb2x1dGU7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn1cblxuI25vZGVCdXR0b25ze1xuZGlzcGxheTogbm9uZTtcbm9wYWNpdHk6IDA7XG5nYXA6MC41dnc7XG50cmFuc2l0aW9uOiBvcGFjaXR5IDJzO1xufVxuXG4uc2VsZWN0ZWR7XG5vdXRsaW5lOjJweCBzb2xpZCB2YXIoLS15ZWxsb3cpXG5cbn1cblxuXG5cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vaW5wdXQvc3R5bGUvbWFpbi5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7QUFDQSxVQUFVO0FBQ1YsU0FBUztBQUNULHFCQUFxQjtBQUNyQjs7O0FBR0E7QUFDQSxhQUFhO0FBQ2IsYUFBYTtBQUNiLGdCQUFnQjtBQUNoQjs7QUFFQSx1QkFBdUI7QUFDdkI7QUFDQSxZQUFZOzs7QUFHWjs7O0FBR0E7QUFDQSw4QkFBOEI7QUFDOUIsbUJBQW1CO0FBQ25COztBQUVBO0FBQ0EsaUJBQWlCO0FBQ2pCLG9DQUFvQztBQUNwQyxzQkFBc0I7QUFDdEIsa0JBQWtCO0FBQ2xCOztBQUVBLG9CQUFvQjtBQUNwQjtBQUNBLGtCQUFrQjtBQUNsQixPQUFPO0FBQ1AsVUFBVTtBQUNWLHFCQUFxQjtBQUNyQjs7Ozs7QUFLQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBLDhCQUE4QjtBQUM5QixtQkFBbUI7QUFDbkIsOEJBQThCO0FBQzlCLG9CQUFvQjtBQUNwQixhQUFhO0FBQ2Isa0JBQWtCO0FBQ2xCOztBQUVBO0FBQ0EsOEJBQThCO0FBQzlCLG1CQUFtQjtBQUNuQiw4QkFBOEI7O0FBRTlCOztBQUVBO0VBQ0UsT0FBTztFQUNQLFVBQVU7RUFDVixpQkFBaUI7RUFDakIsOEJBQThCO0FBQ2hDOztBQUVBO0FBQ0EsYUFBYTtBQUNiLFVBQVU7QUFDVixTQUFTO0FBQ1Qsc0JBQXNCO0FBQ3RCOztBQUVBO0FBQ0E7O0FBRUFcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKntcXG5wYWRkaW5nOiAwO1xcbm1hcmdpbjogMDtcXG5ib3gtc2l6aW5nOmJvcmRlci1ib3g7XFxufVxcblxcblxcbjpyb290e1xcbi0td2hpdGU6d2hpdGU7XFxuLS1ibGFjazpibGFjaztcXG4tLXllbGxvdzojRUE5QjBFO1xcbn1cXG5cXG4vKiByZXBldGl0aXZlIHNlY3Rpb24gKi9cXG5oZWFkZXIsICNidXR0b25ze1xcbmRpc3BsYXk6ZmxleDtcXG5cXG5cXG59XFxuXFxuXFxuYm9keXtcXG5iYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ibGFjayk7XFxuY29sb3I6IHZhcigtLXdoaXRlKTtcXG59XFxuXFxuaGVhZGVye1xcbnBvc2l0aW9uOnJlbGF0aXZlO1xcbmJvcmRlci1ib3R0b206MnB4IHNvbGlkIHZhcigtLXdoaXRlKTtcXG5qdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xcbmFsaWduLWl0ZW1zOmNlbnRlcjtcXG59XFxuXFxuLyogZXJyb3IgY29udGFpbmVyICovXFxuaGVhZGVyIGRpdntcXG5wb3NpdGlvbjogYWJzb2x1dGU7XFxucmlnaHQ6MDtcXG5vcGFjaXR5OiAwO1xcbnRyYW5zaXRpb246b3BhY2l0eSAycztcXG59XFxuXFxuXFxuXFxuXFxubWFpbntcXG5wb3NpdGlvbjpyZWxhdGl2ZTtcXG59XFxuXFxuYnV0dG9ue1xcbmJhY2tncm91bmQtY29sb3I6IHZhcigtLWJsYWNrKTtcXG5jb2xvcjogdmFyKC0td2hpdGUpO1xcbmJvcmRlcjogMnB4IHNvbGlkIHZhcigtLXdoaXRlKTtcXG50cmFuc2l0aW9uOmFsbCA1MDBtcztcXG5wYWRkaW5nOjAuOHZ3O1xcbmJvcmRlci1yYWRpdXM6MTBweDtcXG59XFxuXFxuYnV0dG9uOmhvdmVye1xcbmJhY2tncm91bmQtY29sb3I6IHZhcigtLXdoaXRlKTtcXG5jb2xvcjogdmFyKC0tYmxhY2spO1xcbmJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWJsYWNrKTtcXG4gXFxufVxcblxcbiNidXR0b25ze1xcbiAgdG9wOjJ2aDtcXG4gIHdpZHRoOjEwMCU7XFxuICBwb3NpdGlvbjphYnNvbHV0ZTtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuXFxuI25vZGVCdXR0b25ze1xcbmRpc3BsYXk6IG5vbmU7XFxub3BhY2l0eTogMDtcXG5nYXA6MC41dnc7XFxudHJhbnNpdGlvbjogb3BhY2l0eSAycztcXG59XFxuXFxuLnNlbGVjdGVke1xcbm91dGxpbmU6MnB4IHNvbGlkIHZhcigtLXllbGxvdylcXG5cXG59XFxuXFxuXFxuXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAjbm9kZXN7XG5wYWRkaW5nLXRvcDoxMnZoO1xuZGlzcGxheTogZ3JpZDtcbn1cblxuI25vZGVzID4gZGl2e1xuZGlzcGxheTogZ3JpZDtcbmFsaWduLWl0ZW1zOmNlbnRlcjtcbmp1c3RpZnktaXRlbXM6Y2VudGVyO1xufSBcblxuI25vZGVzIHB7XG53aWR0aDoxNXZ3O1xuaGVpZ2h0OjN2dztcbmZvbnQtc2l6ZToxLjJ2dztcbnRleHQtYWxpZ246Y2VudGVyO1xuZGlzcGxheTpmbGV4O1xuanVzdGlmeS1jb250ZW50OmNlbnRlcjtcbmFsaWduLWl0ZW1zOmNlbnRlcjtcbmJvcmRlci1yYWRpdXM6IDEwcHg7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL2lucHV0L3N0eWxlL25vZGUvbm9kZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7QUFDQSxnQkFBZ0I7QUFDaEIsYUFBYTtBQUNiOztBQUVBO0FBQ0EsYUFBYTtBQUNiLGtCQUFrQjtBQUNsQixvQkFBb0I7QUFDcEI7O0FBRUE7QUFDQSxVQUFVO0FBQ1YsVUFBVTtBQUNWLGVBQWU7QUFDZixpQkFBaUI7QUFDakIsWUFBWTtBQUNaLHNCQUFzQjtBQUN0QixrQkFBa0I7QUFDbEIsbUJBQW1CO0FBQ25CXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIiNub2Rlc3tcXG5wYWRkaW5nLXRvcDoxMnZoO1xcbmRpc3BsYXk6IGdyaWQ7XFxufVxcblxcbiNub2RlcyA+IGRpdntcXG5kaXNwbGF5OiBncmlkO1xcbmFsaWduLWl0ZW1zOmNlbnRlcjtcXG5qdXN0aWZ5LWl0ZW1zOmNlbnRlcjtcXG59IFxcblxcbiNub2RlcyBwe1xcbndpZHRoOjE1dnc7XFxuaGVpZ2h0OjN2dztcXG5mb250LXNpemU6MS4ydnc7XFxudGV4dC1hbGlnbjpjZW50ZXI7XFxuZGlzcGxheTpmbGV4O1xcbmp1c3RpZnktY29udGVudDpjZW50ZXI7XFxuYWxpZ24taXRlbXM6Y2VudGVyO1xcbmJvcmRlci1yYWRpdXM6IDEwcHg7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgI2N1cnJlbnRXaW5kb3d7XG5kaXNwbGF5OiBub25lO1xuLyogZGlzcGxheTpmbGV4OyAqL1xuYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmxhY2spO1xucG9zaXRpb246Zml4ZWQ7XG5mbGV4LWRpcmVjdGlvbjpjb2x1bW47XG5nYXA6MjBweDtcbmp1c3RpZnktY29udGVudDpjZW50ZXI7XG5hbGlnbi1pdGVtczpjZW50ZXI7XG5ib3JkZXI6IDJweCBzb2xpZCB2YXIoLS13aGl0ZSk7XG5ib3JkZXItcmFkaXVzOjIwcHg7XG5wYWRkaW5nOjV2dztcblxubGVmdDo1MHZ3O1xudG9wOjUwdmg7XG50cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7XG56LWluZGV4OiAxO1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9pbnB1dC9zdHlsZS93aW5kb3dzLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtBQUNBLGFBQWE7QUFDYixrQkFBa0I7QUFDbEIsOEJBQThCO0FBQzlCLGNBQWM7QUFDZCxxQkFBcUI7QUFDckIsUUFBUTtBQUNSLHNCQUFzQjtBQUN0QixrQkFBa0I7QUFDbEIsOEJBQThCO0FBQzlCLGtCQUFrQjtBQUNsQixXQUFXOztBQUVYLFNBQVM7QUFDVCxRQUFRO0FBQ1IsOEJBQThCO0FBQzlCLFVBQVU7QUFDVlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIjY3VycmVudFdpbmRvd3tcXG5kaXNwbGF5OiBub25lO1xcbi8qIGRpc3BsYXk6ZmxleDsgKi9cXG5iYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ibGFjayk7XFxucG9zaXRpb246Zml4ZWQ7XFxuZmxleC1kaXJlY3Rpb246Y29sdW1uO1xcbmdhcDoyMHB4O1xcbmp1c3RpZnktY29udGVudDpjZW50ZXI7XFxuYWxpZ24taXRlbXM6Y2VudGVyO1xcbmJvcmRlcjogMnB4IHNvbGlkIHZhcigtLXdoaXRlKTtcXG5ib3JkZXItcmFkaXVzOjIwcHg7XFxucGFkZGluZzo1dnc7XFxuXFxubGVmdDo1MHZ3O1xcbnRvcDo1MHZoO1xcbnRyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTtcXG56LWluZGV4OiAxO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tYWluLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWFpbi5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbm9kZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL25vZGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3dpbmRvd3MuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi93aW5kb3dzLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL3N0eWxlL21haW4uY3NzJ1xuaW1wb3J0ICcuL25vZGVzL25vZGVTdHJ1Y3R1cmUuanMnXG5pbXBvcnQgJy4vZGlzcGxheUNvbnRlbnRJbmh0bWwuanMnXG5cbi8vIGZ1bmN0aW9uYWxpdHkgZm9yIG5vZGUgYnV0dG9ucyBmcm9tIHRoZSBsZWZ0IHBhcnQgb2YgdGhlIHNjcmVlblxuaW1wb3J0IHsgZ2VuZXJhdGVXaW5kb3dGb3JDcmVhdGVOb2Rlc0J1dHRvbiB9IGZyb20gJy4vd2luZG93cy9ub2RlV2luZG93cy9jcmVhdGVOb2Rlcy5qcyc7XG5pbXBvcnQgeyBnZW5lcmF0ZVdpbmRvd0ZvclJlbW92ZU5vZGVzQnV0dG9uIH0gZnJvbSAnLi93aW5kb3dzL25vZGVXaW5kb3dzL3JlbW92ZU5vZGVzLmpzJztcbmltcG9ydCB7IGdlbmVyYXRlV2luZG93Rm9yRWRpdE5vZGVzQnV0dG9uIH0gZnJvbSAnLi93aW5kb3dzL25vZGVXaW5kb3dzL2VkaXROb2Rlcy5qcyc7XG5pbXBvcnQgeyBnZW5lcmF0ZVdpbmRvd0ZvckZpcnN0Tm9kZUJ1dHRvbiB9IGZyb20gJy4vd2luZG93cy9ub2RlV2luZG93cy9maXJzdE5vZGUuanMnO1xuXG4vLyBmdW5jdGlvbmFsaXR5IGZvciBzdHJ1Y3R1cmUgYnV0dG9ucyBmcm9tIHRoZSByaWdodCBwYXJ0IG9mIHRoZSBzY3JlZW5cbmltcG9ydCB7IGdlbmVyYXRlV2luZG93Rm9ySW1wb3J0U3RydWN0dXJlQnV0dG9uIH0gZnJvbSAnLi93aW5kb3dzL3N0cnVjdHVyZVdpbmRvd3MvaW1wb3J0U3RydWN0dXJlLmpzJztcbmltcG9ydCB7IGdlbmVyYXRlV2luZG93Rm9yRXhwb3J0U3RydWN0dXJlQnV0dG9uIH0gZnJvbSAnLi93aW5kb3dzL3N0cnVjdHVyZVdpbmRvd3MvZXhwb3J0U3RydWN0dXJlLmpzJztcblxuXG5cbi8vIGFkZGluZyBldmVudCBsaXN0ZW5lcnMgdG8gbm9kZSBidXR0b25zIGZyb20gdGhlIGxlZnRcbmNvbnN0IG5vZGVCdG5JZCA9ICcjbm9kZUJ1dHRvbnMnXG5cbmNvbnN0IGNyZWF0ZU5vZGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke25vZGVCdG5JZH0gYnV0dG9uOmZpcnN0LW9mLXR5cGVgKVxuY3JlYXRlTm9kZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGdlbmVyYXRlV2luZG93Rm9yQ3JlYXRlTm9kZXNCdXR0b24pXG5cbmNvbnN0IHJlbW92ZU5vZGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke25vZGVCdG5JZH0gYnV0dG9uOm50aC1vZi10eXBlKDIpYClcbnJlbW92ZU5vZGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBnZW5lcmF0ZVdpbmRvd0ZvclJlbW92ZU5vZGVzQnV0dG9uKVxuXG5jb25zdCBlZGl0Tm9kZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7bm9kZUJ0bklkfSBidXR0b246bnRoLW9mLXR5cGUoMylgKVxuZWRpdE5vZGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBnZW5lcmF0ZVdpbmRvd0ZvckVkaXROb2Rlc0J1dHRvbilcblxuY29uc3QgZmlyc3ROb2RlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHtub2RlQnRuSWR9IGJ1dHRvbjpsYXN0LW9mLXR5cGVgKVxuZmlyc3ROb2RlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZ2VuZXJhdGVXaW5kb3dGb3JGaXJzdE5vZGVCdXR0b24pXG5cblxuXG5cbi8vIGFkZGluZyBldmVudCBsaXN0ZW5lcnMgdG8gc3RydWN0dXJlIGJ1dHRvbnMgZnJvbSB0aGUgcmlnaHQgXG5jb25zdCBzdHJ1Y3R1cmVCdG5JZCA9ICcjc3RydWN0dXJlQnV0dG9ucydcblxuY29uc3QgaW1wb3J0U3RydWN0dXJlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHtzdHJ1Y3R1cmVCdG5JZH0gYnV0dG9uOmZpcnN0LW9mLXR5cGVgKVxuaW1wb3J0U3RydWN0dXJlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZ2VuZXJhdGVXaW5kb3dGb3JJbXBvcnRTdHJ1Y3R1cmVCdXR0b24pXG5cbmNvbnN0IGV4cG9ydFN0cnVjdHVyZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7c3RydWN0dXJlQnRuSWR9IGJ1dHRvbjpsYXN0LW9mLXR5cGVgKVxuZXhwb3J0U3RydWN0dXJlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZ2VuZXJhdGVXaW5kb3dGb3JFeHBvcnRTdHJ1Y3R1cmVCdXR0b24pXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=