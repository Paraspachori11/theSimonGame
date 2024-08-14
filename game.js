var btnArr = document.querySelectorAll("div .btn");
var i = 0;
var stage = 0;
var collection = [];
var clickCollection = [];
while(i<btnArr.length)
{
    (function(num){
    btnArr[num].addEventListener("click",function (event){
        var color = btnArr[num].getAttribute("id");
        effect(btnArr[num]);
        sound(color);
        monitorClicks(num);
    });
    })(i);
    i++;
}

function sound(clr)
{
    var path = "./sounds/"+clr+".mp3";
    var audio = new Audio(path);
    audio.play();
}

function effect(element)
{
    element.classList.add("pressed");
    setTimeout(function() {
        element.classList.remove("pressed");
    }, 100);
}

// detect game initiate
$(document).keypress(function(event){
    if(stage === 0)
    {
    autoExecute();
    }
});

function autoExecute()
{
    clearCollections(clickCollection);
    level(stage);
    setTimeout(function(){
        generatePattern();
        patternGuider();
    },1000);
}

// level generater
function level(stg)
{
    stage += 1;
    stg = stage;
    $("h1").text("Level " + stg);
}

// generate random value from 1 to 4
function generatePattern()
{
    var rand = Math.floor(Math.random() * 4);
    collection.push(rand);
}

// next button to be clicked
function patternGuider()
{
    var guide = collection.pop();
    effect(btnArr[guide]);
    collection.push(guide);
}


function monitorClicks(current)
{
    clickCollection.push(current);
    checker();
}

function checker()
{
    var start = 0;
    while(start < clickCollection.length)
    {
        if(collection[start] === clickCollection[start])
        {
            start++;
        }
        else{
            gameOver();
            break;
        }
    }
    // console.log("collection "+collection);
    // console.log("clickCollection "+clickCollection);
    
    if(collection.length === clickCollection.length)
    {
        autoExecute();
    }
}

function gameOver()
{
    $("body").addClass("game-over");
    
    setTimeout(function() {
        $("h1").text("Game Over!!!!");
    }, 100);  // Delay by 100ms
    
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();

    setTimeout(function() {
        $("h1").text("Press A Key to Start");
        $("body").removeClass("game-over");
        stage = 0;
        clearCollections(collection);
        clearCollections(clickCollection);
    }, 3000);
}

function clearCollections(arrayName)
{
    while(arrayName.length != 0)
        {
            arrayName.pop();
        }
}