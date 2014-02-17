/*jslint browser: true*/

var racetrack        = document.getElementById('racetrack');
var raceresult       = document.getElementById('raceresult');
var resultDiv     = document.getElementById('winnerresult');

function Players(ele, game) {
    this.movePositions  = [0, 40, 80, 120];
    this.moveBy         = 5;
    this.el             = ele;
    this.i              = 0;
    this.stop           = 1;
    this.position       = 0;
    this.timeout        = 120 + getRandomInt(1, (game.noOfPlayers * 10));


    this.animate = function () {
        /* Stop if stopped */
        var playerPosition = this.el.getBoundingClientRect();
        if (this.stop || playerPosition.left > (racetrack.offsetWidth - 30)) {
            this.el.style.backgroundPosition = '120px 0px';
            game.finish(this.el);
            return;
        }

        /* Prepare Next Move */        
        setTimeout(function (_this) {
            if (_this.i < _this.movePositions.length) {
                _this.i++;
            } else {
                _this.i = 0;
               _this.timeout = 120 + getRandomInt(1, (game.noOfPlayers * 10));
            }
            _this.move();
            _this.animate();
        }, this.timeout, this);
        
    };

    this.restart = function () {
        this.i = 0;
        this.stop = 1;
        this.move(0, 0);
    };

    this.pause = function () {
        this.stop = 1;
    };

    this.play = function () {
        if (this.stop === 1) {
            this.stop = 0;
            this.animate();
        }
    };

    this.move = function (to, positionIndex) {
        positionIndex   = positionIndex || this.i;
        this.position   = to || (this.position + this.moveBy);

        this.el.style.backgroundPosition = '-' + this.movePositions[positionIndex] + 'px 0px';
        this.el.style[getSupportedPropertyName('transform')] = 'translate(' +  this.position + 'px)';
    };
}

function Game(noOfPlayers, chosen) {

    var track_tmpl      = '<div class="track"><div id="player{{ x }}" class="runner"></div></div>',
        finishedPlayers   = 0,
        i = 0;
        
    this.noOfPlayers    = noOfPlayers;
    this.players        = [];
    this.winningPlayer   = '';
    

    for (i = 1; i <= this.noOfPlayers; i++) {
        racetrack.appendChild(createNode(track_tmpl.replace('{{ x }}', i)));
        this.players.push(new Players(document.getElementById('player' + i), this));
    }

    this.pause = function () {
        for (i = 0; i < this.noOfPlayers; i++) {
            this.players[i].pause();
        }
    };

    this.restart = function () {
        for (i = 0; i < this.noOfPlayers; i++) {
            this.players[i].restart();
        }
    };

    this.play = function () {
        for (i = 0; i < this.noOfPlayers; i++) {
            this.players[i].play();
        }
    };

    this.finish = function (ele) {
        if (this.winningPlayer === '') {
            this.winningPlayer = ele.id;
        }
        finishedPlayers++;
        if (finishedPlayers === this.noOfPlayers) {
            racetrack.style.display  = 'none';
            raceresult.style.display = 'block';
            if ('player' + chosen === this.winningPlayer) {
                resultDiv.innerHTML = '<div class="win">You won</div>';
            } else {
                resultDiv.innerHTML = 'You Lost. You chose player' + chosen + ' but winner is ' + this.winningPlayer;
            }
        }
    };
}