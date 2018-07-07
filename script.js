"use strict";

var uri = 'https://ipshare.info/ipfs/QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn/';

function Save() {
    var selectedFiles = document.getElementById('uploadFileId');
    var selectedAFile = selectedFiles.files[0];
    var uploadFileName = selectedAFile.name;

    var reader = new FileReader();
    reader.readAsArrayBuffer(selectedAFile);

    reader.onload = loaded;

    reader.onprogress = updateProgress;
    reader.onload = loaded;
    reader.onerror = errorHandler;

    console.log('selectedFile:', selectedAFile);

    console.log('uploadFileName:', uploadFileName);
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

    var selectedFiles = document.getElementById('uploadFileId');
    var fileUploading = selectedFiles.files[0];
    var uploadFileName = fileUploading.name;

    //var fileUploadForm = document.getElementById('uploadFileFormId');
    var formData = new FormData();
    formData.append('uploadingAFile', fileUploading);


    uri = uri + uploadFileName;
    let h = new Headers();

    //don't use fileContents string to store file contents. 
    //javascript string has up to 265MB limit.
    //fileContents = evt.target.result;
    //console.log('evt.target.result;', evt.target.result);
    //var fileContents = evt.target.result;

    console.log('URI inside loaded event handler:', uri);
    console.log('FormData object inside loaded event handler:', formData);
    //Display the key/value pairs

    /*
    for (var pair of formDataEntryValues) {
        console.log('Following are pair from formDataEntry');
        console.log(pair[0] + ', ' + pair[1]);
    }
    */


    // save changes to ipfs

    var oRequest = new XMLHttpRequest();
    oRequest.open('PUT', uri);


    oRequest.upload.onprogress = function (e) {
        if (e.lengthComputable) {
            var percentComplete = (e.loaded / e.total) * 100;
            console.log(percentComplete + '% uploaded');
        };
    };

    oRequest.onload = function () {
        if (this.status == 200 || this.status == 201) {
            //var resp = JSON.parse(response);
            //console.log('IPShare got:', responseText);
            var respHeaders = this.getAllResponseHeaders();
            console.log('resp headers:', respHeaders);
            var respIpfsHashHeader = this.getResponseHeader('ipfs-hash');
            console.log('IPFS HEADERS:', respIpfsHashHeader);
            var httpurl = 'https://ipshare.info/ipfs/' + respIpfsHashHeader;
            var htmlAtag = document.getElementById("ipfshashId");
            var hrefAttribute = document.createAttribute("href");
            hrefAttribute.value = httpurl;
            htmlAtag.setAttributeNode(hrefAttribute);
            htmlAtag.innerHTML = httpurl;
        };
    };
    //Can't use evt.target.result, chrome will crash.
    //oRequest.send(formData);
    //oRequest.send(evt.target.result);
    oRequest.send(fileUploading);
    //console.log('FormData be send to IPShare:', formData);
    //console.log('FileContents be send to IPShare:', fileContents);
}


function errorHandler(evt) {
    if (evt.target.error.name == "NotReadableError") {
        // The file could not be read
    }
}


let SaveButton = document.getElementById("saveButtonId");
SaveButton.onclick = Save;

