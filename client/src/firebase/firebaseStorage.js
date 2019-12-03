import {storage} from './firebaseInit';
const uuidv4 = require('uuid/v4'); 

export function readFile(fileName) {
    const pathReference = storage.ref(fileName)
    return pathReference.getDownloadURL()
}

export function uploadFile(file) {
    const storageRef = storage.ref(file.name)
    return storageRef.put(file).then(() => {
        return readFile(file.name)
    })
}