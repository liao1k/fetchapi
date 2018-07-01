"use strict";
const uri = 'https://ipshare.info/ipfs/QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn/Uploadfile.txt';
function Save() {
    let h = new Headers();
    h.append('Accept', 'application/jason');
    let textarea = document.getElementById("Editor");
    let req = new Request(uri, {
        method: 'PUT',
        headers: h,
        mode: 'cors',
        body: 'Hola my name be Davy Jones!!'
    });
    // save changes to ipfs
    fetch(req)
        .then((response) => {
            if(response.ok) {
                return response.json();
            }else {
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
let SaveButton = document.getElementById("Save");
SaveButton.onclick = Save;

