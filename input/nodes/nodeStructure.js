

window.nodeElement = function(text = 'empty', color = 'black', children = [], siblingIndex = 0, indexForParent = 0, structureIndex = 0) {
    return { text, color, children , index: siblingIndex,indexForParent}
}

if (localStorage.nodeStructure) {
  window.nodeStructure = localStorage.nodeStructure
}
else {
  let firstNode = nodeElement('firstElement', 'black', [nodeElement('secondElement', 'pink'),nodeElement('thirdElement', 'gray')]);


  firstNode.children[0].structureIndex = 1;
  firstNode.children[1].structureIndex = 1;
  firstNode.children[1].siblingIndex = 1;
  
  window.nodeStructure = [[firstNode],[firstNode.children[0], firstNode.children[1]]];
}




