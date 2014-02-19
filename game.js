/*jslint browser: true*/
/*global getRandomInt, getSupportedStyleName, createNode */

(function () {
    "use strict";
    var racetrack   = document.getElementById('racetrack'),
        raceresult  = document.getElementById('raceresult'),
        resultDiv   = document.getElementById('winnerresult');

    function Players(ele, game) {

        this.movePositions  = [0, 40, 80, 120];
        this.el             = ele;
        this.stepsMoved     = 0;
        this.stop           = 1;
        this.position       = 0;
        this.timeout        = 120;


        this.animate = function () {
            /* Stop if stopped or exceding boundry*/
            var playerPosition = this.el.getBoundingClientRect();
            if (this.stop || playerPosition.left > (racetrack.offsetWidth - 30)) {
                this.el.style.backgroundPosition = '120px 0px';
                game.finish(this.el);
                return;
            }

            /* Prepare Next Move */
            setTimeout(function (that) {
                if (that.stepsMoved < that.movePositions.length) {
                    that.stepsMoved += 1;
                } else {
                    that.stepsMoved = 0;
                    that.timeout = 120 + getRandomInt(1, 30);
                }
                that.move();
                that.animate();
            }, this.timeout, this);

        };

        this.restart = function () {
            this.stepsMoved = 0;
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
            positionIndex   = positionIndex || this.stepsMoved;
            this.position   = to || (this.position + 5);

            this.el.style.backgroundPosition = '-' + this.movePositions[positionIndex] + 'px 0px';
            this.el.style[getSupportedStyleName('transform')] = 'translate(' +  this.position + 'px)';
        };
    }

    function Game() {

        var track_tmpl      = '<div class="track"><div id="player{{ x }}" class="runner"></div></div>',
            finishedPlayers   = 0,
            i = 0;

        this.noOfPlayers    =  3;
        this.chosen         =  1;
        this.players        = [];
        this.winningPlayer  = '';


        this.init_game = function () {
            var that = this;

            document.getElementById('noofplayers').addEventListener('change', function () {
                var optionsHtml = '',
                    i           = 0,
                    noofplayers = parseInt(this.value, 10);

                if (noofplayers < 3 || isNaN(noofplayers)) {
                   noofplayers = 3;
                }
                this.value = noofplayers;

                for (i = 1; i <= this.value; i += 1) {
                    optionsHtml = optionsHtml + '<option value="' + i + '">' + i + '</option>';
                }

                document.getElementById('selectplayers').innerHTML = optionsHtml;
            });

            document.getElementById('startgame').addEventListener('click', function () {
                document.getElementById('racetrack').style.display = 'block';
                document.getElementById('intro').style.display = 'none';
                that.noOfPlayers    =  parseInt(document.getElementById('noofplayers').value, 10);
                that.chosen         =  parseInt(document.getElementById('selectplayers').value, 10);

                for (i = 1; i <= that.noOfPlayers; i += 1) {
                    racetrack.appendChild(createNode(track_tmpl.replace('{{ x }}', i)));
                    that.players.push(new Players(document.getElementById('player' + i), that));
                }

                that.play();
            });
        };

        this.pause = function () {
            for (i = 0; i < this.noOfPlayers; i += 1) {
                this.players[i].pause();
            }
        };

        this.restart = function () {
            for (i = 0; i < this.noOfPlayers; i += 1) {
                this.players[i].restart();
            }
        };

        this.play = function () {
            for (i = 0; i < this.noOfPlayers; i += 1) {
                this.players[i].play();
            }
        };

        this.finish = function (ele) {
            if (this.winningPlayer === '') {
                this.winningPlayer = ele.id;
            }
            finishedPlayers += 1;
            if (finishedPlayers === this.noOfPlayers) {
                racetrack.style.display  = 'none';
                raceresult.style.display = 'block';
                if ('player' + this.chosen === this.winningPlayer) {
                    resultDiv.innerHTML = '<div class="win">You won</div>';
                } else {
                    resultDiv.innerHTML = 'You Lost. You chose player' + this.chosen + ' but winner is ' + this.winningPlayer;
                }
            }
        };
    }
    
    window.Game = Game;
}());