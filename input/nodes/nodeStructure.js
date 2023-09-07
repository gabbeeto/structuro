

// empty elements are for displaying purposes only

function emptyElement(text = 'empty'){
return {text}
}


window.nodeElement = function(text = 'empty', color = 'black', children = emptyElement(), indexForSibling = 0, indexForParent = false, indexForStructure = 0, amountOfSpace = 1) {
    return { text, color, children , index: indexForSibling,indexForParent, indexForStructure, amountOfSpace}
}

if (localStorage.nodeStructure) {
  window.nodeStructure = JSON.parse(localStorage.nodeStructure.main)
  window.selectedStructure = JSON.parse(localStorage.nodeStructure.selected)
}
else {
  let firstNode = nodeElement('firstElement', 'black', [nodeElement('secondElement', 'pink'),nodeElement('thirdElement', 'gray')]);
  firstNode.amountOfSpace = 2;
  firstNode.children[0].indexForStructure = 1;
  firstNode.children[1].indexForStructure = 1;
  firstNode.children[1].indexForSibling = 1;
  firstNode.children[0].indexForParent = 0;
  firstNode.children[1].indexForParent = 0;
  
  window.nodeStructure = [[firstNode],[firstNode.children[0], firstNode.children[1]]];

  window.selectedStructure = nodeStructure;
}




