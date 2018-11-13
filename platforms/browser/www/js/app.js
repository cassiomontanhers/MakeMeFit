// localStorage.setItem('key',0);


// localStorage.setItem('key',0)
// if(isNaN(oldSteps){
//   localStorage.setItem('key',0);
// }
//


function movements(){
  var oldStepsAsString = localStorage.getItem('key');
  if (oldStepsAsString === undefined) {
    oldStepsAsString = 0;
  }

  var oldSteps = parseInt(oldStepsAsString);

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

      steps.textContent = "Movements: " + stepsi;
      if (e.stepCount>7) {
        document.getElementsByClassName('couponimg')[0].style.visibility="visible";
        document.getElementsByClassName('couponimg')[0].style.animationName="jump";
      }
      localStorage.setItem('key',stepsi);
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

  $(".closetdiv .outfitSelect").on('click', function(){
    var idSelected = $(this).attr("id");

    $('.character .head').attr("src","img/outfits/head"+$(this).attr("id")+".png");
    $('.character .hair').attr("src","img/outfits/hair"+$(this).attr("id")+".png");
    $('.character .leftarm').attr("src","img/outfits/leftarm"+$(this).attr("id")+".png");
    $('.character .torso').attr("src","img/outfits/torso"+$(this).attr("id")+".png");
    $('.character .rightarm').attr("src","img/outfits/rightarm"+$(this).attr("id")+".png");
    $('.character .legs').attr("src","img/outfits/legs"+$(this).attr("id")+".png");

    $('.closetdiv .outfitSelect').removeClass('selected');
    $(this).addClass('selected');

  });


  $(".btn").on('click', function(){
    var idSelected = $(this).attr("id");

    $(this).parent().addClass('owned');

    $(this).parent().find("button").addClass('btnSelected');

  });

});



//outfits

function Outfit(id, name, value){
  this.id = id;
  this.name = name;
  this.value = value;
}

var outfits = [new Outfit(1,"default", 50),
               new Outfit(2,"safari", 50),
               new Outfit(3,"ninja", 50),
               new Outfit(4,"football", 50),
               new Outfit(5,"elf", 50),
               new Outfit(6,"knight", 50),
               new Outfit(7,"green ninja", 50)];

var ownedOutfits = [];


for (outfit in outfits) {
  // console.log(outfits[outfit].name);
  // printCharacterOutfit(".storediv",outfits[outfit]);
  printCharacterStoreOutfit(".storediv",outfits[outfit]);
  printCharacterClosetOutfit(".closetdiv",outfits[outfit]);
}

function printCharacterStoreOutfit(selector, outfit){
  $(selector).append("<div class='outfitSelectContainer'><div class='outfitSelect' id='"+outfit.id+"'><img class='head' src='img/outfits/head"+outfit.id+".png' alt='head'><img class='hair' src='img/outfits/hair"+outfit.id+".png' alt='Hair'><img class='leftarm' src='img/outfits/leftArm"+outfit.id+".png' alt='left arm'><img class='torso' src='img/outfits/torso"+outfit.id+".png' alt='torso'><img class='rightarm' src='img/outfits/rightArm"+outfit.id+".png' alt='right arm'><img class='legs' src='img/outfits/legs"+outfit.id+".png' alt='torso'></div><button type='button' class='btn'><span class='coins'></span>Buy "+outfit.value+"</button></div>");
}

function printCharacterClosetOutfit(selector, outfit){
  $(selector).append("<div class='outfitSelect' id='"+outfit.id+"'><img class='head' src='img/outfits/head"+outfit.id+".png' alt='head'><img class='hair' src='img/outfits/hair"+outfit.id+".png' alt='Hair'><img class='leftarm' src='img/outfits/leftArm"+outfit.id+".png' alt='left arm'><img class='torso' src='img/outfits/torso"+outfit.id+".png' alt='torso'><img class='rightarm' src='img/outfits/rightArm"+outfit.id+".png' alt='right arm'><img class='legs' src='img/outfits/legs"+outfit.id+".png' alt='torso'></div>");
}
