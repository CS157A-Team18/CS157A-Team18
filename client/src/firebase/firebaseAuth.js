import firebase from 'firebase'
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

export function reauthenticateUser(user, password) {
  const credential = firebase.auth.EmailAuthProvider.credential(
    user.email,
    password
  )
  return user.reauthenticateWithCredential(credential)
}

export function changePassword(user, newPassword) {
  return user.updatePassword(newPassword)
}