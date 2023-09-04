

window.nodeElement = function(text = 'empty', color = 'black', children = [],) {
    return { text, color, children }
}

if (localStorage.nodeStructure) {
  window.nodeStructure = localStorage.nodeStructure
}
else {
  window.nodeStructure = nodeElement('firstElement', 'black', [nodeElement('secondElement'),nodeElement('thirdElement')]);
}



