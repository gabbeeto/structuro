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
  alert('addNodeToRight')
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTs7Ozs7Ozs7Ozs7QUM1RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQ2JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQXlCO0FBQ1E7QUFDQzs7QUFFbEM7QUFDMEY7QUFDQTtBQUNKO0FBQ0E7O0FBRXRGO0FBQ3VHO0FBQ0E7Ozs7QUFJdkc7QUFDQTs7QUFFQSxnREFBZ0QsV0FBVztBQUMzRCx3Q0FBd0MsbUdBQWtDOztBQUUxRSxnREFBZ0QsV0FBVztBQUMzRCx3Q0FBd0MsbUdBQWtDOztBQUUxRSw4Q0FBOEMsV0FBVztBQUN6RCxzQ0FBc0MsK0ZBQWdDOztBQUV0RSwrQ0FBK0MsV0FBVztBQUMxRCx1Q0FBdUMsK0ZBQWdDOzs7OztBQUt2RTtBQUNBOztBQUVBLHFEQUFxRCxnQkFBZ0I7QUFDckUsNkNBQTZDLGdIQUFzQzs7QUFFbkYscURBQXFELGdCQUFnQjtBQUNyRSw2Q0FBNkMsZ0hBQXNDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RydWN0dXJvLy4vaW5wdXQvZGlzcGxheUNvbnRlbnRJbmh0bWwuanMiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvLy4vaW5wdXQvbm9kZXMvY3JlYXRlTm9kZXMuanMiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvLy4vaW5wdXQvbm9kZXMvZWRpdE5vZGVzLmpzIiwid2VicGFjazovL3N0cnVjdHVyby8uL2lucHV0L25vZGVzL25vZGVTdHJ1Y3R1cmUuanMiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvLy4vaW5wdXQvbm9kZXMvcmVtb3ZlTm9kZXMuanMiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvLy4vaW5wdXQvbm9kZXMvc2VsZWN0ZWROb2Rlcy5qcyIsIndlYnBhY2s6Ly9zdHJ1Y3R1cm8vLi9pbnB1dC9ub2Rlcy91cGRhdGVTdHJ1Y3R1cmUuanMiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvLy4vaW5wdXQvd2luZG93cy9jdXJyZW50V2luZG93LmpzIiwid2VicGFjazovL3N0cnVjdHVyby8uL2lucHV0L3dpbmRvd3Mvbm9kZVdpbmRvd3MvY3JlYXRlTm9kZXMuanMiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvLy4vaW5wdXQvd2luZG93cy9ub2RlV2luZG93cy9lZGl0Tm9kZXMuanMiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvLy4vaW5wdXQvd2luZG93cy9ub2RlV2luZG93cy9maXJzdE5vZGUuanMiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvLy4vaW5wdXQvd2luZG93cy9ub2RlV2luZG93cy9yZW1vdmVOb2Rlcy5qcyIsIndlYnBhY2s6Ly9zdHJ1Y3R1cm8vLi9pbnB1dC93aW5kb3dzL3N0cnVjdHVyZVdpbmRvd3MvZXhwb3J0U3RydWN0dXJlLmpzIiwid2VicGFjazovL3N0cnVjdHVyby8uL2lucHV0L3dpbmRvd3Mvc3RydWN0dXJlV2luZG93cy9pbXBvcnRTdHJ1Y3R1cmUuanMiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvLy4vaW5wdXQvc3R5bGUvbWFpbi5jc3MiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvLy4vaW5wdXQvc3R5bGUvbm9kZS9ub2RlLmNzcyIsIndlYnBhY2s6Ly9zdHJ1Y3R1cm8vLi9pbnB1dC9zdHlsZS93aW5kb3dzLmNzcyIsIndlYnBhY2s6Ly9zdHJ1Y3R1cm8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3N0cnVjdHVyby8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3N0cnVjdHVyby8uL2lucHV0L3N0eWxlL21haW4uY3NzP2FiNTYiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvLy4vaW5wdXQvc3R5bGUvbm9kZS9ub2RlLmNzcz84NGYwIiwid2VicGFjazovL3N0cnVjdHVyby8uL2lucHV0L3N0eWxlL3dpbmRvd3MuY3NzPzczMmMiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3N0cnVjdHVyby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3N0cnVjdHVyby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9zdHJ1Y3R1cm8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9zdHJ1Y3R1cm8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9zdHJ1Y3R1cm8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3N0cnVjdHVyby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc3RydWN0dXJvL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9zdHJ1Y3R1cm8vLi9pbnB1dC9idXR0b25zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi9zdHlsZS9ub2RlL25vZGUuY3NzJztcbmltcG9ydCB7Y2hhbmdlU2VsZWN0ZWROb2RlfSBmcm9tICcuL25vZGVzL3NlbGVjdGVkTm9kZXMuanMnO1xuXG5cbmxldCBub2RlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25vZGVzJylcbndpbmRvdy5ub2RlU2l6ZUZvckNvbHVtblRlbXBsYXRlID0gW107XG53aW5kb3cubm9kZVNpemUgPSBbXTtcblxuZGlzcGxheUVsZW1lbnRzKClcblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlFbGVtZW50cygpIHtcbiAgbm9kZUNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgY2FsY3VsYXRlU3BhY2VJbnNpZGVTdHJ1Y3R1cmVBcnJheSgpXG4gIGNhbGN1bGF0ZVNpemVGb3JEaXNwbGF5KClcbiAgZGlzcGxheUluTm9kZXMoKVxufVxuXG5cblxuXG5mdW5jdGlvbiBjYWxjdWxhdGVTcGFjZUluc2lkZVN0cnVjdHVyZUFycmF5KCkge1xuICB3aW5kb3cuYW1vdW50T2ZTcGFjZUluTm9kZURpdnMgPSBbXVxuXG4gIHNlbGVjdGVkU3RydWN0dXJlLmZvckVhY2goKGRpdkZvck5vZGUpID0+IHtcblxuICAgIGxldCBBbW91bnRPZkV4aXN0aW5nU3BhY2VGcm9tVGhpc0RpdiA9IGRpdkZvck5vZGUucmVkdWNlKChhY2N1bXVsYXRvciwgY3VycmVudE5vZGUpID0+IGFjY3VtdWxhdG9yICsgY3VycmVudE5vZGUuYW1vdW50T2ZTcGFjZSwgMCk7XG4gICAgYW1vdW50T2ZTcGFjZUluTm9kZURpdnMucHVzaChBbW91bnRPZkV4aXN0aW5nU3BhY2VGcm9tVGhpc0RpdilcblxuICB9KVxufVxuXG5cblxuXG5mdW5jdGlvbiBjYWxjdWxhdGVTaXplRm9yRGlzcGxheSgpIHtcbiAgZm9yIChsZXQgc3RydWN0dXJlSW5kZXggaW4gc2VsZWN0ZWRTdHJ1Y3R1cmUpIHtcbiAgICBmb3IgKGxldCBub2RlIG9mIHNlbGVjdGVkU3RydWN0dXJlW3N0cnVjdHVyZUluZGV4XSkge1xuICAgICAgZ2V0V2lkdGhTaXplRm9yTm9kZShub2RlKVxuICAgIH1cbiAgICBnZXRUZXh0Rm9yR3JpZFRlbXBsYXRlKHN0cnVjdHVyZUluZGV4KVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldFdpZHRoU2l6ZUZvck5vZGUobm9kZSkge1xuICAvLyBpdCdzIGEgY29tcGFyaXNvbiBiZWNhdXNlIDAgYXMgYSBudW1iZXIgaXMgZmFsc3lcbiAgaWYgKGAke25vZGUuaW5kZXhGb3JQYXJlbnR9YCAhPSAnZmFsc2UnKSB7XG4gICAgLy8gaWYgdGhlcmUncyBhIHBhcmVudCB0aGVuLi4uXG5cbiAgICBsZXQgbm9kZVNwYWNlID0gbm9kZS5hbW91bnRPZlNwYWNlO1xuICAgIGxldCBkaXZTcGFjZSA9IGFtb3VudE9mU3BhY2VJbk5vZGVEaXZzW25vZGUuaW5kZXhGb3JTdHJ1Y3R1cmVdO1xuICAgIGxldCBwZXJjZW50YWdlQ2FsY3VsYXRpb24gPSAobm9kZVNwYWNlIC8gZGl2U3BhY2UpXG5cbiAgICAvLyBjb25zb2xlLmxvZyhub2RlLmluZGV4Rm9yU3RydWN0dXJlIC0xKVxuICAgIGxldCBwYXJlbnRFbGVtZW50U2l6ZSA9IHdpbmRvdy5ub2RlU2l6ZVtub2RlLmluZGV4Rm9yU3RydWN0dXJlIC0gMV1bbm9kZS5pbmRleEZvclBhcmVudF1cblxuICAgIGxldCBjYWxjdWxhdGlvbjIgPSAocGVyY2VudGFnZUNhbGN1bGF0aW9uICogcGFyZW50RWxlbWVudFNpemUpXG5cbiAgICAvLyBpZiBzdGF0ZW1lbnQgbWFkZSB0byBjb21iYXQgdGhlIHVuZGVmaW5lZCBwcm9ibGVtXG4gICAgaWYgKG5vZGVTaXplW25vZGUuaW5kZXhGb3JTdHJ1Y3R1cmVdKSB7XG4gICAgICB3aW5kb3cubm9kZVNpemVbbm9kZS5pbmRleEZvclN0cnVjdHVyZV1bbm9kZS5pbmRleEZvclNpYmxpbmddID0gY2FsY3VsYXRpb24yO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIG5vZGVTaXplW25vZGUuaW5kZXhGb3JTdHJ1Y3R1cmVdID0gW11cbiAgICAgIHdpbmRvdy5ub2RlU2l6ZVtub2RlLmluZGV4Rm9yU3RydWN0dXJlXVtub2RlLmluZGV4Rm9yU2libGluZ10gPSBjYWxjdWxhdGlvbjI7XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIC8vIGlmIHRoZXJlJ3Mgbm8gcGFyZW50LCBpdCBpcyAxMDAlIHdpZHRoXG4gICAgd2luZG93Lm5vZGVTaXplID0gW1sxMDBdXTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRUZXh0Rm9yR3JpZFRlbXBsYXRlKHN0cnVjdHVyZUluZGV4KSB7XG4gIGxldCBzaXplSW5mb3JtYXRpb25BcnJheSA9IFtdXG4gIGZvciAobGV0IHNpemUgb2Ygbm9kZVNpemVbc3RydWN0dXJlSW5kZXhdKSB7XG4gICAgc2l6ZUluZm9ybWF0aW9uQXJyYXkucHVzaChgJHtzaXplfSVgKVxuICAgIHNpemVJbmZvcm1hdGlvbkFycmF5LnB1c2goJyAnKVxuICB9XG4gIHdpbmRvdy5ub2RlU2l6ZUZvckNvbHVtblRlbXBsYXRlW3N0cnVjdHVyZUluZGV4XSA9IHNpemVJbmZvcm1hdGlvbkFycmF5LmpvaW4oJycpXG59XG5cblxuXG5cblxuZnVuY3Rpb24gZGlzcGxheUluTm9kZXMoKSB7XG4gIGxldCBub2RlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25vZGVzJyk7XG4gIGZvciAobGV0IGRpdkluZGV4IGluIHNlbGVjdGVkU3RydWN0dXJlKSB7XG4gICAgbGV0IGRpdkZvck5vZGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2Rm9yTm9kZXMuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGAke25vZGVTaXplRm9yQ29sdW1uVGVtcGxhdGVbZGl2SW5kZXhdfWA7XG4gICAgbm9kZUNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXZGb3JOb2RlcylcbiAgICBmb3IgKGxldCBub2RlIG9mIHNlbGVjdGVkU3RydWN0dXJlW2RpdkluZGV4XSkge1xuICAgICAgbGV0IG5vZGVUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgICBub2RlVGV4dC5pbm5lclRleHQgPSBub2RlLnRleHQ7XG4gICAgICBub2RlVGV4dC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBub2RlLmNvbG9yO1xuICAgICAgbm9kZVRleHQudmFsdWUgPSBgJHtub2RlLmluZGV4Rm9yU3RydWN0dXJlfS0ke25vZGUuaW5kZXhGb3JTaWJsaW5nfWA7XG4gICAgICBub2RlVGV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNoYW5nZVNlbGVjdGVkTm9kZSk7XG4gICAgICBkaXZGb3JOb2Rlcy5hcHBlbmRDaGlsZChub2RlVGV4dCk7XG4gICAgfVxuICB9XG59XG5cbiIsImltcG9ydCB7IHVwZGF0ZU5vZGVTdHJ1Y3R1cmUsIGFwcGVuZEFyZ3VtZW50IH0gZnJvbSAnLi91cGRhdGVTdHJ1Y3R1cmUuanMnXG5sZXQgZGl2SW5kZXg7XG5sZXQgbm9kZUluZGV4O1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGROb2RlVG9MZWZ0KCkge1xuICBmaXJzdE5vZGUuYW1vdW50T2ZTcGFjZSArPSAxO1xuICBkaXZJbmRleCA9IDA7XG4gIG5vZGVJbmRleCA9IDE7XG4gIGRpdmlkZVNlbGVjdGVkTm9kZSgpXG4gIHB1c2hUb2ZpcnN0Tm9kZShmYWxzZSlcblxuICB1cGRhdGVOb2RlU3RydWN0dXJlKClcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gYWRkTm9kZUNoaWxkKCkge1xuICBhbGVydCgnYWRkTm9kZVRvUmlnaHQnKVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGROb2RlVG9SaWdodCgpIHtcbiAgZmlyc3ROb2RlLmFtb3VudE9mU3BhY2UgKz0gMTtcbiAgZGl2SW5kZXggPSAwO1xuICBub2RlSW5kZXggPSAxO1xuICBkaXZpZGVTZWxlY3RlZE5vZGUoKVxuICBwdXNoVG9maXJzdE5vZGUodHJ1ZSlcblxuXG4gIHVwZGF0ZU5vZGVTdHJ1Y3R1cmUoKVxufVxuXG5mdW5jdGlvbiBkaXZpZGVTZWxlY3RlZE5vZGUoKSB7XG4gIGxldCBoeXBoZW4gPSBzZWxlY3RlZE5vZGUuaW5kZXhPZignLScpO1xuICBkaXZJbmRleCA9IHNlbGVjdGVkTm9kZS5zdWJzdHJpbmcoMCwgaHlwaGVuKTtcbiAgbm9kZUluZGV4ID0gc2VsZWN0ZWROb2RlLnN1YnN0cmluZyhoeXBoZW4gKyAxLCBzZWxlY3RlZE5vZGUubGVuZ3RoKTtcbn1cblxuXG5mdW5jdGlvbiBwdXNoVG9maXJzdE5vZGUob3JpZW50YXRpb24pIHtcbiAgbGV0IHB1c2hlZE5vZGUgPSBub2RlRWxlbWVudCgnbmV3IEVsZW1lbnQnLCAnYmxhY2snLCBbZW1wdHlFbGVtZW50KCldLCBub2RlSW5kZXggKyAxLCBub2RlU3RydWN0dXJlW2RpdkluZGV4XVtub2RlSW5kZXhdLmluZGV4Rm9yUGFyZW50LCBkaXZJbmRleCk7XG4gIHB1c2hUb1BhcmVudChKU09OLnN0cmluZ2lmeShwdXNoZWROb2RlKSwgb3JpZW50YXRpb24pXG59XG5cblxuZnVuY3Rpb24gcHVzaFRvUGFyZW50KHB1c2hlZE5vZGUsIHJpZ2h0T3JpZW50YXRpb24pIHtcbiAgbGV0IGNoaWxkID0gYXBwZW5kQXJndW1lbnQoJ2ZpcnN0Tm9kZScsICdjaGlsZHJlbicsIE51bWJlcihkaXZJbmRleCkpO1xuICBpZiAocmlnaHRPcmllbnRhdGlvbikge1xuICAgIGV2YWwoYCR7Y2hpbGR9LnNwbGljZSgke25vZGVJbmRleH0gKyAxLCAwLCR7cHVzaGVkTm9kZX0pYClcbiAgfVxuICBlbHNlIHtcbiAgICBldmFsKGAke2NoaWxkfS5zcGxpY2UoJHtub2RlSW5kZXh9ICwgMCwke3B1c2hlZE5vZGV9KWApXG4gIH1cblxufVxuXG4iLCJleHBvcnQgZnVuY3Rpb24gYXBwbHlFZGl0Q2hhbmdlcygpe1xuYWxlcnQoJ2FwcGx5RWRpdENoYW5nZXMgV29ya3MnKVxuXG5cbn1cbiIsIlxuLy8gZW1wdHkgZWxlbWVudHMgYXJlIGZvciBkaXNwbGF5aW5nIHB1cnBvc2VzIG9ubHlcblxud2luZG93LmVtcHR5RWxlbWVudCA9IGZ1bmN0aW9uKHRleHQgPSAnZW1wdHknLCBpbmRleEZvclBhcmVudCA9IHRydWUpIHtcbiAgcmV0dXJuIHsgdGV4dCwgaW5kZXhGb3JQYXJlbnQgfVxufVxuXG5cbndpbmRvdy5ub2RlRWxlbWVudCA9IGZ1bmN0aW9uKHRleHQgPSAnZW1wdHknLCBjb2xvciA9ICdibGFjaycsIGNoaWxkcmVuID0gW2VtcHR5RWxlbWVudCgpXSwgaW5kZXhGb3JTaWJsaW5nID0gMCwgaW5kZXhGb3JQYXJlbnQgPSBmYWxzZSwgaW5kZXhGb3JTdHJ1Y3R1cmUgPSAwLCBhbW91bnRPZlNwYWNlID0gMSkge1xuICByZXR1cm4geyB0ZXh0LCBjb2xvciwgY2hpbGRyZW4sIGluZGV4Rm9yU2libGluZywgaW5kZXhGb3JQYXJlbnQsIGluZGV4Rm9yU3RydWN0dXJlLCBhbW91bnRPZlNwYWNlIH1cbn1cblxuaWYgKGxvY2FsU3RvcmFnZS5ub2RlU3RydWN0dXJlKSB7XG4gIHdpbmRvdy5ub2RlU3RydWN0dXJlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2Uubm9kZVN0cnVjdHVyZS5tYWluKVxuICB3aW5kb3cuc2VsZWN0ZWRTdHJ1Y3R1cmUgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5ub2RlU3RydWN0dXJlLnNlbGVjdGVkKVxufVxuZWxzZSB7XG4gIHdpbmRvdy5maXJzdE5vZGUgPSBub2RlRWxlbWVudCgnZmlyc3RFbGVtZW50JywgJ2JsYWNrJywgW25vZGVFbGVtZW50KCdzZWNvbmRFbGVtZW50JywgJ3BpbmsnKSwgbm9kZUVsZW1lbnQoJ3RoaXJkRWxlbWVudCcsICdncmF5JyldKTtcbiAgZmlyc3ROb2RlLmFtb3VudE9mU3BhY2UgPSAyO1xuICBmaXJzdE5vZGUuY2hpbGRyZW5bMF0uaW5kZXhGb3JTdHJ1Y3R1cmUgPSAxO1xuICBmaXJzdE5vZGUuY2hpbGRyZW5bMV0uaW5kZXhGb3JTdHJ1Y3R1cmUgPSAxO1xuICBmaXJzdE5vZGUuY2hpbGRyZW5bMV0uaW5kZXhGb3JTaWJsaW5nID0gMTtcbiAgZmlyc3ROb2RlLmNoaWxkcmVuWzBdLmluZGV4Rm9yUGFyZW50ID0gMDtcbiAgZmlyc3ROb2RlLmNoaWxkcmVuWzFdLmluZGV4Rm9yUGFyZW50ID0gMDtcblxuICB3aW5kb3cubm9kZVN0cnVjdHVyZSA9IFtbZmlyc3ROb2RlXSwgW2ZpcnN0Tm9kZS5jaGlsZHJlblswXSwgZmlyc3ROb2RlLmNoaWxkcmVuWzFdXV07XG5cbiAgd2luZG93LnNlbGVjdGVkU3RydWN0dXJlID0gbm9kZVN0cnVjdHVyZTtcbn1cblxuXG5cblxuXG5cblxuXG5cblxuIiwiYWxlcnQoJ3JlbW92ZU5vZGVzIHdvcmtpbmcnKVxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZU5vZGUoKXtcbmFsZXJ0KCdyZW1vdmVOb2RlJylcblxuXG59XG4iLCJ3aW5kb3cuc2VsZWN0ZWROb2RlID0gJyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VTZWxlY3RlZE5vZGUoZXZlbnQpIHtcbiAgd2luZG93LnNlbGVjdGVkTm9kZSA9IGV2ZW50LnRhcmdldC52YWx1ZVxuICBkaXNwbGF5U2VsZWN0ZWQoKTtcbiAgZGlzcGxheU5vZGVCdXR0b25zKCk7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlTZWxlY3RlZCgpIHtcbiAgbGV0IHBUYWdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI25vZGVzIHAnKTtcbiAgZm9yIChsZXQgcFRhZyBvZiBwVGFncykge1xuICAgIC8vIGNvbnNvbGUubG9nKHBUYWcpO1xuICAgIHBUYWcuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKVxuICAgIGlmIChwVGFnLnZhbHVlID09IHNlbGVjdGVkTm9kZSkge1xuICAgICAgcFRhZy5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlOb2RlQnV0dG9ucygpIHtcbiAgbGV0IG5vZGVCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25vZGVCdXR0b25zJylcbiAgbm9kZUJ1dHRvbnMuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgc2V0VGltZW91dCgoKSA9PiBub2RlQnV0dG9ucy5zdHlsZS5vcGFjaXR5ID0gJzEnLCA1MFxuICApXG59XG5cbiIsImltcG9ydCB7IGRpc3BsYXlFbGVtZW50c30gZnJvbSAnLi8uLi9kaXNwbGF5Q29udGVudEluaHRtbCdcblxubGV0IGNoaWxkcmVuID0gMDtcbmxldCBhbW91bnRPZlNwYWNlID0gMTtcbmxldCBzaWJsaW5nSW5kZXggPSAwO1xubGV0IG5ld0FycmF5ID0gW1tdXTtcbmxldCBwcmV2aW91c05vZGUgPSAnJztcblxuXG4vLyB1cGRhdGUgTm9kZSBTdHJ1Y3R1cmUgRnVuY3Rpb25hbGl0eVxuXG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVOb2RlU3RydWN0dXJlKCkge1xuICBjaGlsZHJlbiA9IDA7XG4gIGFtb3VudE9mU3BhY2UgPSAxO1xuICBzaWJsaW5nSW5kZXggPSAwO1xuICBwcmV2aW91c05vZGUgPSAnZmlyc3ROb2RlJztcbiAgbmV3QXJyYXkgPSBbW2ZpcnN0Tm9kZV1dO1xuXG5cbiAgaXRlcmF0ZVRocm91Z2hDaGlsZHJlblRvVXBkYXRlSW5kZXgoZmlyc3ROb2RlKVxuICB1cGRhdGVBbW91bnRPZlNwYWNlKClcbiAgbm9kZVN0cnVjdHVyZSA9IG5ld0FycmF5O1xuICBzZWxlY3RlZFN0cnVjdHVyZSA9IG5vZGVTdHJ1Y3R1cmU7XG4gIGRpc3BsYXlFbGVtZW50cygpXG59XG5cblxuXG5cblxuXG4vLyBpbiB0aGUgbW9tZW50IHRoaXMgd29ya3MgYnV0IGRvbid0IGJlIHN1cnByaXNlZCBpZiB5b3UgaGF2ZSB0byBmaXggaXQgaW4gdGhlIGZ1dHVyZVxuZnVuY3Rpb24gaXRlcmF0ZVRocm91Z2hDaGlsZHJlblRvVXBkYXRlSW5kZXgobm9kZSkge1xuICAvLyB0aGlzIGlzIGEgcmVjdXJzaXZlIG1ldGhvZCB0aGF0IGRvZXMgdGhlIGZvbGxvd2luZzpcblxuICAvLyAxIGZyb20gdG9wIHRvIGJvdHRvbSB0cnkgdG8gcmVhY2ggdGhlIGVtcHR5IGVsZW1lbnRcbiAgLy8gMi4gY2hlY2sgaWYgbGFzdCBlbGVtZW50IGhhcyBzaWJsaW5ncywgaWYgbm90Li4gY29tZSBiYWNrIHRvIHRoZSBwcmV2aW91cyBjaGlsZHJlbiB3aXRoIHNpYmxpbmdzXG4gIC8vIDMuIGZpbmQgcHJldmlvdXMgY2hpbGRyZW4gd2l0aCBzaWJsaW5nIGFuZCByZXBlYXQgdG9wIHRvIGJvdHRvbSBwcm9jcmVzcyB1bnRpbCBpdCByZWFjaGVzIHRvIGVtcHR5IGVsZW1lbnRcbiAgLy8gKGFsc28gdXBkYXRlcyBpbmZvcm1hdGlvbiBzdWNoIGFzIGluZGV4Rm9yUGFyZW50LGluZGV4Rm9yU2libGluZyxJbmRleEZvclN0cnVjdHVyZSlcblxuICBpZiAobm9kZS5jaGlsZHJlblswXS5jb2xvcikge1xuXG4gICAgdXBkYXRlSW5mb3JtYXRpb25Gb3JDdXJyZW50Tm9kZShub2RlKVxuICAgIHVwZGF0ZUFycmF5KG5vZGUpXG5cbiAgICBjaGlsZHJlbiA9IGNoaWxkcmVuICsgMTtcblxuXG4gICAgbGV0IGNoaWxkID0gYXBwZW5kQXJndW1lbnQoYCR7cHJldmlvdXNOb2RlfWAsIGBjaGlsZHJlblske3NpYmxpbmdJbmRleH1dYCwgMSlcbiAgICBwcmV2aW91c05vZGUgPSBjaGlsZDtcblxuICAgIGl0ZXJhdGVUaHJvdWdoQ2hpbGRyZW5Ub1VwZGF0ZUluZGV4KGV2YWwoY2hpbGQpKVxuICB9XG4gIGVsc2Uge1xuICAgIGFtb3VudE9mU3BhY2UgKz0gMTtcbiAgICBzaWJsaW5nSW5kZXggKz0gMTtcbiAgICBmaW5kU2libGluZyhub2RlKVxuICB9XG59XG5cblxuZnVuY3Rpb24gdXBkYXRlQXJyYXkobm9kZSkge1xuICAvL2NyZWF0ZXMgbmV3IGFycmF5IGluIGNhc2Ugb2YgaW5leGlzdGluZyBhcnJheTtcbiAgaWYgKCFuZXdBcnJheVtjaGlsZHJlbiArIDFdKSB7XG4gICAgbmV3QXJyYXlbY2hpbGRyZW4gKyAxXSA9IFtdXG4gIH1cbiAgLy8gaXQgZG9lc24ndCB1cGRhdGUgdGhlIGZpcnN0IG5vZGUgYmVjYXVzZSBpdCBpcyBhbHdheXMgJ2ZpcnN0IG5vZGUnXG4gIG5ld0FycmF5W2NoaWxkcmVuICsgMV1bc2libGluZ0luZGV4XSA9IGV2YWwoYXBwZW5kQXJndW1lbnQoYCR7cHJldmlvdXNOb2RlfWAsIGBjaGlsZHJlblske3NpYmxpbmdJbmRleH1dYCwgMSkpO1xuXG59XG5cblxuXG5cblxuZnVuY3Rpb24gdXBkYXRlSW5mb3JtYXRpb25Gb3JDdXJyZW50Tm9kZSgpIHtcbiAgbGV0IG5vZGUgPSBldmFsKGFwcGVuZEFyZ3VtZW50KGAke3ByZXZpb3VzTm9kZX1gLCBgY2hpbGRyZW5bJHtzaWJsaW5nSW5kZXh9XWAsIDEpKTtcblxuICAvLyB1cGRhdGUgaW5kZXggZm9yIHBhcmVudFxuICBpZiAobm9kZS5pbmRleEZvclBhcmVudCkge1xuICAgIG5vZGUuaW5kZXhGb3JQYXJlbnQgPSBuZXdBcnJheVtjaGlsZHJlbiArIDFdW3NpYmxpbmdJbmRleF0uaW5kZXhGb3JTaWJsaW5nXG4gIH1cblxuICAvLyB1cGRhdGUgaW5kZXggZm9yIHNpYmxpbmcgXG4gIG5vZGUuaW5kZXhGb3JTaWJsaW5nID0gc2libGluZ0luZGV4O1xuICAvLyB1cGRhdGUgaW5kZXggZm9yIHNpYmxpbmcgXG4gIG5vZGUuaW5kZXhGb3JTdHJ1Y3R1cmUgPSBjaGlsZHJlbiArIDE7XG5cbn1cblxuXG5cblxuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQXJndW1lbnQodmFyaWFibGVUb0FwcGVuZCwgYXBwZW5kZWRWYXJpYWJsZSwgbnVtYmVyT2ZUaW1lcykge1xuICBsZXQgYXJyYXkgPSBbYCR7dmFyaWFibGVUb0FwcGVuZH1gXVxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbnVtYmVyT2ZUaW1lczsgaW5kZXgrKykge1xuICAgIGFycmF5LnB1c2goYC4ke2FwcGVuZGVkVmFyaWFibGV9YClcbiAgfVxuICByZXR1cm4gYXJyYXkuam9pbignJylcblxufVxuXG5cblxuXG5cblxuZnVuY3Rpb24gZmluZFNpYmxpbmcobm9kZSkge1xuICAvLyAyLiBjaGVjayBpZiBsYXN0IGVsZW1lbnQgaGFzIHNpYmxpbmdzLCBpZiBub3QuLiBjb21lIGJhY2sgdG8gdGhlIHByZXZpb3VzIGNoaWxkcmVuIHdpdGggc2libGluZ3NcblxuXG4gIGxldCBub2RlV2l0aG91dFByZXZpb3VzU2libGluZyA9IHByZXZpb3VzTm9kZS5zdWJzdHJpbmcoMCwgcHJldmlvdXNOb2RlLmxlbmd0aCAtIDMpO1xuXG4gIGxldCBub2RlV2l0aFVwZGF0ZWRTaWJsaW5nID0gYCR7bm9kZVdpdGhvdXRQcmV2aW91c1NpYmxpbmd9WyR7c2libGluZ0luZGV4fV1gO1xuXG4gIGxldCBhcnJheVdpdGhvdXRUaGVMYXN0Q2hpbGRyZW4gPSBub2RlV2l0aG91dFByZXZpb3VzU2libGluZy5zcGxpdCgnLicpXG4gIGNoaWxkcmVuIC09IDE7XG4gIGFycmF5V2l0aG91dFRoZUxhc3RDaGlsZHJlbi5wb3AoKVxuICBhcnJheVdpdGhvdXRUaGVMYXN0Q2hpbGRyZW4gPSBhcnJheVdpdGhvdXRUaGVMYXN0Q2hpbGRyZW4uam9pbignLicpXG5cbiAgaWYgKGV2YWwobm9kZVdpdGhVcGRhdGVkU2libGluZykpIHtcblxuICAgIHByZXZpb3VzTm9kZSA9IGFycmF5V2l0aG91dFRoZUxhc3RDaGlsZHJlbjtcblxuICAgIGl0ZXJhdGVUaHJvdWdoQ2hpbGRyZW5Ub1VwZGF0ZUluZGV4KGV2YWwoYXJyYXlXaXRob3V0VGhlTGFzdENoaWxkcmVuKSlcbiAgfVxuICBlbHNlIHtcbiAgICBpZiAoYW1vdW50T2ZTcGFjZSA8IGZpcnN0Tm9kZS5hbW91bnRPZlNwYWNlKSB7XG5cbiAgICAgIGZpbmRTaWJsaW5nKClcblxuICAgIH1cbiAgfVxufVxuXG5cblxuXG5cblxuZnVuY3Rpb24gdXBkYXRlQW1vdW50T2ZTcGFjZSgpIHtcbiAgcmVtb3ZlQW1vdW50T2ZTcGFjZVRvQXJyYXkoKVxuICBhZGRBbW91bnRPZlNwYWNlVG9BcnJheSgpXG59XG5cbmZ1bmN0aW9uIHJlbW92ZUFtb3VudE9mU3BhY2VUb0FycmF5KCkge1xuICBmb3IgKGxldCBzdWJBcnJheSA9IG5ld0FycmF5Lmxlbmd0aCAtIDE7IHN1YkFycmF5ID4gLTE7IHN1YkFycmF5ID0gc3ViQXJyYXkgLSAxKSB7XG4gICAgZm9yIChsZXQgaW5kZXgyID0gMDsgaW5kZXgyIDwgbmV3QXJyYXlbc3ViQXJyYXldLmxlbmd0aDsgaW5kZXgyKyspIHtcbiAgICAgIGxldCBub2RlID0gbmV3QXJyYXlbc3ViQXJyYXldW2luZGV4Ml07XG4gICAgICBub2RlLmFtb3VudE9mU3BhY2UgPSAwO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRBbW91bnRPZlNwYWNlVG9BcnJheSgpIHtcbiAgZm9yIChsZXQgc3ViQXJyYXkgPSBuZXdBcnJheS5sZW5ndGggLSAxOyBzdWJBcnJheSA+IC0xOyBzdWJBcnJheSA9IHN1YkFycmF5IC0gMSkge1xuICAgIGZvciAobGV0IGluZGV4MiA9IDA7IGluZGV4MiA8IG5ld0FycmF5W3N1YkFycmF5XS5sZW5ndGg7IGluZGV4MisrKSB7XG4gICAgICBsZXQgbm9kZSA9IG5ld0FycmF5W3N1YkFycmF5XVtpbmRleDJdO1xuICAgICAgbm9kZS5hbW91bnRPZlNwYWNlID0gbm9kZS5jaGlsZHJlbi5sZW5ndGg7XG4gICAgICBpZiAobm9kZS5jaGlsZHJlblswXS5hbW91bnRPZlNwYWNlKSB7XG4gICAgICAgIG5vZGUuYW1vdW50T2ZTcGFjZSA9IGdldENoaWxkcmVuQW1vdW50T2ZTcGFjZShub2RlKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGdldENoaWxkcmVuQW1vdW50T2ZTcGFjZShub2RlKSB7XG4gIGxldCBhbW91bnRPZlNwYWNlID0gMDtcbiAgZm9yIChsZXQgaW5kZXgzIGluIG5vZGUuY2hpbGRyZW4pIHtcbiAgICBsZXQgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuW2luZGV4M107XG4gICAgYW1vdW50T2ZTcGFjZSA9IGFtb3VudE9mU3BhY2UgKyBjaGlsZHJlbi5hbW91bnRPZlNwYWNlXG4gIH1cbiAgcmV0dXJuIGFtb3VudE9mU3BhY2Vcbn1cbiIsImltcG9ydCAnLi8uLi9zdHlsZS93aW5kb3dzLmNzcydcblxud2luZG93LndpbmRvd1Byb3BlcnRpZXMgPSB7aXNXaW5kb3dOb3RPcGVuOiB0cnVlLH1cblxuZXhwb3J0IGxldCAgY3VycmVudFdpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjdXJyZW50V2luZG93Jyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9zZVdpbmRvdygpe1xuY3VycmVudFdpbmRvdy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuY3VycmVudFdpbmRvdy5pbm5lckhUTUwgPSAnJztcbndpbmRvd1Byb3BlcnRpZXMuaXNXaW5kb3dOb3RPcGVuID0gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uICBkaXNwbGF5V2luZG93KCl7XG5jdXJyZW50V2luZG93LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG59XG5cbmNvbnN0IGVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyIGRpdicpO1xuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheVdpbmRvd0Vycm9yKCl7XG5lcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSBgY2FuJ3Qgb3BlbiAyIHdpbmRvd3NgO1xuc2V0VGltZW91dChtYWtlSXRWaXNpYmxlLDEwMClcbn1cblxuZnVuY3Rpb24gbWFrZUl0VmlzaWJsZSgpe1xuZXJyb3JDb250YWluZXIuc3R5bGUub3BhY2l0eSA9ICcxJ1xuc2V0VGltZW91dChtYWtlSXRJbnZpc2libGUsIDQwMDApXG59XG5cblxuZnVuY3Rpb24gbWFrZUl0SW52aXNpYmxlKCl7XG5lcnJvckNvbnRhaW5lci5zdHlsZS5vcGFjaXR5ID0gJzAnXG59XG5cblxuIiwiaW1wb3J0IHsgY3VycmVudFdpbmRvdywgY2xvc2VXaW5kb3csIGRpc3BsYXlXaW5kb3csIGRpc3BsYXlXaW5kb3dFcnJvciB9IGZyb20gJy4vLi4vY3VycmVudFdpbmRvdy5qcydcbmltcG9ydCB7IGFkZE5vZGVUb0xlZnQsIGFkZE5vZGVUb1JpZ2h0LCBhZGROb2RlQ2hpbGQgfSBmcm9tICcuLy4uLy4uL25vZGVzL2NyZWF0ZU5vZGVzLmpzJ1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVdpbmRvd0ZvckNyZWF0ZU5vZGVzQnV0dG9uKCkge1xuICBpZih3aW5kb3dQcm9wZXJ0aWVzLmlzV2luZG93Tm90T3Blbikge1xuXG5cbmlmKHNlbGVjdGVkTm9kZVswXSA9PSAnMCcpe1xuICAgIGN1cnJlbnRXaW5kb3cuaW5uZXJIVE1MID0gYDxidXR0b24gaWQ9J2Nsb3NlV2luZG93Jz5jbG9zZTwvYnV0dG9uPlxuICAgIDxkaXY+XG4gICAgPGJ1dHRvbiBpZD1cImFkZE5vZGVDaGlsZFwiPmFkZCBjaGlsZDwvYnV0dG9uPlxuICAgIDwvZGl2PmA7XG4gICAgfVxuICAgIGVsc2V7XG5cbiAgICBjdXJyZW50V2luZG93LmlubmVySFRNTCA9IGA8YnV0dG9uIGlkPSdjbG9zZVdpbmRvdyc+Y2xvc2U8L2J1dHRvbj5cbiAgICA8ZGl2PlxuICAgIDxidXR0b24gaWQ9XCJhZGROb2RlVG9UaGVMZWZ0XCI+bGVmdDwvYnV0dG9uPlxuICAgIDxidXR0b24gaWQ9XCJhZGROb2RlQ2hpbGRcIj5hZGQgY2hpbGQ8L2J1dHRvbj5cbiAgICA8YnV0dG9uIGlkPVwiYWRkTm9kZVRvVGhlUmlnaHRcIj5yaWdodDwvYnV0dG9uPlxuICAgIDwvZGl2PmA7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkTm9kZVRvVGhlTGVmdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkTm9kZVRvTGVmdCk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZE5vZGVUb1RoZVJpZ2h0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhZGROb2RlVG9SaWdodCk7XG4gICAgfVxuXG5cblxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nsb3NlV2luZG93JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVdpbmRvdyk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZE5vZGVDaGlsZCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkTm9kZUNoaWxkKTtcblxuICAgIHdpbmRvd1Byb3BlcnRpZXMuaXNXaW5kb3dOb3RPcGVuID0gZmFsc2U7XG4gICAgZGlzcGxheVdpbmRvdygpO1xuICB9XG4gIGVsc2V7XG4gIGRpc3BsYXlXaW5kb3dFcnJvcigpXG4gIH1cbn1cbiIsImltcG9ydCB7IGN1cnJlbnRXaW5kb3csIGNsb3NlV2luZG93LCBkaXNwbGF5V2luZG93LCBkaXNwbGF5V2luZG93RXJyb3IgfSBmcm9tICcuLy4uL2N1cnJlbnRXaW5kb3cuanMnXG5pbXBvcnQgeyBhcHBseUVkaXRDaGFuZ2VzfSBmcm9tICcuLy4uLy4uL25vZGVzL2VkaXROb2Rlcy5qcydcblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlV2luZG93Rm9yRWRpdE5vZGVzQnV0dG9uKCkge1xuXG4gIGlmICh3aW5kb3dQcm9wZXJ0aWVzLmlzV2luZG93Tm90T3Blbikge1xuICAgIGFsZXJ0KCdnZW5lcmF0ZVdpbmRvd0ZvckVkaXROb2Rlc0J1dHRvbicpXG5cbiAgICBjdXJyZW50V2luZG93LmlubmVySFRNTCA9IGA8YnV0dG9uIGlkPSdjbG9zZVdpbmRvdyc+Y2xvc2U8L2J1dHRvbj5cbiAgICA8cD50ZXh0OjwvcD5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIj5cbiAgICA8cD5jb2xvcjo8L3A+XG4gICAgPGlucHV0IHR5cGU9XCJjb2xvclwiIGlkPVwiXCI+XG4gICAgPGJ1dHRvbiBpZD0nYXBwbHlFZGl0Q2hhbmdlcyc+YXBwbHk8L2J1dHRvbj5gO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nsb3NlV2luZG93JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVdpbmRvdyk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcGx5RWRpdENoYW5nZXMnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFwcGx5RWRpdENoYW5nZXMpO1xuXG4gICAgd2luZG93UHJvcGVydGllcy5pc1dpbmRvd05vdE9wZW4gPSBmYWxzZTtcbiAgICBkaXNwbGF5V2luZG93KCk7XG4gIH1cbiAgZWxzZXtcbiAgZGlzcGxheVdpbmRvd0Vycm9yKClcbiAgfVxufVxuXG4iLCJpbXBvcnQgeyBjdXJyZW50V2luZG93LCBjbG9zZVdpbmRvdywgZGlzcGxheVdpbmRvdywgZGlzcGxheVdpbmRvd0Vycm9yIH0gZnJvbSAnLi8uLi9jdXJyZW50V2luZG93LmpzJztcbmltcG9ydCB7IGFwcGx5Rmlyc3ROb2RlRnVuYyB9IGZyb20gJy4vLi4vLi4vbm9kZXMvZmlyc3ROb2RlLmpzJztcblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVdpbmRvd0ZvckZpcnN0Tm9kZUJ1dHRvbigpIHtcblxuXG4gIGlmICh3aW5kb3dQcm9wZXJ0aWVzLmlzV2luZG93Tm90T3Blbikge1xuICAgIGN1cnJlbnRXaW5kb3cuaW5uZXJIVE1MID0gYDxidXR0b24gaWQ9J2Nsb3NlV2luZG93Jz5jbG9zZTwvYnV0dG9uPlxuICAgIDxwPkZpcnN0IE5vZGU8L3A+XG4gICAgPHNlbGVjdCBuYW1lPVwiXCIgaWQ9XCJcIj5cbiAgICA8L3NlbGVjdD5cbiAgICA8YnV0dG9uIGlkPVwiYXBwbHlGaXJzdE5vZGVGdW5jXCI+YXBwbHk8L2J1dHRvbj5gO1xuXG4gICAgYXBwZW5kTm9kZXNGcm9tTm9kZVN0cnVjdHVyZSgpXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nsb3NlV2luZG93JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVdpbmRvdyk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcGx5Rmlyc3ROb2RlRnVuYycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXBwbHlGaXJzdE5vZGVGdW5jKTtcblxuICAgIHdpbmRvd1Byb3BlcnRpZXMuaXNXaW5kb3dOb3RPcGVuID0gZmFsc2U7XG4gICAgZGlzcGxheVdpbmRvdygpO1xuICB9XG4gIGVsc2Uge1xuICAgIGRpc3BsYXlXaW5kb3dFcnJvcigpXG4gIH1cblxufVxuXG5mdW5jdGlvbiBhcHBlbmROb2Rlc0Zyb21Ob2RlU3RydWN0dXJlKCkge1xubGV0IHNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjdXJyZW50V2luZG93IHNlbGVjdCcpXG4gIGZvciAobGV0IGRpdiBvZiBub2RlU3RydWN0dXJlKSB7XG4gICAgZm9yIChsZXQgbm9kZSBvZiBkaXYpIHtcbiAgICAgIC8vIHRoaXMgY2hlY2tzIHRoYXQgaXQncyBub3QgYW4gZW1wdHkgZWxlbWVudFxuICAgICAgaWYgKG5vZGUuY29sb3IpIHtcbiAgICAgICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICBvcHRpb24uaW5uZXJUZXh0ID0gbm9kZS50ZXh0O1xuICAgICAgICBvcHRpb24udmFsdWUgPSBgJHtub2RlLmluZGV4Rm9yU3RydWN0dXJlfS0ke25vZGUuaW5kZXhGb3JTaWJsaW5nfWA7XG4gICAgICAgIGNoZWNrSWZJdE1hcmNoZXNTZWxlY3RlZE5vZGUob3B0aW9uKVxuICAgICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tJZkl0TWFyY2hlc1NlbGVjdGVkTm9kZShvcHRpb24pe1xuaWYob3B0aW9uLnZhbHVlID09IHdpbmRvdy5zZWxlY3RlZE5vZGUpe1xub3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcbn1cbn1cbiIsImltcG9ydCB7IGN1cnJlbnRXaW5kb3csIGNsb3NlV2luZG93LCBkaXNwbGF5V2luZG93LGRpc3BsYXlXaW5kb3dFcnJvciB9IGZyb20gJy4vLi4vY3VycmVudFdpbmRvdy5qcydcbmltcG9ydCB7IHJlbW92ZU5vZGUgfSBmcm9tICcuLy4uLy4uL25vZGVzL3JlbW92ZU5vZGVzLmpzJ1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlV2luZG93Rm9yUmVtb3ZlTm9kZXNCdXR0b24oKSB7XG5cbiAgaWYgKHdpbmRvd1Byb3BlcnRpZXMuaXNXaW5kb3dOb3RPcGVuKSB7XG4gICAgY3VycmVudFdpbmRvdy5pbm5lckhUTUwgPSBgPHA+YXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzPzwvcD5cbiAgICA8ZGl2PjxidXR0b24gaWQ9J2FjY2VwdERlbGV0ZSc+eWVzPC9idXR0b24+PGJ1dHRvbiBpZD0nZGVueURlbGV0ZSc+bm88L2J1dHRvbj48L2Rpdj5gO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FjY2VwdERlbGV0ZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVtb3ZlTm9kZSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RlbnlEZWxldGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlV2luZG93ICk7XG5cbiAgICB3aW5kb3dQcm9wZXJ0aWVzLmlzV2luZG93Tm90T3BlbiA9IGZhbHNlO1xuICAgIGRpc3BsYXlXaW5kb3coKVxuICB9XG4gIGVsc2V7XG4gIGRpc3BsYXlXaW5kb3dFcnJvcigpXG4gIH1cbn1cblxuXG4iLCJleHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVXaW5kb3dGb3JFeHBvcnRTdHJ1Y3R1cmVCdXR0b24oKXtcbmFsZXJ0KCdnZW5lcmF0ZVdpbmRvd0ZvckV4cG9ydFN0cnVjdHVyZUJ1dHRvbicpXG5cblxufVxuIiwiXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVXaW5kb3dGb3JJbXBvcnRTdHJ1Y3R1cmVCdXR0b24oKXtcbmFsZXJ0KCdnZW5lcmF0ZVdpbmRvd0ZvckltcG9ydFN0cnVjdHVyZUJ1dHRvbicpXG59XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgKntcbnBhZGRpbmc6IDA7XG5tYXJnaW46IDA7XG5ib3gtc2l6aW5nOmJvcmRlci1ib3g7XG59XG5cblxuOnJvb3R7XG4tLXdoaXRlOndoaXRlO1xuLS1ibGFjazpibGFjaztcbi0teWVsbG93OiNFQTlCMEU7XG59XG5cbi8qIHJlcGV0aXRpdmUgc2VjdGlvbiAqL1xuaGVhZGVyLCAjYnV0dG9uc3tcbmRpc3BsYXk6ZmxleDtcblxuXG59XG5cblxuYm9keXtcbmJhY2tncm91bmQtY29sb3I6IHZhcigtLWJsYWNrKTtcbmNvbG9yOiB2YXIoLS13aGl0ZSk7XG59XG5cbmhlYWRlcntcbnBvc2l0aW9uOnJlbGF0aXZlO1xuYm9yZGVyLWJvdHRvbToycHggc29saWQgdmFyKC0td2hpdGUpO1xuanVzdGlmeS1jb250ZW50OmNlbnRlcjtcbmFsaWduLWl0ZW1zOmNlbnRlcjtcbn1cblxuLyogZXJyb3IgY29udGFpbmVyICovXG5oZWFkZXIgZGl2e1xucG9zaXRpb246IGFic29sdXRlO1xucmlnaHQ6MDtcbm9wYWNpdHk6IDA7XG50cmFuc2l0aW9uOm9wYWNpdHkgMnM7XG59XG5cblxuXG5cbm1haW57XG5wb3NpdGlvbjpyZWxhdGl2ZTtcbn1cblxuYnV0dG9ue1xuYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmxhY2spO1xuY29sb3I6IHZhcigtLXdoaXRlKTtcbmJvcmRlcjogMnB4IHNvbGlkIHZhcigtLXdoaXRlKTtcbnRyYW5zaXRpb246YWxsIDUwMG1zO1xucGFkZGluZzowLjh2dztcbmJvcmRlci1yYWRpdXM6MTBweDtcbn1cblxuYnV0dG9uOmhvdmVye1xuYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td2hpdGUpO1xuY29sb3I6IHZhcigtLWJsYWNrKTtcbmJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWJsYWNrKTtcbiBcbn1cblxuI2J1dHRvbnN7XG4gIHRvcDoydmg7XG4gIHdpZHRoOjEwMCU7XG4gIHBvc2l0aW9uOmFic29sdXRlO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5cbiNub2RlQnV0dG9uc3tcbmRpc3BsYXk6IG5vbmU7XG5vcGFjaXR5OiAwO1xuZ2FwOjAuNXZ3O1xudHJhbnNpdGlvbjogb3BhY2l0eSAycztcbn1cblxuLnNlbGVjdGVke1xub3V0bGluZToycHggc29saWQgdmFyKC0teWVsbG93KVxuXG59XG5cblxuXG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL2lucHV0L3N0eWxlL21haW4uY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0FBQ0EsVUFBVTtBQUNWLFNBQVM7QUFDVCxxQkFBcUI7QUFDckI7OztBQUdBO0FBQ0EsYUFBYTtBQUNiLGFBQWE7QUFDYixnQkFBZ0I7QUFDaEI7O0FBRUEsdUJBQXVCO0FBQ3ZCO0FBQ0EsWUFBWTs7O0FBR1o7OztBQUdBO0FBQ0EsOEJBQThCO0FBQzlCLG1CQUFtQjtBQUNuQjs7QUFFQTtBQUNBLGlCQUFpQjtBQUNqQixvQ0FBb0M7QUFDcEMsc0JBQXNCO0FBQ3RCLGtCQUFrQjtBQUNsQjs7QUFFQSxvQkFBb0I7QUFDcEI7QUFDQSxrQkFBa0I7QUFDbEIsT0FBTztBQUNQLFVBQVU7QUFDVixxQkFBcUI7QUFDckI7Ozs7O0FBS0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQSw4QkFBOEI7QUFDOUIsbUJBQW1CO0FBQ25CLDhCQUE4QjtBQUM5QixvQkFBb0I7QUFDcEIsYUFBYTtBQUNiLGtCQUFrQjtBQUNsQjs7QUFFQTtBQUNBLDhCQUE4QjtBQUM5QixtQkFBbUI7QUFDbkIsOEJBQThCOztBQUU5Qjs7QUFFQTtFQUNFLE9BQU87RUFDUCxVQUFVO0VBQ1YsaUJBQWlCO0VBQ2pCLDhCQUE4QjtBQUNoQzs7QUFFQTtBQUNBLGFBQWE7QUFDYixVQUFVO0FBQ1YsU0FBUztBQUNULHNCQUFzQjtBQUN0Qjs7QUFFQTtBQUNBOztBQUVBXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIip7XFxucGFkZGluZzogMDtcXG5tYXJnaW46IDA7XFxuYm94LXNpemluZzpib3JkZXItYm94O1xcbn1cXG5cXG5cXG46cm9vdHtcXG4tLXdoaXRlOndoaXRlO1xcbi0tYmxhY2s6YmxhY2s7XFxuLS15ZWxsb3c6I0VBOUIwRTtcXG59XFxuXFxuLyogcmVwZXRpdGl2ZSBzZWN0aW9uICovXFxuaGVhZGVyLCAjYnV0dG9uc3tcXG5kaXNwbGF5OmZsZXg7XFxuXFxuXFxufVxcblxcblxcbmJvZHl7XFxuYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmxhY2spO1xcbmNvbG9yOiB2YXIoLS13aGl0ZSk7XFxufVxcblxcbmhlYWRlcntcXG5wb3NpdGlvbjpyZWxhdGl2ZTtcXG5ib3JkZXItYm90dG9tOjJweCBzb2xpZCB2YXIoLS13aGl0ZSk7XFxuanVzdGlmeS1jb250ZW50OmNlbnRlcjtcXG5hbGlnbi1pdGVtczpjZW50ZXI7XFxufVxcblxcbi8qIGVycm9yIGNvbnRhaW5lciAqL1xcbmhlYWRlciBkaXZ7XFxucG9zaXRpb246IGFic29sdXRlO1xcbnJpZ2h0OjA7XFxub3BhY2l0eTogMDtcXG50cmFuc2l0aW9uOm9wYWNpdHkgMnM7XFxufVxcblxcblxcblxcblxcbm1haW57XFxucG9zaXRpb246cmVsYXRpdmU7XFxufVxcblxcbmJ1dHRvbntcXG5iYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ibGFjayk7XFxuY29sb3I6IHZhcigtLXdoaXRlKTtcXG5ib3JkZXI6IDJweCBzb2xpZCB2YXIoLS13aGl0ZSk7XFxudHJhbnNpdGlvbjphbGwgNTAwbXM7XFxucGFkZGluZzowLjh2dztcXG5ib3JkZXItcmFkaXVzOjEwcHg7XFxufVxcblxcbmJ1dHRvbjpob3ZlcntcXG5iYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS13aGl0ZSk7XFxuY29sb3I6IHZhcigtLWJsYWNrKTtcXG5ib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1ibGFjayk7XFxuIFxcbn1cXG5cXG4jYnV0dG9uc3tcXG4gIHRvcDoydmg7XFxuICB3aWR0aDoxMDAlO1xcbiAgcG9zaXRpb246YWJzb2x1dGU7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxufVxcblxcbiNub2RlQnV0dG9uc3tcXG5kaXNwbGF5OiBub25lO1xcbm9wYWNpdHk6IDA7XFxuZ2FwOjAuNXZ3O1xcbnRyYW5zaXRpb246IG9wYWNpdHkgMnM7XFxufVxcblxcbi5zZWxlY3RlZHtcXG5vdXRsaW5lOjJweCBzb2xpZCB2YXIoLS15ZWxsb3cpXFxuXFxufVxcblxcblxcblxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgI25vZGVze1xucGFkZGluZy10b3A6MTJ2aDtcbmRpc3BsYXk6IGdyaWQ7XG59XG5cbiNub2RlcyA+IGRpdntcbmRpc3BsYXk6IGdyaWQ7XG5hbGlnbi1pdGVtczpjZW50ZXI7XG5qdXN0aWZ5LWl0ZW1zOmNlbnRlcjtcbn0gXG5cbiNub2RlcyBwe1xud2lkdGg6MTV2dztcbmhlaWdodDozdnc7XG5mb250LXNpemU6MS4ydnc7XG50ZXh0LWFsaWduOmNlbnRlcjtcbmRpc3BsYXk6ZmxleDtcbmp1c3RpZnktY29udGVudDpjZW50ZXI7XG5hbGlnbi1pdGVtczpjZW50ZXI7XG5ib3JkZXItcmFkaXVzOiAxMHB4O1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9pbnB1dC9zdHlsZS9ub2RlL25vZGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0FBQ0EsZ0JBQWdCO0FBQ2hCLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYixrQkFBa0I7QUFDbEIsb0JBQW9CO0FBQ3BCOztBQUVBO0FBQ0EsVUFBVTtBQUNWLFVBQVU7QUFDVixlQUFlO0FBQ2YsaUJBQWlCO0FBQ2pCLFlBQVk7QUFDWixzQkFBc0I7QUFDdEIsa0JBQWtCO0FBQ2xCLG1CQUFtQjtBQUNuQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIjbm9kZXN7XFxucGFkZGluZy10b3A6MTJ2aDtcXG5kaXNwbGF5OiBncmlkO1xcbn1cXG5cXG4jbm9kZXMgPiBkaXZ7XFxuZGlzcGxheTogZ3JpZDtcXG5hbGlnbi1pdGVtczpjZW50ZXI7XFxuanVzdGlmeS1pdGVtczpjZW50ZXI7XFxufSBcXG5cXG4jbm9kZXMgcHtcXG53aWR0aDoxNXZ3O1xcbmhlaWdodDozdnc7XFxuZm9udC1zaXplOjEuMnZ3O1xcbnRleHQtYWxpZ246Y2VudGVyO1xcbmRpc3BsYXk6ZmxleDtcXG5qdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xcbmFsaWduLWl0ZW1zOmNlbnRlcjtcXG5ib3JkZXItcmFkaXVzOiAxMHB4O1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCNjdXJyZW50V2luZG93e1xuZGlzcGxheTogbm9uZTtcbi8qIGRpc3BsYXk6ZmxleDsgKi9cbmJhY2tncm91bmQtY29sb3I6IHZhcigtLWJsYWNrKTtcbnBvc2l0aW9uOmZpeGVkO1xuZmxleC1kaXJlY3Rpb246Y29sdW1uO1xuZ2FwOjIwcHg7XG5qdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xuYWxpZ24taXRlbXM6Y2VudGVyO1xuYm9yZGVyOiAycHggc29saWQgdmFyKC0td2hpdGUpO1xuYm9yZGVyLXJhZGl1czoyMHB4O1xucGFkZGluZzo1dnc7XG5cbmxlZnQ6NTB2dztcbnRvcDo1MHZoO1xudHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO1xuei1pbmRleDogMTtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vaW5wdXQvc3R5bGUvd2luZG93cy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7QUFDQSxhQUFhO0FBQ2Isa0JBQWtCO0FBQ2xCLDhCQUE4QjtBQUM5QixjQUFjO0FBQ2QscUJBQXFCO0FBQ3JCLFFBQVE7QUFDUixzQkFBc0I7QUFDdEIsa0JBQWtCO0FBQ2xCLDhCQUE4QjtBQUM5QixrQkFBa0I7QUFDbEIsV0FBVzs7QUFFWCxTQUFTO0FBQ1QsUUFBUTtBQUNSLDhCQUE4QjtBQUM5QixVQUFVO0FBQ1ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiI2N1cnJlbnRXaW5kb3d7XFxuZGlzcGxheTogbm9uZTtcXG4vKiBkaXNwbGF5OmZsZXg7ICovXFxuYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmxhY2spO1xcbnBvc2l0aW9uOmZpeGVkO1xcbmZsZXgtZGlyZWN0aW9uOmNvbHVtbjtcXG5nYXA6MjBweDtcXG5qdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xcbmFsaWduLWl0ZW1zOmNlbnRlcjtcXG5ib3JkZXI6IDJweCBzb2xpZCB2YXIoLS13aGl0ZSk7XFxuYm9yZGVyLXJhZGl1czoyMHB4O1xcbnBhZGRpbmc6NXZ3O1xcblxcbmxlZnQ6NTB2dztcXG50b3A6NTB2aDtcXG50cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7XFxuei1pbmRleDogMTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWFpbi5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21haW4uY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL25vZGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9ub2RlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi93aW5kb3dzLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vd2luZG93cy5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9zdHlsZS9tYWluLmNzcydcbmltcG9ydCAnLi9ub2Rlcy9ub2RlU3RydWN0dXJlLmpzJ1xuaW1wb3J0ICcuL2Rpc3BsYXlDb250ZW50SW5odG1sLmpzJ1xuXG4vLyBmdW5jdGlvbmFsaXR5IGZvciBub2RlIGJ1dHRvbnMgZnJvbSB0aGUgbGVmdCBwYXJ0IG9mIHRoZSBzY3JlZW5cbmltcG9ydCB7IGdlbmVyYXRlV2luZG93Rm9yQ3JlYXRlTm9kZXNCdXR0b24gfSBmcm9tICcuL3dpbmRvd3Mvbm9kZVdpbmRvd3MvY3JlYXRlTm9kZXMuanMnO1xuaW1wb3J0IHsgZ2VuZXJhdGVXaW5kb3dGb3JSZW1vdmVOb2Rlc0J1dHRvbiB9IGZyb20gJy4vd2luZG93cy9ub2RlV2luZG93cy9yZW1vdmVOb2Rlcy5qcyc7XG5pbXBvcnQgeyBnZW5lcmF0ZVdpbmRvd0ZvckVkaXROb2Rlc0J1dHRvbiB9IGZyb20gJy4vd2luZG93cy9ub2RlV2luZG93cy9lZGl0Tm9kZXMuanMnO1xuaW1wb3J0IHsgZ2VuZXJhdGVXaW5kb3dGb3JGaXJzdE5vZGVCdXR0b24gfSBmcm9tICcuL3dpbmRvd3Mvbm9kZVdpbmRvd3MvZmlyc3ROb2RlLmpzJztcblxuLy8gZnVuY3Rpb25hbGl0eSBmb3Igc3RydWN0dXJlIGJ1dHRvbnMgZnJvbSB0aGUgcmlnaHQgcGFydCBvZiB0aGUgc2NyZWVuXG5pbXBvcnQgeyBnZW5lcmF0ZVdpbmRvd0ZvckltcG9ydFN0cnVjdHVyZUJ1dHRvbiB9IGZyb20gJy4vd2luZG93cy9zdHJ1Y3R1cmVXaW5kb3dzL2ltcG9ydFN0cnVjdHVyZS5qcyc7XG5pbXBvcnQgeyBnZW5lcmF0ZVdpbmRvd0ZvckV4cG9ydFN0cnVjdHVyZUJ1dHRvbiB9IGZyb20gJy4vd2luZG93cy9zdHJ1Y3R1cmVXaW5kb3dzL2V4cG9ydFN0cnVjdHVyZS5qcyc7XG5cblxuXG4vLyBhZGRpbmcgZXZlbnQgbGlzdGVuZXJzIHRvIG5vZGUgYnV0dG9ucyBmcm9tIHRoZSBsZWZ0XG5jb25zdCBub2RlQnRuSWQgPSAnI25vZGVCdXR0b25zJ1xuXG5jb25zdCBjcmVhdGVOb2RlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHtub2RlQnRuSWR9IGJ1dHRvbjpmaXJzdC1vZi10eXBlYClcbmNyZWF0ZU5vZGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBnZW5lcmF0ZVdpbmRvd0ZvckNyZWF0ZU5vZGVzQnV0dG9uKVxuXG5jb25zdCByZW1vdmVOb2RlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHtub2RlQnRuSWR9IGJ1dHRvbjpudGgtb2YtdHlwZSgyKWApXG5yZW1vdmVOb2RlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZ2VuZXJhdGVXaW5kb3dGb3JSZW1vdmVOb2Rlc0J1dHRvbilcblxuY29uc3QgZWRpdE5vZGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke25vZGVCdG5JZH0gYnV0dG9uOm50aC1vZi10eXBlKDMpYClcbmVkaXROb2RlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZ2VuZXJhdGVXaW5kb3dGb3JFZGl0Tm9kZXNCdXR0b24pXG5cbmNvbnN0IGZpcnN0Tm9kZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7bm9kZUJ0bklkfSBidXR0b246bGFzdC1vZi10eXBlYClcbmZpcnN0Tm9kZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGdlbmVyYXRlV2luZG93Rm9yRmlyc3ROb2RlQnV0dG9uKVxuXG5cblxuXG4vLyBhZGRpbmcgZXZlbnQgbGlzdGVuZXJzIHRvIHN0cnVjdHVyZSBidXR0b25zIGZyb20gdGhlIHJpZ2h0IFxuY29uc3Qgc3RydWN0dXJlQnRuSWQgPSAnI3N0cnVjdHVyZUJ1dHRvbnMnXG5cbmNvbnN0IGltcG9ydFN0cnVjdHVyZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7c3RydWN0dXJlQnRuSWR9IGJ1dHRvbjpmaXJzdC1vZi10eXBlYClcbmltcG9ydFN0cnVjdHVyZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGdlbmVyYXRlV2luZG93Rm9ySW1wb3J0U3RydWN0dXJlQnV0dG9uKVxuXG5jb25zdCBleHBvcnRTdHJ1Y3R1cmVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke3N0cnVjdHVyZUJ0bklkfSBidXR0b246bGFzdC1vZi10eXBlYClcbmV4cG9ydFN0cnVjdHVyZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGdlbmVyYXRlV2luZG93Rm9yRXhwb3J0U3RydWN0dXJlQnV0dG9uKVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9