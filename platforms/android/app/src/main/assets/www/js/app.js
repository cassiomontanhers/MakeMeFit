// localStorage.setItem('key',0);


// localStorage.setItem('key',0)
// if(isNaN(oldSteps){
//   localStorage.setItem('key',0);
// }
//




var usuarioId;

var coins;
var oldSteps;

function movements(){
  // var oldStepsAsString = localStorage.getItem('key');
  // if (oldStepsAsString === undefined) {
  //   oldStepsAsString = 0;
  // }
  // coins = localStorage.getItem('coins');
  // if (coins === undefined) {
  //   coins = 0;
  // }
  // $('.coins').html(coins);



  var
      steps = document.querySelector(".steps"),
      currentPosition = 0,
      rotate = 45; //degrees

  var pedometer = new MotionStack.Pedometer();

  pedometer.start(function(e) {
      if (oldSteps == '' || oldSteps == undefined || isNaN(oldSteps)) {
        oldSteps = 0;
      }
      var stepsi = parseInt(oldSteps) + parseInt(e.stepCount);

      var lastTwoDigits = (parseInt(oldSteps) + parseInt(e.stepCount)).toString().match(/\d{2}$/);
      var lastDigit = (parseInt(oldSteps) + parseInt(e.stepCount)).toString().match(/\d{1}$/);

      if(lastDigit == '0'){
        userAddSteps(stepsi);
      }

      if(lastTwoDigits == "00"){
        coins++;
        userAddCoins(coins);
      }

      steps.textContent = "Movements: " + stepsi;
      // if (e.stepCount>7) {
      //   document.getElementsByClassName('couponimg')[0].style.visibility="visible";
      //   document.getElementsByClassName('couponimg')[0].style.animationName="jump";
      // }
      // localStorage.setItem('key',stepsi);



  });
}

movements();

//jQuery
jQuery(function($){
  //Write normal jQuery as normal
  $("#ninja").click(function(){
      $("#closet").slideToggle("slow");
      $("#store").slideToggle("slow");
      $("#close").slideToggle("slow");
  })

  $("#close").click(function(){
      $("#closet").hide("slow");
      $("#store").hide("slow");
      $("#close").hide("slow");
  })

  $(".closetdiv").on('click', '.outfitSelect', function(){
    var idSelected = $(this).attr("id");

    $('.character .head').attr("src","img/outfits/head"+outfits[idSelected].imgCode+".png");
    $('.character .hair').attr("src","img/outfits/hair"+outfits[idSelected].imgCode+".png");
    $('.character .leftarm').attr("src","img/outfits/leftarm"+outfits[idSelected].imgCode+".png");
    $('.character .torso').attr("src","img/outfits/torso"+outfits[idSelected].imgCode+".png");
    $('.character .rightarm').attr("src","img/outfits/rightarm"+outfits[idSelected].imgCode+".png");
    $('.character .legs').attr("src","img/outfits/legs"+outfits[idSelected].imgCode+".png");

    $('.closetdiv .outfitSelect').removeClass('selected');
    $(this).addClass('selected');

    setUserOutfit(outfits[idSelected].imgCode);

  });


  $(".btn").on('click', function(){

    var idSelected = $(this).parent().find(".outfitSelect").attr("id");

    if($(this).html() != "OWNED"){
      if(window.confirm("Pay "+outfits[idSelected].value+" for this outfit?")){

        if(coins > outfits[idSelected].value){

          coins = coins-outfits[idSelected].value;
          $('.coins').html(coins);
          userAddCoins(coins);

          $(this).parent().addClass('owned');
          $(this).parent().find("button").addClass('btnSelected');
          $(this).html("OWNED");
          // $(this).removeClass('available');

          addOutfit(idSelected);

          ownedOutfits.push(outfits[$(this).parent().find(".outfitSelect").attr("id")]);

          // console.log(ownedOutfits);
          resetCloset();
        }else{
          window.alert("Insufficient balance. You need "+outfits[idSelected].value+" coins to buy this outfit.");
        }
      }
    }


  });

});


//outfits
function Outfit(id, name, value, imgCode){
  this.id = id;
  this.name = name;
  this.value = value;
  this.imgCode = imgCode;
}

function resetCloset(){
  console.log("clovis");
  $(".closetdiv .outfitSelect").detach();
  // console.log(ownedOutfits);
  for (outfit in ownedOutfits) {
    console.log("clovis A");
    printCharacterClosetOutfit(".closetdiv",ownedOutfits[outfit]);
  }
}



function printCharacterStoreOutfit(selector, outfit){
  $(selector).append("<div class='outfitSelectContainer'><div class='outfitSelect' id='"+outfit.id+"'><img class='head' src='img/outfits/head"+outfit.imgCode+".png' alt='head'><img class='hair' src='img/outfits/hair"+outfit.imgCode+".png' alt='Hair'><img class='leftarm' src='img/outfits/leftArm"+outfit.imgCode+".png' alt='left arm'><img class='torso' src='img/outfits/torso"+outfit.imgCode+".png' alt='torso'><img class='rightarm' src='img/outfits/rightArm"+outfit.imgCode+".png' alt='right arm'><img class='legs' src='img/outfits/legs"+outfit.imgCode+".png' alt='torso'></div><button type='button' class='btn available'>Buy $"+outfit.value+"</button></div>");
}

function printCharacterClosetOutfit(selector, outfit){
  $(selector).append("<div class='outfitSelect' id='"+outfit.id+"'><img class='head' src='img/outfits/head"+outfit.imgCode+".png' alt='head'><img class='hair' src='img/outfits/hair"+outfit.imgCode+".png' alt='Hair'><img class='leftarm' src='img/outfits/leftArm"+outfit.imgCode+".png' alt='left arm'><img class='torso' src='img/outfits/torso"+outfit.imgCode+".png' alt='torso'><img class='rightarm' src='img/outfits/rightArm"+outfit.imgCode+".png' alt='right arm'><img class='legs' src='img/outfits/legs"+outfit.imgCode+".png' alt='torso'></div>");
}


// var outfits = new Array();
// console.log(typeof outfits);

// db.collection("outfits").get().then(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {
//         // doc.data() is never undefined for query doc snapshots
//         // console.log(doc.id, " => ", doc.data());
//
//         outfits.push(createOutfit(doc.data().id,
//                                   doc.data().name,
//                                   doc.data().cost,
//                                   doc.data().number));
//
//         // outfits[count] = x;
//         // count++;
//
//     });
// });

// function createOutfit(id,name,cost,number){
//   return new Outfit(id,name,cost,number);
// }

// var ownedOutfits = [];
var ownedOutfits = new Array();


var outfits = [new Outfit(0,"default", 50, 1),
new Outfit(1,"safari", 50, 2),
new Outfit(2,"ninja", 50, 3),
new Outfit(3,"football", 50, 4),
new Outfit(4,"elf", 50, 5),
new Outfit(5,"knight", 50, 6),
new Outfit(6,"green ninja", 50, 7)];


for (outfit in outfits) {
  // console.log(outfits[outfit].name);
  if(outfit != 2){
    printCharacterStoreOutfit(".storediv",outfits[outfit]);
  }
}

function loadAssets(){
  //do what you need here
  // ownedOutfits.push(outfits[2]);
  // loadOwnedOutfits();

  resetCloset();
}

loadAssets();

// setTimeout(function(){
// }, 3000);
