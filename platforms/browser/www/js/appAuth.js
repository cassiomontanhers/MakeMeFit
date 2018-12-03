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

});

function signUpMethod() {
  const txtEmail = document.getElementById("email");
  const txtPassword = document.getElementById("password");

  firebase.auth().createUserWithEmailAndPassword(txtEmail.value, txtPassword.value)
  .then( () => {
    alert("Signed Up - login:" + txtEmail.value);
    db.collection("user").add({ Name: "Test", coins: 0, steps: 0, userId: firebase.auth().currentUser.uid, outfit: 3});
    db.collection("user_outfits").add({ outfitId: 2, userId: firebase.auth().currentUser.uid});
    })
  .catch((error) => {
    alert("failed : " + error)});

}

function signInMethod() {

  txtEmail = document.getElementById("email").value;
  txtPassword = document.getElementById("password").value;
  localStorage.setItem('user',txtEmail)
  localStorage.setItem('pass',txtPassword);

  firebase.auth().signInWithEmailAndPassword(txtEmail, txtPassword)
  .then( () => {
      alert("Signed In");
      window.location = "index.html";
  })
  .catch((error) => {
    alert("Failed to Sign In")})
}


function signInMethodINDEX() {

  var txtEmail = localStorage.getItem('user');
  var txtPassword = localStorage.getItem('pass');

  firebase.auth().signInWithEmailAndPassword(txtEmail, txtPassword)
  .then( () => {
    // alert("Signed In INDEX");
    loadUserInfo();
  })
  .catch((error) => {
    console.log(error);
    alert("Failed to load user information. Log in first!");
    window.location = "login.html";
  })
}

function signOutMethod() {
 firebase.auth().signOut()
 .then( () => {
   // log("Signed Out") })
   alert("Signed Out.");
   window.location.href = "login.html";
 })
 .catch((error) => {
   log("failed : " + error)})
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    log(JSON.stringify(user),"userDiv");
    // loadUserInfo();
  } else {
    log("no user", "userDiv");
  }
});

function log(msg, dom) {
  // console.log(msg);
  // dom = dom?dom:"msgDiv"
  // const targetDiv = document.getElementById(dom);
  // targetDiv.innerHTML = msg;
}

function verifyUser(){
  if(firebase.auth().currentUser != null){
    return true;
  }else{
    alert("Sign in first!");
    return false;
  }
}
