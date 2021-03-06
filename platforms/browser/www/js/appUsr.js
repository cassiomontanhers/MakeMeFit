var userSavedOutfit;

function loadUserInfo(){
  usuarioId = firebase.auth().currentUser.uid;

    db.collection("user").where("userId","==", firebase.auth().currentUser.uid)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        var userCoins = doc.data().coins;
        userSavedOutfit = doc.data().outfit;
        loadAccountInfo(doc.data().name);
        loadSteps(doc.data().steps);
        loadCoins(userCoins);
        loadOwnedOutfits();
        selectOutfit(userSavedOutfit);
        loadCupoms();
        loadOwnedCupoms(usuarioId);
        resetCupoms();
        setTimeout(function(){
          $(".character").css("display", "block");
          $(".loading").css("display", "none");
        }, 1000);
      });
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error);
  });
}

db.collection("user").where("userId","==", firebase.auth().currentUser.uid).onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      loadUserInfo();
    });
});

function loadAccountInfo(name){
  $("#nameAccount").html("Name: "+name);
  $("#emailAccount").html("Email: "+firebase.auth().currentUser.email);
}

function loadCoins(coinsL){
  coins=coinsL;
  $('.coins').html(coinsL);
}

function loadSteps(stepsL){
  oldSteps = stepsL;
  $(".steps").html("Movements: " + stepsL);
}

function userAddSteps(steps){
  db.collection("user").where("userId","==", firebase.auth().currentUser.uid)
  .get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      db.collection("user").doc(doc.id).update({steps : steps});
    });
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error);
  });
}

function userAddCoins(coins){
  db.collection("user").where("userId","==", firebase.auth().currentUser.uid)
  .get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      db.collection("user").doc(doc.id).update({coins : coins});
      loadCoins(coins);
    });
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error);
  });
}


function loadOwnedOutfits(){
    ownedOutfits = new Array();
    db.collection("user_outfits").where("userId","==", firebase.auth().currentUser.uid).onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          ownedOutfits.push(outfits[doc.data().outfitId]);
        });
    });
    setTimeout(function(){
      resetCloset(userSavedOutfit);
    }, 1000);
}


function selectOutfit(userSavedOutfit){
  $('.character .head').attr("src","img/outfits/head"+userSavedOutfit+".png");
  $('.character .hair').attr("src","img/outfits/hair"+userSavedOutfit+".png");
  $('.character .leftarm').attr("src","img/outfits/leftarm"+userSavedOutfit+".png");
  $('.character .torso').attr("src","img/outfits/torso"+userSavedOutfit+".png");
  $('.character .rightarm').attr("src","img/outfits/rightarm"+userSavedOutfit+".png");
  $('.character .legs').attr("src","img/outfits/legs"+userSavedOutfit+".png");
}

function setUserOutfit(number){
  db.collection("user").where("userId","==", firebase.auth().currentUser.uid)
  .get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      db.collection("user").doc(doc.id).update({outfit : number});
    });
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error);
  });
}

function addOutfit(outfitId){
  db.collection("user_outfits").add({ outfitId: outfitId, userId: firebase.auth().currentUser.uid});
}

function loadOwnedCupoms(id){
    ownedCupoms = new Array();
    db.collection("user_cupom").where("userId","==", firebase.auth().currentUser.uid).onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          ownedCupoms.push(doc.data().cupomId);
        });
    });
    setTimeout(function(){
      resetCupoms();
    }, 1000);
}

function loadCupoms(){
    cupoms = new Array();

    db.collection("cupom").onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cupoms.push(doc.data());
        });
    });
}

function addCupom(cupomId){
  db.collection("user_cupom").add({ cupomId: cupomId, userId: firebase.auth().currentUser.uid});
}
