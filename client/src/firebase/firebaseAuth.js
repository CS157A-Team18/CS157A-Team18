import {fire} from "./firebaseInit.js"

export function login(email, password) {
    return fire
      .auth()
      .signInWithEmailAndPassword(email, password);
}

export function signUp(email, password) {
  return fire 
    .auth()
    .createUserWithEmailAndPassword(email, password)
}

export function getUID() {
  return new Promise(resolve => {
    fire.auth().onAuthStateChanged(user => {
      resolve(user)
    })
  })
}