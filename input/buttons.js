import './style/main.css'
import './nodes/nodeStructure.js'

import { generateWindowForCreateNodesButton } from './windows/nodeWindows/createNodes.js';
import { generateWindowForRemoveNodesButton } from './windows/nodeWindows/removeNodes.js';
import { generateWindowForEditNodesButton } from './windows/nodeWindows/editNodes.js';


import { generateWindowForImportStructureButton } from './windows/structureWindows/importStructure.js';
import { generateWindowForExportStructureButton } from './windows/structureWindows/exportStructure.js';

const nodeBtnId = '#nodeButtons'

const createNodeBtn = document.querySelector(`${nodeBtnId} button:first-of-type`)
createNodeBtn.addEventListener('click', generateWindowForCreateNodesButton)



const removeNodeBtn = document.querySelector(`${nodeBtnId} button:nth-of-type(2)`)
removeNodeBtn.addEventListener('click', generateWindowForRemoveNodesButton)


const editNodeBtn = document.querySelector(`${nodeBtnId} button:last-of-type`)
editNodeBtn.addEventListener('click', generateWindowForEditNodesButton)


const structureBtnId = '#structureButtons'

const importStructureBtn = document.querySelector(`${structureBtnId} button:first-of-type`)
importStructureBtn.addEventListener('click', generateWindowForImportStructureButton)


const exportStructureBtn = document.querySelector(`${structureBtnId} button:last-of-type`)
exportStructureBtn.addEventListener('click', generateWindowForExportStructureButton)
