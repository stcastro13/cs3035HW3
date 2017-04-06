/*Steven Castro
TESTED ON MICROSOFT EDGE, FIREFOX

VERSION 1.1 : 
+ ADDED AUTOMATIC PAGE SCROLLING

+ CHANGED CHALLENGES AND PRIZES TO BE SHOWN AS ?? ON THE MAP
*/


var C1 = {name:"Shrek", HP: 50, attack:5, prize: "layers", tag: "C1"};
var C2 = {name: "Donkey", HP: 20, attack: 5, prize: "nice rock", tag: "C2"};
var C3 = {name: "CSULA", HP: 20, attack: 10, prize: "your classes", tag: "C3"};
var C4 = {name: "John Cena", HP: 50, attack: 5, prize: "invisibility cloak", tag:"C4"};

var wincondition = 0;




var prevX=0;
var prevY=0;
var gameMoveText = "";
var pcount = 0;

	var spots = [
	["W", "W", "W", "W", "W", "W", "W", "W"],
	["W", "P1", "---", "---", "---", "C1", "---", "W"],
	["W", "---", "---", "---", "P2", "---", "---", "W"],
	["W", "C4", "---", "---", "---", "---", "---", "W"],
	["W", "---", "---", "---", "---", "---", "---", "W"],
	["W", "---", "C3", "---", "---", "---", "---", "W"],
	["W", "---", "---", "---", "C2", "---", "---", "W"],
	["W", "W", "W", "W", "W", "W", "W", "W"]];

var posx = [Math.round(Math.random()*7)];
var posy = [Math.round(Math.random()*7)];

//console.log("test begin x: " + posx + "y: " + posy);
//reroll for not landing in preoccupied spots
while( spots[posx][posy] == "W" || spots[posx][posy] == "C1" ||spots[posx][posy] == "C2" ||spots[posx][posy] == "C3" ||spots[posx][posy] == "C4" || spots[posx][posy] == "P")
{
	posx = [Math.round(Math.random()*7)];
	posy = [Math.round(Math.random()*7)];
}
var prizes = ["",""];
var heroine = {name:"Lucina", HP:50, attack:10, x: posx, y: posy, items: prizes};

spots[posx][posy] = "S";


var gx = [Math.round(Math.random()*7)];
var gy = [Math.round(Math.random()*7)];

//console.log("test begin x: " + posx + "y: " + posy);
//reroll for Goal
while( spots[gx][gy] == "W" || spots[gx][gy] == "C1" || spots[gx][gy] == "S" ||spots[gx][gy] == "C2" ||spots[gx][gy] == "C3" ||spots[gx][gy] == "C4" || spots[gx][gy] == "P")
{
	gx = [Math.round(Math.random()*7)];
	gy = [Math.round(Math.random()*7)];
}
spots[gx][gy] = "G";
console.log("printing");
var mapLog = "";
var mapLogz = "";


function moveLeft()
		{
			gameMoveText = "";
			gameMoveText+="<br> You moved left.";
			document.getElementById("gametext").innerHTML = gameMoveText;
			prevY = posy;
			prevX = posx;
			posy= parseInt(posy) - 1;
			movementLogic();
			printMap();
			
		}
	
	function moveUp()	
		{
			gameMoveText = "";
			prevY = posy;
			prevX = posx;
			gameMoveText+="<br> You moved up.";
			document.getElementById("gametext").innerHTML = gameMoveText;
			posx= parseInt(posx) - 1;

			movementLogic();
			printMap();
		
		}
	function moveRight()
		{
			gameMoveText = "";
			prevY = posy;
			prevX = posx;
			gameMoveText+="<br> You moved right.";
			document.getElementById("gametext").innerHTML = gameMoveText;
			posy = parseInt(posy) + 1;
			
			movementLogic();
			printMap();
		}
	function moveDown()
		{
			gameMoveText = "";
			prevY = posy;
			prevX = posx;
			gameMoveText+="<br> You moved down.";
			document.getElementById("gametext").innerHTML = gameMoveText;
			posx= parseInt(posx) + 1;
			movementLogic();
			printMap();	
		}

function makeTableString(myArray) 
{
    var result = "<table border=1>";
    for(var i=0; i<myArray.length; i++) {
        result += "<tr>";
        for(var j=0; j<myArray[i].length; j++){
            result += "<td>"+myArray[i][j]+"</td>";
        }
        result += "</tr>";
    }
    result += "</table>";

    return result;
}

function printMap()
{
mapLogz = "";
for (var i = 0; i < spots.length; i++) 
{
            for (var j = 0; j < spots[i].length; j++) 
            {
            	if (spots[i][j] == "C1" || spots[i][j] == "C2" || spots[i][j] == "C3" || spots[i][j] == "C4" || spots[i][j] == "P1" || spots[i][j] == "P2") 
            	{
            		mapLog+='? '
            	}
            	else
            	{
            	mapLog+=spots[i][j]+' ';	
            	}
                
            }
            console.log(mapLog);
     /*       document.write(mapLog);
            document.write("<br>");
       */
            mapLogz+=mapLog;
            mapLogz+="<br>";
            mapLog='';
}
 document.getElementById("map").innerHTML = mapLogz;
}
printMap();


function genericChallenge(monster, hero)
{
	console.log("CHALLENGE");
	var repeatTemp = monster.HP;



	var p = confirm("Fight the " + monster.name +"?");
	
if( p == true)
{
gameMoveText+="You decide to fight the " + monster.name+ "<br>";
				
				while(true)
				{
					monster.HP = monster.HP - heroine.attack;
					gameMoveText+="<br> you hit"+monster.name+" for "+ heroine.attack+". "+monster.name+" now has "+ monster.HP + "HP<br>";
					if(monster.HP == 0)
					{
						gameMoveText+="you have slain " + monster.name+"he dropped a " + monster.prize+". <br>";
						hero.items[pcount] = monster.prize;
						pcount = parseInt(pcount) +1;
						//var repeat = confirm("reinstance this fight for later randomly onthe map?")
						//		if(repeat == true)
						//		{
						//			var monx = posx;
						//			var mony = posy;
						//				while( spots[monx][mony] == "W" || spots[monx][mony] == "C1" ||spots[monx][mony] == "C2" ||spots[monx][mony] == "C3" ||spots[monx][mony] == "C4" || spots[monx][mony] == "P" || spots[monx][mony] == "G" || spots[monx][mony] == "S")
						//				{
						//					monx = [Math.round(Math.random()*7)];
						//					mony = [Math.round(Math.random()*7)];
						//				}
						//				monster.HP = repeatTemp;
						//			spots[monx][mony] = monster.tag;
						//		}
						break;
					}
					heroine.HP = heroine.HP - monster.attack;
					gameMoveText+="you get hit for " + monster.attack + ". Current HP: " +heroine.HP +"<br>";
					if(heroine.HP == 0)
					{
						gameMoveText+="you have died <br>";
						break;
					}
				
				document.getElementById("gametext").innerHTML = gameMoveText;
				
				}
			
			document.getElementById("gametext").innerHTML = gameMoveText;
}
if(p == false)
{
			gameMoveText+="You have fled from the " + monster.name;	
		
			document.getElementById("gametext").innerHTML = gameMoveText;
}

document.getElementById("gametext").innerHTML = gameMoveText;


}


//START BUTTONS HERE INSTEAD OF PROMPTS

	
		

	
//END OF BUTTONS
function movementLogic()
{
switch(spots[posx][posy])
	{
	case "C1":
	{
		spots[posx][posy] = "S";
		spots[prevX][prevY] ="+";
		gameMoveText+="<br>you passed through challenge 1";
		genericChallenge(C1,heroine);
		break;
	}
	case "C2":
	{
		spots[posx][posy] = "S";
		spots[prevX][prevY] ="+";
		gameMoveText+="<br>you passed through challenge 2";
		genericChallenge(C2,heroine);
		break;
	} 
	case "C3":
	{
			spots[posx][posy] = "S";
			spots[prevX][prevY] ="+";
		gameMoveText+="<br>you passed through challenge 3";
		genericChallenge(C3, heroine);
		break;
	} 
	case "C4":
		{
			spots[posx][posy] = "S";
			spots[prevX][prevY]="+";
		gameMoveText+="<br>you passed through challenge 4";
		genericChallenge(C4,heroine);
		break;
	}  
	case "P1":
		{
			spots[posx][posy] = "S";
			spots[prevX][prevY] ="+";
		gameMoveText+="<br>you passed through a prize! you get a lollipop";
		pcount = pcount+1;
		heroine.items[pcount] = "lollipop";
		break;
	} 
	case "P2":
		{
			spots[posx][posy] = "S";
			spots[prevX][prevY] ="+";
		gameMoveText+="<br>you passed through a prize! You get a kazoo";
		pcount = pcount +1;
		heroine.items[pcount] = "kazoo";
		break;
	} 
	case "W":
	{
		posy = prevY;
		posx = prevX;
		gameMoveText+="<br>You hit a wall, try again";
		break;
	}
	case "G":
	{
		if(pcount == 2)
		{
			gameMoveText+="Lucina carefully places the " + heroine.items[0] + "and " +heroine.items[1]+"into the box. you wont believe what happens next. The end.";
			wincondition = 1;			
		}
		else
		{
		posy = prevY;
		posx = prevX;
		gameMoveText+="<br>cant finish game yet, get more prizes then try again" + "current prizes:"+ pcount;
		}
		break;
	} 
	case "+":
	{
		spots[posx][posy] = "S";
		spots[prevX][prevY] ="+";
		gameMoveText+="<br>you already passed through here";
		break;
	} 
	case "---":
	{
		spots[posx][posy] = "S";
		spots[prevX][prevY] = "+";
		gameMoveText+="<br> empty space";
		break;
	}
	case "S":
	{
		gameMoveText+="<br> printed map";
		break;
	}
	default:
		{
			gameMoveText+="<br>something went wrong";
			break;
		}
	}

var cStatus = "<br>current location: y: " + posx + "x: " + posy;
 cStatus += "<br> Lucina - HP: " + heroine.HP + "prizes: "+heroine.items[0] +", "+heroine.items[1] + "<br>";
document.getElementById("gametext").innerHTML = gameMoveText;
document.getElementById("status").innerHTML = cStatus;

printMap();
}





//end of game




//movement


if(wincondition == 1)
{
document.getElementById("gametext").innerHTML = "YOU WIN CONGRATS";	

}
