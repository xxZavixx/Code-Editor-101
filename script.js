// Elements
const fileList = document.getElementById("files");
const editor = document.getElementById("editor");
const preview = document.getElementById("preview");
const newFileBtn = document.getElementById("new-file");

// Local Storage Key
const STORAGE_KEY = "CodeEditor101_files";

// Retrieve saved files from local storage or set default
let files = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
  "index.html": "<!DOCTYPE html>\n<html>\n<head>\n<title>My Page</title>\n</head>\n<body>\n<h1>Hello World</h1>\n</body>\n</html>",
  "styles.css": "body { font-family: Arial; }",
  "script.js": "console.log('Hello World');",
};

// Current file being edited
let currentFile = Object.keys(files)[0];

// Populate file list
function populateFileList() {
  fileList.innerHTML = "";
  Object.keys(files).forEach((fileName) => {
    const li = document.createElement("li");
    li.textContent = fileName;
    li.classList.toggle("active", fileName === currentFile);
    li.addEventListener("click", () => openFile(fileName));
    fileList.appendChild(li);
  });
}

// Open a file in the editor
function openFile(fileName) {
  currentFile = fileName;
  editor.value = files[fileName];
  populateFileList();
  updatePreview();
}

// Save changes to the file
editor.addEventListener("input", () => {
  if (currentFile) {
    files[currentFile] = editor.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
    updatePreview();
  }
});

// Update the live preview
function updatePreview() {
  const html = files["index.html"] || "";
  const css = `<style>${files["styles.css"] || ""}</style>`;
  const js = `<script>${files["script.js"] || ""}</script>`;

  preview.srcdoc = html + css + js;
}

// Add a new file
newFileBtn.addEventListener("click", () => {
  const fileName = prompt("Enter the new file name:");
  if (fileName && !files[fileName]) {
    files[fileName] = "";
    localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
    populateFileList();
    openFile(fileName);
  } else if (files[fileName]) {
    alert("File already exists!");
  }
});

// Initialize the app
populateFileList();
openFile(currentFile);
