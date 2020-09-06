var ms = 0;
var sec = 0;
var mins = 0;
var flag = false;

var flagB = false;
var start ;
var end ;

var intervalId ;
var difference;

const expression = "Lorem";

var element = document.getElementById("chrono");

function writeChrono(mins , sec , ms){
	
	element.innerHTML = mins +" : " + sec +" : " + ms
}

function changeChrono(){
	end = new Date();
	difference = end - start;
	difference = new Date(difference);

	ms = difference.getMilliseconds(); 

	sec = difference.getSeconds(); 

	mins = difference.getMinutes(); 
	

	writeChrono( mins , sec , ms);
	
}

function startChrono(){
	if ( ! flagB ){
		start = new Date();
		intervalId = setInterval( changeChrono , 10 );
		flagB = true;
	}
	
}

function stopChrono(){
	clearInterval(intervalId);
}

function turnToZero(){
	var element = document.getElementById("chrono");
	ms = 0;
	sec = 0;
	mins = 0;
	writeChrono(mins, sec , ms);
	clearInterval(intervalId);
}

function checkMatching(){
	console.log( "is called");
	var input = document.getElementById("text");
	var inputVal = input.value;
	if ( inputVal == expression ){
		stopChrono();
		console.log("true");
	} else {
		console.log( "false")
	}
}




function initialize(){


	var element = document.getElementById("text");
	if (! flag){
			element.addEventListener( "input" , startChrono);
			flag = true;
	}
	

	element.addEventListener( "input" , checkMatching);

}