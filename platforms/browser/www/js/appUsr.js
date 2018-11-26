function loadUserInfo(){
  usuarioId = firebase.auth().currentUser.uid;
  db.collection("user").where("userId","==", firebase.auth().currentUser.uid)
  .get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      var userCoins = doc.data().coins;
      var userSavedOutfit = doc.data().outfit;
      console.log(doc.id, " => ", doc.data());
      loadCoins(userCoins);
      loadOwnedOutfits(usuarioId);
      selectOutfit(userSavedOutfit);
      // loadAssets();
    });
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error);
  });
}

db.collection("user").where("userId","==", firebase.auth().currentUser.uid).onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {  //if you want all
      loadUserInfo();
    });
});

function loadCoins(coinsL){
  coins=coinsL;
  $('.coins').html(coinsL);
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
      loadCoins();
    });
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error);
  });
}


function loadOwnedOutfits(id){
    ownedOutfits = new Array();
    db.collection("user_outfits").where("userId","==", firebase.auth().currentUser.uid).onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {  //if you want all
          console.log(doc.data().outfitId);
          ownedOutfits.push(outfits[doc.data().outfitId]);
        });
    });
    setTimeout(function(){
      console.log("TIMEOUT AGORA");
      console.log(ownedOutfits);
      resetCloset();
    }, 1000);
    console.log("final loadOwnedOutfits");
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
