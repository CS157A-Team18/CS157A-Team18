import {storage} from './firebaseInit';
const uuidv4 = require('uuid/v4'); 

export function readFile(fileName) {
    const pathReference = storage.ref(fileName)
    return pathReference.getDownloadURL()
}

export function uploadFile(file) {
    const fileUUID = uuidv4()
    const storageRef = storage.ref(fileUUID)
    return storageRef.put(file).then(() => {
        return readFile(fileUUID)
    })
}