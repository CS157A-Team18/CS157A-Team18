import {storage} from './firebaseInit';
const uuidv4 = require('uuid/v4'); 

export function readFile(fileName) {
    const pathReference = storage.ref(fileName)
    return pathReference.getDownloadURL()
}

export function uploadFile(file) {
    const storageRef = storage.ref(file.name)
    storageRef.put(file).then(() => {
        readFile(file.name).then(url => {
            console.log(url)
            // fetch(util.format('%s/api/upload', config.EXPRESS_BACKEND), {
            //     method: "POST",
            //     headers: {
            //         'Content-type': 'application/json'
            //     },
            //     body: JSON.stringify({url: url})
            // })
            // .then(result => {
            //     console.log(result) // 500 = Internal Service Error; 201 = CREATED
            //     if (result.ok) {
            //         // Handle successful signup here
            //         return
            //     }
            //     // Handle non-successful signup here
            // })
        })
    })
}