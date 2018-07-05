"use strict";
var uri = 'https://ipshare.info/ipfs/QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn/';
var fileContents = 'This is my Story';

//const buttonElement = document.getElementById('saveButtonId');
//buttonElement.addEventListener('click', function (event) {
//   alert('Element clicked through function!');
// });
function Save() {
    //var fs = requestFileSystemSync(d)
    var selectedFile = document.getElementById('uploadFileId').files[0];
    //var fileContents = selectedFile.getAsBinary();

    var reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile);

    console.log('fileContents by Globally declared variable:', fileContents);
    reader.onload = loaded;
    //fileString = loaded;

    reader.onprogress = updateProgress;
    reader.onload = loaded;
    reader.onerror = errorHandler;

    var uploadFileName = selectedFile.name;
    var fileUploadForm = document.getElementById('uploadFileFormId');
    var formData = new FormData(fileUploadForm);
    //formData.append('uploadFiles', selectedFile, uploadFileName);
    uri = uri + uploadFileName;
    let h = new Headers();
    h.append('Accept', '*/*');
    //let inputTextValue = document.getElementById('inputTextId').value;
    console.log('selectedFile:', selectedFile);
    console.log('URI:', uri);
    console.log('uploadFileName:', uploadFileName);
    console.log('FORMDATA:', formData);
    console.log('This is fileContents:', fileContents);
    console.log('Form Entries are:', formData.entries());


    let req = new Request(uri, {
        method: 'PUT',
        headers: h,
        //mode: 'cors',
        body: fileContents
        //body: 'This is body part of Formdata'
    });
    // save changes to ipfs
    fetch(req)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Bad HTTP request to server');
            }

        })
        .then((jsonData) => {
            console.log(jsonData);

        })
        .catch((error) => {
            console.log('ERROR:', error.message);
        });


}


function updateProgress(evt) {
    if (evt.lengthComputable) {
        // evt.loaded and evt.total are ProgressEvent properties
        var loaded = (evt.loaded / evt.total);
        if (loaded < 1) {
            // Increase the prog bar length
            // style.width = (loaded * 200) + "px";
        }
    }
}

function loaded(evt) {
    // Obtain the read file data
    fileContents = evt.target.result;
    console.log('FileContents inside loaded event handler:', fileContents);
}

function errorHandler(evt) {
    if (evt.target.error.name == "NotReadableError") {
        // The file could not be read
    }
}


//let SaveButton = document.getElementById("saveButtonId");
//SaveButton.onclick = Save;

