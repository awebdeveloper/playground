"use strict";
var racetrack        = document.getElementById('racetrack');
var raceresult       = document.getElementById('raceresult');
var winnerresult     = document.getElementById('winnerresult');

function Players(ele, game)
{
    this.movePositions = [0, 40, 80, 120];
    this.moveBy        = 5;
    this.el            = ele;
    this.i             = 0;
    this.stop          = 1;
    this.position      = 0;
    this.timeout       = 120 + getRandomInt(1, (game.noOfPlayers*2));


    this.animate = function(){
        /* Stop if stopped */
        var playerPosition = this.el.getBoundingClientRect();
        if(this.stop || playerPosition.left > (racetrack.offsetWidth - 30)){
            this.el.style.backgroundPosition = '120px 0px';
            game.finish(this.el);
            return ;
        }

        /* Prepare Next Move */
        setTimeout(function(_this){ 
            if(_this.i < _this.movePositions.length ){
                _this.i++;
            }
            else{
                _this.i = 0;
            }
            _this.move();
            _this.animate();
        },this.timeout,this);
        
    };

    this.restart = function(){
        this.i = 0;
        this.stop = 1;
        this.move(0, 0);
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

    this.move = function(to, positionIndex){
        positionIndex   = positionIndex || this.i;
        this.position   = to || (this.position + this.moveBy);

        this.el.style.backgroundPosition = '-'+this.movePositions[positionIndex]+'px 0px';
        this.el.style[getSupportedPropertyName('transform')] = 'translate('+ this.position +'px)';
    }
}

function Game(noOfPlayers){

    var track_tmpl      = '<div class="track"><div id="player{{ x }}" class="runner"></div></div>';

    this.noOfPlayers    = noOfPlayers;
    this.players        = [];
    this.winningPlayer   = '';
    this.finishedPlayers   = '';
    
    for (var i = 0; i < this.noOfPlayers ; i++){
        var playerNo = i+1;
        racetrack.appendChild(createNode(track_tmpl.replace('{{ x }}', playerNo)));
        this.players.push(new Players(document.getElementById('player' + playerNo), this));
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

    this.finish = function(ele){
        if(this.winningPlayer === ''){
            this.winningPlayer === ele.id;
        }
        this.finishedPlayers++;
        if(this.finishedPlayers === this.noOfPlayers){
            racetrack.style.display  = 'none';
            raceresult.style.display = 'block';
            winnerresult.innerHTML = this.winningPlayer;
        }
    };
}