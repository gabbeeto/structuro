

window.nodeElement = function(text = 'empty', color = 'black', children = [], indexForSibling = 0, indexForParent = 0, indexForStructure = 0) {
    return { text, color, children , index: indexForSibling,indexForParent, indexForStructure}
}

if (localStorage.nodeStructure) {
  window.nodeStructure = localStorage.nodeStructure
}
else {
  let firstNode = nodeElement('firstElement', 'black', [nodeElement('secondElement', 'pink'),nodeElement('thirdElement', 'gray')]);

  firstNode.children[0].indexForStructure = 1;
  firstNode.children[1].indexForStructure = 1;
  firstNode.children[1].indexForSibling = 1;
  
  window.nodeStructure = [[firstNode],[firstNode.children[0], firstNode.children[1]]];
}




