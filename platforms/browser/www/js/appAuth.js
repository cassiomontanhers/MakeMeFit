// Initialize Firebase
var config = {
  apiKey: "AIzaSyA5rdobqIa9lr4siwbfX1VvhzJedU1kD4I",
  authDomain: "makemefit-a189d.firebaseapp.com",
  databaseURL: "https://makemefit-a189d.firebaseio.com",
  projectId: "makemefit-a189d",
  storageBucket: "",
  messagingSenderId: "516316643058"
};
firebase.initializeApp(config);

var db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

//once DOM is loaded attach button listeners
document.addEventListener("DOMContentLoaded", function() { //you can also use window 'load' event instead
  //attach sign up method
  const btnSignUp = document.getElementById("signUp");
  btnSignUp.addEventListener("click", signUpMethod);
  //attach sign in method
  const btnSignIn = document.getElementById("signIn");
  btnSignIn.addEventListener("click", signInMethod);
  //attach sign out method
  const btnSignOut = document.getElementById("signOut");
  btnSignOut.addEventListener("click", signOutMethod);
});

function signUpMethod() {
  const txtEmail = document.getElementById("email");
  const txtPassword = document.getElementById("password");

  firebase.auth().createUserWithEmailAndPassword(txtEmail.value, txtPassword.value)
  .then( () => {
    log("Signed Up");
    db.collection("user").add({ Name: "Test", coins: 0, steps: 0, userId: firebase.auth().currentUser.uid, outfit: 2});
    db.collection("user_outfits").add({ outfitId: 2, userId: firebase.auth().currentUser.uid});
    })
  .catch((error) => {
    log("failed : " + error)});

}

function signInMethod() {
  const txtEmail = document.getElementById("email");
  const txtPassword = document.getElementById("password");

  firebase.auth().signInWithEmailAndPassword(txtEmail.value, txtPassword.value)
  .then( () => {
    log("Signed In - "+firebase.auth().currentUser.uid) })
  .catch((error) => {
    log("failed : " + error)})
}

function signOutMethod() {
 firebase.auth().signOut()
 .then( () => {
   log("Signed Out") })
 .catch((error) => {
   log("failed : " + error)})
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    log(JSON.stringify(user),"userDiv");
    loadUserInfo();
  } else {
    log("no user", "userDiv");
  }
});

function log(msg, dom) {
  console.log(msg);
  dom = dom?dom:"msgDiv"
  const targetDiv = document.getElementById(dom);
  targetDiv.innerHTML = msg;
}

function verifyUser(){
  if(firebase.auth().currentUser != null){
    return true;
  }else{
    alert("Sign in first!");
    return false;
  }
}
