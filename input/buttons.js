import './style/main.css'
import './nodes/nodeStructure.js'
import './displayContentInhtml.js'

// functionality for node buttons from the left part of the screen
import { generateWindowForCreateNodesButton } from './windows/nodeWindows/createNodes.js';
import { generateWindowForRemoveNodesButton } from './windows/nodeWindows/removeNodes.js';
import { generateWindowForEditNodesButton } from './windows/nodeWindows/editNodes.js';
import { generateWindowForFirstNodeButton } from './windows/nodeWindows/firstNode.js';

// functionality for structure buttons from the right part of the screen
import { generateWindowForImportStructureButton } from './windows/structureWindows/importStructure.js';
import { generateWindowForExportStructureButton } from './windows/structureWindows/exportStructure.js';



// adding event listeners to node buttons from the left
const nodeBtnId = '#nodeButtons'

const createNodeBtn = document.querySelector(`${nodeBtnId} button:first-of-type`)
createNodeBtn.addEventListener('click', generateWindowForCreateNodesButton)

const removeNodeBtn = document.querySelector(`${nodeBtnId} button:nth-of-type(2)`)
removeNodeBtn.addEventListener('click', generateWindowForRemoveNodesButton)

const editNodeBtn = document.querySelector(`${nodeBtnId} button:nth-of-type(3)`)
editNodeBtn.addEventListener('click', generateWindowForEditNodesButton)

const firstNodeBtn = document.querySelector(`${nodeBtnId} button:last-of-type`)
firstNodeBtn.addEventListener('click', generateWindowForFirstNodeButton)




// adding event listeners to structure buttons from the right 
const structureBtnId = '#structureButtons'

const importStructureBtn = document.querySelector(`${structureBtnId} button:first-of-type`)
importStructureBtn.addEventListener('click', generateWindowForImportStructureButton)

const exportStructureBtn = document.querySelector(`${structureBtnId} button:last-of-type`)
exportStructureBtn.addEventListener('click', generateWindowForExportStructureButton)
