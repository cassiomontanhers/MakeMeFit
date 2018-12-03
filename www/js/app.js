// localStorage.setItem('key',0);


// localStorage.setItem('key',0)
// if(isNaN(oldSteps){
//   localStorage.setItem('key',0);
// }
//

$(".character").css("display", "none");
$(".loading").css("display", "block");


const btnSignOut = document.getElementById("signOut");


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
        coins++;
        userAddCoins(coins);
      }

      if(lastTwoDigits == "00"){
      }

      steps.textContent = "Movements: " + stepsi;
      if (lastTwoDigits == 20) {
        addCupom(7);
        $(".couponimg").css("display","block");
        $(".couponimg").css("animationName","jump");

        setTimeout(function(){
          $(".couponimg").css("display","none");
        }, 10000);
        ownedCupoms.push(7);
        resetCupoms();
        ownedCupoms=[];
      }

      if (lastTwoDigits == 40) {
        addCupom(9);
        $(".couponimg").css("display","block");
        $(".couponimg").css("animationName","jump");

        setTimeout(function(){
          $(".couponimg").css("display","none");
        }, 10000);
        ownedCupoms.push(9);
        resetCupoms();
      }
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
      $("#cupom").slideToggle("slow");
  })

  $("#close").click(function(){
      $("#closet").hide("slow");
      $("#store").hide("slow");
      $("#close").hide("slow");
      $("#cupom").hide("slow");
  })

  $(".closetdiv").on('click', '.outfitCloset', function(){
    var idSelected = $(this).attr("id");

    $('.character .head').attr("src","img/outfits/head"+outfits[idSelected].imgCode+".png");
    $('.character .hair').attr("src","img/outfits/hair"+outfits[idSelected].imgCode+".png");
    $('.character .leftarm').attr("src","img/outfits/leftarm"+outfits[idSelected].imgCode+".png");
    $('.character .torso').attr("src","img/outfits/torso"+outfits[idSelected].imgCode+".png");
    $('.character .rightarm').attr("src","img/outfits/rightarm"+outfits[idSelected].imgCode+".png");
    $('.character .legs').attr("src","img/outfits/legs"+outfits[idSelected].imgCode+".png");

    $('.outfitCloset').removeClass('selected');
    $(this).addClass('selected');

    setUserOutfit(outfits[idSelected].imgCode);

  });


  $(".btn").on('click', function(){

    var idSelected = $(this).parent().find(".outfitStore").attr("id");

    if($(this).html() != "OWNED"){
      if(window.confirm("Pay "+outfits[idSelected].value+" for this outfit?")){

        if(coins > outfits[idSelected].value){

          coins = coins-outfits[idSelected].value;
          // $('.coins').html(coins);
          userAddCoins(coins);

          $(this).parent().addClass('owned');
          $(this).parent().find("button").addClass('btnSelected');
          $(this).html("OWNED");
          // $(this).removeClass('available');

          addOutfit(idSelected);

          ownedOutfits.push(outfits[$(this).parent().find(".outfitStore").attr("id")]);

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

function Cupom(id, company, offer, redeem){
  this.id = id;
  this.company = company;
  this.offer = offer;
  this.redeem = redeem;
}

function resetCloset(userSavedOutfit){
  $(".closetdiv .outfitCloset").detach();
  for (outfit in ownedOutfits) {
    console.log("=======---------");
    console.log(ownedOutfits[outfit].id);
    if(ownedOutfits[outfit].imgCode == userSavedOutfit){
      printCharacterClosetOutfit(".closetdiv",ownedOutfits[outfit], true);
    }else{
      printCharacterClosetOutfit(".closetdiv",ownedOutfits[outfit], false);
    }
  }
  console.log("=======");
  console.log(ownedOutfits);
  console.log(outfits);
  console.log("=======+");


  for (var i = 0; i < outfits.length; i++) {
    var cont = false;
    for (var j = 0; j < ownedOutfits.length; j++) {
      if(outfits[i].id == ownedOutfits[j].id){
        cont = true;
      }
    }
    if(outfits[i].id != 2){
      printCharacterStoreOutfit(".storediv",outfits[i],cont);
    }
  }


  // var cont = false;
  // for (outfit in outfits) {
  //   cont = false;
  //   // console.log(outfits[outfit].name);
  //   for (var ownOut in ownedOutfits) {
  //     console.log(ownOut.id +" / "+ outfit.id);
  //     console.log(ownOut);
  //     console.log(outfit);
  //     if (ownOut.id == outfit.id) {
  //       cont = true;
  //     }
  //   }
  //   if(outfit != 2){
  //     if(cont == true){
  //       printCharacterStoreOutfit(".storediv",outfits[outfit],true);
  //     }else{
  //       printCharacterStoreOutfit(".storediv",outfits[outfit],false);
  //     }
  //   }
  // }
}



function printCharacterStoreOutfit(selector, outfit, status){
  if(status != true){
    $(selector).append("<div class='outfitStoreContainer'><div class='outfitStore "+status+"' id='"+outfit.id+"'><img class='head' src='img/outfits/head"+outfit.imgCode+".png' alt='head'><img class='hair' src='img/outfits/hair"+outfit.imgCode+".png' alt='Hair'><img class='leftarm' src='img/outfits/leftArm"+outfit.imgCode+".png' alt='left arm'><img class='torso' src='img/outfits/torso"+outfit.imgCode+".png' alt='torso'><img class='rightarm' src='img/outfits/rightArm"+outfit.imgCode+".png' alt='right arm'><img class='legs' src='img/outfits/legs"+outfit.imgCode+".png' alt='torso'></div><button type='button' class='btn available'>Buy $"+outfit.value+"</button></div>");
  }else{
    $(selector).append("<div class='outfitStoreContainer'><div class='outfitStore owned' id='"+outfit.id+"'><img class='head' src='img/outfits/head"+outfit.imgCode+".png' alt='head'><img class='hair' src='img/outfits/hair"+outfit.imgCode+".png' alt='Hair'><img class='leftarm' src='img/outfits/leftArm"+outfit.imgCode+".png' alt='left arm'><img class='torso' src='img/outfits/torso"+outfit.imgCode+".png' alt='torso'><img class='rightarm' src='img/outfits/rightArm"+outfit.imgCode+".png' alt='right arm'><img class='legs' src='img/outfits/legs"+outfit.imgCode+".png' alt='torso'></div><button type='button' class='btn available btnSelected'>OWNED</button></div>");
  }
}

function printCharacterClosetOutfit(selector, outfit, status){
  if(status == true){
    $(selector).append("<div class='outfitCloset selected' id='"+outfit.id+"'><img class='head' src='img/outfits/head"+outfit.imgCode+".png' alt='head'><img class='hair' src='img/outfits/hair"+outfit.imgCode+".png' alt='Hair'><img class='leftarm' src='img/outfits/leftArm"+outfit.imgCode+".png' alt='left arm'><img class='torso' src='img/outfits/torso"+outfit.imgCode+".png' alt='torso'><img class='rightarm' src='img/outfits/rightArm"+outfit.imgCode+".png' alt='right arm'><img class='legs' src='img/outfits/legs"+outfit.imgCode+".png' alt='torso'></div>");
  }else{
    $(selector).append("<div class='outfitCloset' id='"+outfit.id+"'><img class='head' src='img/outfits/head"+outfit.imgCode+".png' alt='head'><img class='hair' src='img/outfits/hair"+outfit.imgCode+".png' alt='Hair'><img class='leftarm' src='img/outfits/leftArm"+outfit.imgCode+".png' alt='left arm'><img class='torso' src='img/outfits/torso"+outfit.imgCode+".png' alt='torso'><img class='rightarm' src='img/outfits/rightArm"+outfit.imgCode+".png' alt='right arm'><img class='legs' src='img/outfits/legs"+outfit.imgCode+".png' alt='torso'></div>");
  }
}



function printUserCupom(cupom){
  console.log(cupom);
  $(".cupomdiv").append('<div class="barcodediv"><div class="barcodedivinfo"><p>Company: <span>'+cupom.company+'</span></p><p>Offer: <span>'+cupom.offer+'</span></p><p>Redeem by: <span>'+cupom.redeem+'</span></p></div><svg class="barcode"jsbarcode-format="CODE39"jsbarcode-value="'+cupom.code+'"jsbarcode-textmargin="0"jsbarcode-fontoptions="bold"></svg></div>');
  // $(".cupomdiv").append('
  // <div class="barcodediv">
  //   <div class="barcodedivinfo">
  //     <p>Company: <span>'+cupom.company+'</span></p>
  //     <p>Offer: <span>'+cupom.offer+'</span></p>
  //     <p>Redeem by: <span>'+cupom.redeem+'</span></p>
  //   </div>
  //   <svg class="barcode"
  //     jsbarcode-format="upc"
  //     jsbarcode-value="'+cupom.code+'"
  //     jsbarcode-textmargin="0"
  //     jsbarcode-fontoptions="bold">
  //   </svg>
  // </div>
  // ');
  JsBarcode(".barcode").init();
}

function resetCupoms(){
  $(".cupomdiv .barcodediv").detach();
  // alert(ownedCupoms.length);
  // console.log(ownedCupoms);
  for (var j = 0; j < ownedCupoms.length; j++) {
    // console.log("a");
    for (var i = 0; i < cupoms.length; i++) {
      // console.log("b");
      // console.log(cupoms[i].id +" / "+ownedCupoms[j]);
      if(ownedCupoms[j] == cupoms[i].id){
        // console.log("c");
        // console.log(cupoms[i]);
        printUserCupom(cupoms[i]);
      }
    }
  }
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


// for (outfit in outfits) {
//   // console.log(outfits[outfit].name);
//   if(outfit != 2){
//     printCharacterStoreOutfit(".storediv",outfits[outfit]);
//   }
// }

var ownedCupoms = new Array();
var cupoms = new Array();

function loadAssets(){
  signInMethodINDEX();
  btnSignOut.addEventListener("click", signOutMethod);
  // resetCloset();
}

loadAssets();

// setTimeout(function(){
// }, 3000);
