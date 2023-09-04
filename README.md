# structuro
I've done this so I can structure my codebase so much better.

input files: are the files I work with to make the page works, and webpack converts it into one file that's going to be inside the 'output' folder.
![Alt text](/images/inputStructure.png "visual representation of Input folder")

style folder:
it contains all the necessesary elements for styling the website.
main.css = style for the main interface of the website.
windows.css = style for the windows that pop ups when you click in one of the buttons or you use a shortcut for that.
node folder = style for the node hierarchy.
lightmode folder = support light mode with javascript and make the styling with css.
![Alt text](/images/styleFolder.png "visual representation of Style folder")





windows folder:
all the files that generate from a window by clicking on of the buttons.
structureWindows = all the content generated from one of the buttons that are related to structures.
nodeWindows = all the content generated from one of the buttons that are related to nodes. 
currentWindow.js = manages if window is open or not and creates a variable for Current window
![Alt text](/images/windowFolder.png "visual representation of window folder")

nodes folder:
all the files related to nodes. 
nodeStructure.js = main structure of nodes functionality.
createNodes.js = functionality for the createNode window buttons.
removeNodes.js = functionality for the removeNode window buttons.
editNodes.js = functionality for the editNode window buttons.
![Alt text](/images/nodesFolder.png "visual representation of nodes folder")



Structure folder:
all the files related to the structure of the nodes(import and export structure). 
importStructure.js = functionality for the import structure button.
exportStructure.js = functionality for the export structure button.
![Alt text](/images/structureFolder.png "visual representation of the structure folder")





displayContentInhtml.js:
display the node structure in the website.

buttons.js:
add events to all the buttons from html and import the functionality from the window folder.

shortcuts.js:
add keyboard support so you don't have to rely on the buttons to interact with the website.


index.html:
it contains to contain the main structure of the website as any other index.html file
![Alt text](/images/htmlStructure.png "visual representation of html file")
