var racetrack		= document.getElementById('racetrack');

function Players(ele, ptimeout)
{
	this.movePositions = [0, 40, 80, 120],
	this.moveBy        = 5
	this.el            = ele;
	this.i             = 0;
	this.stop          = 1;
	this.timeout       = ptimeout;
	this.position      = 0;

	this.animate = function(){
		/* Stop if stopped */
		playerPosition = this.el.getBoundingClientRect();
		if(this.stop || playerPosition.left > (racetrack.offsetWidth - 30)){
			this.el.style.backgroundPosition = '120px 0px';
			return ;
		}

		/* Move the Player*/
		this.move((this.position + this.moveBy), this.i);

		/* Prepare Next Move if a New Position exits */
		if(this.i < this.movePositions.length ){
			setTimeout(function(_this){	
				_this.i++;
				_this.animate();
			},this.timeout,this);
		}

		/* End of positions recycle */
		if(this.i == this.movePositions.length){

			/* If end of race stop the game */
			this.i = 0;
			this.move((this.position + this.moveBy), this.i);
			this.animate();
		}
	};

	this.restart = function(){
		this.i = 0;
		this.stop = 1;
		this.move(0,0);
	};

	this.pause = function(){
		this.stop = 1;
	};

	this.play = function(){
		if(this.stop === 1){
			this.stop = 0;
			this.animate();
		}
	};

	this.move = function(to,positionIndex){
		this.position = to;
		this.el.style.backgroundPosition = '-'+this.movePositions[positionIndex]+'px 0px';
		this.el.style[getSupportedPropertyName('transform')] = 'translate('+to+'px)';
	}
}

function Game(noOfPlayers){

	var track_tmpl		= '<div class="track"><div id="player{{ x }}" class="runner"></div></div>';
	this.noOfPlayers = noOfPlayers;
	
	this.players = new Array();
	
	for (var i = 0; i < this.noOfPlayers ; i++){
		var timeout = 120 + getRandomInt(1, (this.noOfPlayers*2));
		racetrack.appendChild(createNode(track_tmpl.replace('{{ x }}', i)));
		this.players.push(new Players(document.getElementById('player' + i), timeout));
	}

	this.pause = function(){
		for (var i = 0; i < this.noOfPlayers; i++){
			this.players[i].pause();
		}
	};

	this.restart = function(){
		for (var i = 0; i < this.noOfPlayers; i++){
			this.players[i].restart();
		}
	};

	this.play = function(){
		for (var i = 0; i < this.noOfPlayers; i++){
			this.players[i].play();
		}
	};
}