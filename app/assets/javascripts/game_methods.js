var player_on_move = "player1";
var winner =''
var moves = {};
	
//Start Game
function intialize_game(){
	fill_player_hash(moves);
	var player1 = prompt("Player 1 Name");
	var player2 = prompt("Player 2 Name");
	if (player1 && player2 != null){
		document.getElementById("p1").innerHTML = "Player 1 : " + player1;
		document.getElementById("p2").innerHTML = "Player 2 : " + player2;
		document.getElementById("player").innerHTML = "on Move: " + player_on_move;
		btn = document.getElementById("start_game");
		btn.disabled="true";
		btn.className="myButton_disabled";
		document.getElementById("board").style.display = 'table';
	}
}

//Arrays within Hash. Contains the moves of players.
function fill_player_hash(hash){
	for(a=1; a<=6; a++){
		var arr = [];
		for(b=0; b<7; b++){
			arr.push(0);
		}
		hash["row" + a.toString()] = arr;
	}
}

//this will tell where to plot the move. which column, td and user.
function get_empty_cell(column_no, player_no){
	for(a = 1; a<=6; a++){
		var row_name = "row"+a.toString();
		var table_row = document.getElementById(row_name);
		var td = table_row.getElementsByTagName("td")[column_no-1];

		if(moves[row_name][parseInt(column_no-1)] == 0){
			if (player_no == 1){
				td.className="circle_pl1";
			}
			else{
				td.className="circle_pl2";
			}

			save_move(row_name,(column_no-1), parseInt(player_no));
			break; 
		}
	} 
}

//checks if player wins. return boolean value.
function check_if_wins(val1, val2, val3, val4){
	return ((val1 != 0) && (val1 == val2) && (val1 == val3) && (val1 == val4))
}

//after winning
function reinitialize(){
	document.getElementById('start_game').visibility="hidden";
}

function compile_row(row, index){

	if (is_it_draw(moves) != false){
		alert("DRAW!");
	}

	//horizontal checking
	for(a=0; a<4; a++){
		result = check_if_wins(row[a], row[(a+1)], row[(a+2)], row[(a+3)])
		if(result == true){
			alert(player_on_move + " Win!");
				window.location.reload();
		}
	}

	//vertical checking
	for(a=1; a<=3; a++){
		result = check_if_wins(get_column_no(a, index), 
						 get_column_no((a+1), index), 
						 get_column_no((a+2), index), 
						 get_column_no((a+3), index));
		if (result == true) {
			alert(player_on_move + " Win!");
				window.location.reload();
		}
	}

	//diagonal up checking
	for(a=1; a<4; a++){
		for(b=0; b<4; b++){
			result = check_if_wins(access_move(a,b), access_move((a+1),(b+1)), access_move((a+2), (b+2)), access_move((a+3), (b+3)));
			if (result == true){
				alert(player_on_move + " Win!");
				window.location.reload();
			}
		}
	}

	//diagonal down checking
	for(a=6; a>3; a--){
		for(b=0; b<4; b++){
			result = check_if_wins(access_move(a, b), access_move((a-1), (b+1)), access_move((a-2), (b+2)), access_move((a-3),(b+3)));
			if(result == true){
				alert(player_on_move + " Win!");
				window.location.reload();
			}
		}
	}
}

function is_it_draw(hash){
	var is_draw = false;
	for(a=0; a<6; a++){
		for(b=0; b<=6; b++){
			if(moves["row"+(a+1).toString()][b] == 0){
				is_draw = false
			}
		}
	}
	return is_draw;
}

//gets the move from hash-array.
function access_move(row_number, index){
	row = "row"+row_number.toString();
	return moves[row][index];
}

//place move into hash-array. moves.
function save_move(row, index, player_no){
	moves[row][index] = player_no;
	compile_row(moves[row], index);
}

//gets vertical plotted moves.
function get_column_no(row_number, index){
	value = moves["row"+row_number.toString()][index];
	return value;
}

function put_move(button_id, name){
	var column_no = button_id.slice(-1);
	get_empty_cell(parseInt(column_no), player_on_move.slice(-1));
	if (player_on_move == 'player1'){
		player_on_move = 'player2';
	}else{
		player_on_move = 'player1';
	}
}	