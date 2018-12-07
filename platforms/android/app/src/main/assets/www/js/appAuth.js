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

document.addEventListener("DOMContentLoaded", function() {
  const btnSignUp = document.getElementById("signUp");
  btnSignUp.addEventListener("click", signUpMethod);
  const btnSignIn = document.getElementById("signIn");
  btnSignIn.addEventListener("click", signInMethod);

});

function signUpMethod() {
  const txtEmail = document.getElementById("emailCreate");
  const txtPassword = document.getElementById("passwordCreate");
  const txtName = document.getElementById("nameCreate");

  firebase.auth().createUserWithEmailAndPassword(txtEmail.value, txtPassword.value)
  .then( () => {
    alert(txtName.value + " you successfully created an account, your login is:" + txtEmail.value);
    db.collection("user").add({ name: txtName.value, coins: 0, steps: 0, userId: firebase.auth().currentUser.uid, outfit: 3});
    db.collection("user_outfits").add({ outfitId: 2, userId: firebase.auth().currentUser.uid});

    document.getElementById("email").value = txtEmail.value;
    document.getElementById("password").value = txtPassword.value;

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
      window.location = "main.html";
  })
  .catch((error) => {
    alert("Failed to Sign In")})
}


function signInMethodINDEX() {

  var txtEmail = localStorage.getItem('user');
  var txtPassword = localStorage.getItem('pass');

  firebase.auth().signInWithEmailAndPassword(txtEmail, txtPassword)
  .then( () => {
    loadUserInfo();
  })
  .catch((error) => {
    alert("Failed to load user information. Log in first!");
    window.location = "index.html";
  })
}

function signOutMethod() {
 firebase.auth().signOut()
 .then( () => {
   alert("Signed Out.");
   window.location.href = "index.html";
 })
 .catch((error) => {
   log("failed : " + error)})
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    log(JSON.stringify(user),"userDiv");
  } else {
    log("no user", "userDiv");
  }
});

function log(msg, dom) {
  // //console.log(msg);
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
