"use strict";
var ARRAYSIZE = 16; // 4 *4 array
var ROWS = 4;
var COLS = 4;
var ARR2048 = null;
var RANDNUMB = [2, 4, 2, 4, 2, 4];

function randBwt_floor(min, max){
	return Math.floor(Math.random() * (max - min +1)) + min;
}

// use bubble sort
// another method to shift is allocate new space
function shift(arr){
	var len = arr.length;
	var tmp = 0;
	var isShift = false;

	for(var i = 0; i < len; i++){
		for(var j = 0; j < len - i - 1; j++){
			if(arr[j] == 0){
				isShift = true;
				tmp = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = tmp;
			}
		}
	}
	return isShift;
}

function merge(arr){
	if(arr[1] == 0)
		return;
	var isMerge = false;
	var len = arr.length;
	var preMergeState = false;
	var index = 0;
	
	while(index < len){
		if(arr[index] == arr[index +1]){
			isMerge = true;
			arr[index] *= 2;
			arr[index + 1] = 0;
			index += 2;
		}else{
			index += 1;
		}
	}
	shift(arr);
	return isMerge;
}

function up(){
	console.log("up");
	var isMove = false; // not finish
	for(var col = 0; col < COLS; col++){
		var tmpCol = new Array();
		var flag_zero = true;
		var flag_all_nonzero = true;
		for(var row = 0; row < ROWS; row++){
			if(ARR2048[row*COLS + col] != 0)
				flag_zero = false;
			else
				flag_all_nonzero = false;
			tmpCol.push(ARR2048[row*COLS + col]);
		}
		//not all zero
		if(!flag_zero){
			//no zero in arr
			if(!flag_all_nonzero)
				shift(tmpCol);
			merge(tmpCol);
			for(var row = 0; row < ROWS; row++)
				ARR2048[row*COLS + col] = tmpCol[row];
		}
	}
	addRandNumb();
	showAns();
	console.log();
	render();
}

function down(){
	console.log("down");
	for(var col = 0; col < COLS; col++){
		var tmpCol = new Array();
		var flag_zero = true;
		var flag_all_nonzero = true;
		for(var row = ROWS - 1; row >=0; row--){
			if(ARR2048[row*COLS + col] != 0)
				flag_zero = false;
			else
				flag_all_nonzero = false;
			tmpCol.push(ARR2048[row*COLS + col]);
		}
		
		//not all zero
		if(!flag_zero){
			//no zero in arr
			if(!flag_all_noozero)
				shift(tmpCol);
			merge(tmpCol);
			for(var row = ROWS - 1, tmp = 0; row >= 0; row--, tmp++)
				ARR2048[row*COLS + col] = tmpCol[tmp];
		}
	}
	addRandNumb();
	showAns();
	console.log();
	render();
}

function right(){
	console.log("right");	
	for(var row = 0; row < ROWS; row++){
		var tmpRow = new Array();
		var flag_zero = true;
		var flag_all_nonzero = true;
		for(var col = COLS - 1; col >=0; row--){
			if(ARR2048[row*COLS + col] != 0)
				flag_zero = false;
			else
				flag_all_nonzero = false;
			tmpRow.push(ARR2048[row*COLS + col]);
		}
		
		//not all zero
		if(!flag_zero){
			//no zero in arr
			if(!flag_all_nonzero)
				shift(tmpRow);
			merge(tmpRow);
			for(var col = COLS - 1, tmp = 0; col >= 0; col--, tmp++)
				ARR2048[row*COLS + col] = tmpRow[tmp];
		}
	}
	addRandNumb();
	showAns();
	console.log();
	render();

}

function left(){
	console.log("left");
	for(var row = 0; row < ROWS; row++){
		var tmpRow = new Array();
		var flag_zero = true;
		var flag_all_nonzero = true;
		for(var col = 0; col < COLS; col++){
			if(ARR2048[row*COLS + col] != 0)
				flag_zero = false;
			else
				flag_all_nonzero = false;
			tmpRow.push(ARR2048[row*COLS + col]);
		}
		
		//not all zero
		if(!flag_zero){
			//no zero in arr
			if(!flag_all_nonzero)
				shift(tmpRow);
			merge(tmpRow);
			for(var col = 0; col < COLS; col++)
				ARR2048[row*COLS + col] = tmpRow[col];
		}
	}
	addRandNumb();
	showAns();
	console.log();
	render();
}

function addRandNumb(){
	var randtimes = 32;
	var index;
	var numb = RANDNUMB[randBwt_floor(0, RANDNUMB.length - 1)];
	var flag_find = false;
	while(randtimes > 0){
		index = randBwt_floor(0, ARRAYSIZE - 1);
		if(ARR2048[index] == 0){
			ARR2048[index] = numb;
			flag_find = true;
			break;
		}
		index--;
	}
	if(!find){
		while(ARR2048[index] != 0)
			index = (index + 1) % ARRAYSIZE;
		ARR2048[index] = numb;
	}
}

function render(){
	for(var i = 0; i < ARRAYSIZE; i++){
		if(ARR2048[i] == 0)
			document.getElementById((i+1) + "th").innerHTML = "";
		else
			document.getElementById((i+1) + "th").innerHTML = ARR2048[i];
	}
}

function init(){
	ARR2048 = new Array();
	for(var i=0; i<ARRAYSIZE; i++)
		ARR2048.push(0);
	//showAns();
	addRandNumb();
	//showAns();
	render();
}

function showAns(){
	for(var i=0; i<4; i++){
		var tmpArr = new Array();
		for(var j=0; j<4; j++){
			tmpArr.push(ARR2048[i*4 + j]);
		}
		console.log(tmpArr);
	}
}

init();

document.onkeydown = function(e){
	e = e || window.event;
	switch(e.which || e.keyCode){
		case 37: //left
			left();
			break;

		case 38: //up
			up();
			break;

		case 39: //right
			right();
			break;

		case 40: //down
			down();
			break;

		default: return;
	}
	e.preventDefault();
}

var tmp = [4,2,2,0];
console.log(tmp);
shift(tmp);
merge(tmp);
console.log(tmp);
console.log();
