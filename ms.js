new Vue ({
    el: '#app',
    data: {
      name: '',
      showRules: true,
      playerIcon: '' ,
      isActive1: false,
      isActive2: false,
      isActive3: false,
      isActive4: false,
      playerTurn: false,
      userName: false,
      playerHealth: 100,
      gameOn: false,
      monsterHealth: 100,
      normalAttackText: ' does 7 damage',
      specialAttackText:' does 15 damage',
      dragonSpecialAttackText:' does 18 damage',
      healUpText: ' heals',
      specialCounter: 0,
      monsterSpecialCounter: 0,
      isPlaying: false,
      turn: true,
      log: [

      ],
    },


    methods: {
      getName(){
        this.userName = !this.userName;
        this.userNamePage++;
      },
      rulesWindow(){
        this.showRules = !this.showRules;

      },
      getImage1(){
        this.playerIcon = './images/char1.png' ;
        this.isActive1 = !this.isActive1;

      },
      getImage2(){
        this.playerIcon = './images/char2.png' ;
        this.isActive2 = !this.isActive2;
      },
      getImage3(){
        this.playerIcon = './images/char3.png' ;
        this.isActive3 = !this.isActive3;
      },
      getImage4(){
        this.playerIcon = './images/char4.png' ;
        this.isActive4 = !this.isActive4;
      },
      gaveUp(){
        if(this.playerHealth != 0){
          this.playerHealth = 0;
          alert("Losing is honorable, giving up isn't!");
          this.gameOn= false;
          this.log=[];
          this.log.unshift( this.name +" RUNS AWAY!! DRAGON WINS");

        }
        else {
          alert("Come on! You already lost pal");
        }

      },
      startGame(){
        this.gameOn = true;
        this.log=[];
        this.specialCounter = 0;
        this.monsterSpecialCounter=0;
        this.playerHealth= 100;
        this.monsterHealth = 100;
        this.log.unshift("GAME STARTS!!");

      },
      //MONSTER ATTACK FUNCTIONS
      monsterNormal(){
      if (this.playerHealth >= 0){
        this.playerHealth -= 7;
        this.playerTurn = false;
        this.log.unshift("DRAGON" + this.normalAttackText);
        this.monsterSpecialCounter++;
        if(this.playerHealth <= 0){
          alert("We have a winner!");
          this.gameOn = false;
          this.log.unshift("DRAGON WINS!!");

      }
      }
      else {
        alert("Dragon Wins!");
        this.gameOn = false;
    }

    } ,
      monsterSpecial(){
      if (this.playerHealth > 0){
        if(this.monsterSpecialCounter >= 4){
          this.playerHealth -= 19;
          this.playerTurn = false;
          this.log.unshift("DRAGON" + this.dragonSpecialAttackText);
          this.monsterSpecialCounter = 0;
          if(this.playerHealth <= 0){
            alert("We have a winner!");
            this.log.unshift("DRAGON WINS!!");
            this.gameOn = false;
            }
          }
        }
        else{
          alert("DRAGON WINS!");
          this.gameOn = false;
      }

    },
      monsterHeal(){
      if(this.monsterHealth <= 90){
        if(this.monsterHealth > 0 && this.monsterSpecialCounter > 0){
          this.monsterHealth += 10;
          this.monsterSpecialCounter--;
          this.playerTurn = false;
          this.log.unshift("DRAGON" + this.healUpText);
          }
        }

    },
      //MONSTER LOGIC
      monsterAttack(){
      if(this.monsterSpecialCounter >= 4){
        this.monsterSpecial() ;
      }
      else if (this.monsterHealth < 16) {
        this.monsterHeal();
      }
      else {
        this.monsterNormal();
      }

      },
      //HUMAN ATTACK FUNCTIONS
      normalAttack(){
        if (this.monsterHealth > 0){
          this.monsterHealth -= 7;
          this.playerTurn = true;
          this.log.unshift(this.name + this.normalAttackText);
          this.specialCounter++;
          if (this.monsterHealth <= 0){
            alert("We have a winner!");
            this.log.unshift(this.name +" WINS!!");
            this.gameOn = false;
          }
          else{
            this.monsterAttack();
          }
        }
    },
      specialAttack(){
        if (this.monsterHealth > 0){
          if(this.specialCounter >= 5){
            this.monsterHealth -= 15;
            this.playerTurn = true;
            this.log.unshift(this.name + this.specialAttackText);
            this.specialCounter = 0;
            if (this.monsterHealth <= 0){
              alert("We have a winner!");
              this.log.unshift(this.name +" WINS!!");
              this.gameOn = false;
            }
            else{
              this.monsterAttack();
            }
          }
        }
      },
      healUp(){
        if(this.playerHealth <= 90 && this.specialCounter > 0)
        {
          if(this.playerHealth > 0)
          {
            this.playerHealth += 12;
            this.specialCounter -= 1;
            this.playerTurn = true;
            this.log.unshift(this.name + this.healUpText);
            this.monsterAttack();
          }
        }
      },

  },

      playAudio(newSound){
    var audio = new Audio('newSound');
    audio.play();
}











});
