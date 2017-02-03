//questions in arrays as data
var questions = [
	["Ich habe d__ Schussel zu Hause vergessen!", "die", "der", "den", "c"],
	["Donde f__ el anoche?", "fue", "fui", "fuiste", "a"],
	["Il n'a pas beaucoup d_ argent.", "de", "der", "d'", "c"],
	["D__ deutsche Grammatik ist nicht sehr schwierig", "die", "das", "den", "a"],
	["Podemos ir __ supercado manana si tines ganas?", "a la", "al", "alo", "b"],
	["On voudrait aller a_ parc.", "au", "a la", "a", "a"],
	["Wo___ gehen Sie Heute abend?", "hin", "ran", "Wo", "a"]
];

var diffQuestions = [
	["Ach, wie schon! Du hast m__ diese bunte Blumen gekauft!", "mich", "mir", "muns", "b"],
	["Zwischen d__ grossen Baumen, steht d__ Gatner.", "den + der", "der + den", "den + den", "a"],
	["Tu vas t__ sortir?", "t'en", "te", "tu", "a"],
	["La maison dans la_____ j'habite est sale..", "laquel", "laquelle", "laquels", "b"],
	["Habria cambia__ sus vestido antes de venir aqui, pero no teni_ bastante tiempo.", "cambiar + tenir", "cambiar + tenia", "cambiado + cambia", "c"],
	["No se si s__ abierto en este momento.", "sabe", "supa", "sea", "c"],
	["hola...", "hola", " adios", "buena", "a"]
];

//list of vars

var questionBox = document.querySelector(".question");
var choiceBox = document.querySelector(".choices");
var correct=0;
var position=0;
var qslength = questions.length;
var choices = document.getElementsByName("choices");
var choice;
var count=0;
var difficulty = document.querySelectorAll(".difficulty");
var displayResponse = document.querySelector(".displayResponse")
var placeHolder = questions;
var overlay = document.querySelector(".overlay");
var challenge = document.querySelectorAll("a");

for(var x=0; x<challenge.length; x++){
	challenge[x].addEventListener("click", function(){
		if(this.classList.contains("easy")){
			correct=0;
			position=0;
			placeHolder = questions;
			renderQs();
		} else if(this.classList.contains("hard")){
			correct=0;
			position=0;
			placeHolder = diffQuestions;
			renderQs();
		}
	});
}

//hook up the buttons to the data array

for(var i=0; i<difficulty.length; i++){
	difficulty[i].addEventListener("click", function(){
		difficulty[0].classList.remove("selected");
		difficulty[1].classList.remove("selected");
		this.classList.add("selected");

		if(this.classList.contains("easy")){
			correct=0;
			position=0;
			placeHolder = questions;
			renderQs();
		} else if(this.classList.contains("hard")){
			correct=0;
			position=0;
			placeHolder = diffQuestions;
			renderQs();
		}
	});
}
//render the question function(also a reset button)

function renderQs(){
	//create if/else statement to capture last question ad load results

	if(position>=qslength){
		console.log(correct+"/"+qslength+"position: "+position);
		setTimeout(function(){
			overlay.style.opacity=1;
			overlay.style.zIndex ="99";
		}, 500);

		setTimeout(function(){
			displayResponse.innerHTML = "<br>Wasn't that fun? Mais maintenant malhereusement, es ist vorbei...";
			displayResponse.innerHTML += "You scored " + Math.round((correct/qslength)*100) + "%";
			questionBox.style.display="none";
			choiceBox.style.display="none";
			overlay.style.opacity=0;
			overlay.style.zIndex ="-99";

			if(placeHolder==questions){
				difficulty[1].innerHTML = "Take the next step up!";
				difficulty[1].classList.add("flash");
			}else if(placeHolder==diffQuestions){
				difficulty[0].innerHTML = "Try something easier";
				difficulty[0].classList.add("flash");
			}
			return false;
			}, 2000);
	}

	displayResponse.innerHTML="";
	questionBox.style.display="block";
	choiceBox.style.display="block";
	difficulty[0].innerHTML="Easy";
	difficulty[1].innerHTML="Medium";
	difficulty.forEach(function(mode){
		mode.classList.remove("flash");
	});

	var labelOne = document.querySelector(".label1");
	var labelTwo = document.querySelector(".label2");
	var labelThr = document.querySelector(".label3");

	var qPosition = placeHolder[position][0];
	var ch1 = placeHolder[position][1], ch2 = placeHolder[position][2], ch3 = placeHolder[position][3];

	questionBox.innerHTML = qPosition;
	labelOne.innerHTML = ch1;
	labelTwo.innerHTML = ch2;
	labelThr.innerHTML = ch3;
}

//hook up the chosen answer with the actual answer to verify if correct or not
//increment correct if correct and the position as well
//load the next question

function checkAnswers(){
	
	 for(var i=0; i<choices.length; i++){
	 	if(choices[i].checked){
	 		choice = choices[i].value;
	 		choices[i].checked =false;
	 	}
	}

	 if(choice == placeHolder[position][4]){
	 	correct++
	 }

	position++
	renderQs();
}

function randomQ(){
	var ranQ = Math.ceil(Math.random()*6);
	return ranQ;
}

setTimeout(function(){
	overlay.style.opacity=0;
	overlay.style.zIndex ="-1";
}, 2000);

window.addEventListener("load", renderQs, false);