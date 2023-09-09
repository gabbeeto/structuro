
let divIndex; 
let nodeIndex;



export function addNodeToLeft(){
alert('addNodeToLeft')
}


export function addNodeChild(){
alert('addNodeToRight')
}


export function addNodeToRight(){
divideSelectedNode()
pushToNodeStructureArray()

}

function divideSelectedNode(){
let hyphen = selectedNode.indexOf('-');
divIndex = selectedNode.substring(0, hyphen);
nodeIndex = selectedNode.substring(hyphen +1, selectedNode.length);
console.log(divIndex);
console.log(nodeIndex);

}

function pushToNodeStructureArray(){
nodeStructure[nodeIndex].splice(divIndex,0, nodeElement('new Element', 'black',emptyElement(),nodeIndex + 1, nodeStructure[nodeIndex][divIndex].indexForParent, divIndex))
}
