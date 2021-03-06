// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'gameDiv');

var dave;
var count=3;
var score=0;
var scoreText;
var collectSound;
//var key;

// Creates a new 'main' state that will contain the game
var mainState = {

    // Function called first to load all the assets
    preload: function() { 
        game.load.image('dave','dude.png');
        game.load.image('unit','floor.png');
        game.load.image('keyImage','red.jpg');
        game.load.image('doorImage','brown.jpg');
        game.load.image('collector','voilet.jpg');
        game.load.image('redDiamond','orange.jpg');
        game.load.image('blueCircle','blue.jpg');
        game.load.audio('beep1','Beep1.wav');
    },

    // Fuction called after 'preload' to setup the game 
    create: function() { 
         game.physics.startSystem(Phaser.Physics.ARCADE);

        // Display the bird on the screen
        dave = this.game.add.sprite(200, 200, 'dave');
        this.door = game.add.sprite(game.world.width-50*8,game.world.height-50*3,'doorImage');
        game.physics.arcade.enable(dave);
        game.physics.arcade.enable(this.door);
        
        dave.body.gravity.y = 500; 
        dave.body.collideWorldBounds = true;
        cursors = game.input.keyboard.createCursorKeys();

        this.floor=game.add.group();
        this.floor.enableBody = true;
        game.physics.arcade.enable(this.floor);
        
        //this.floor.create(50,game.world.height-100,'unit');
  
        for(var i=0;i<game.world.width/50-1;i++)
            {var temp = this.floor.create(i*50,game.world.height-100,'unit');temp.body.immovable=true;}
        for(var i=0;i<game.world.width/50-1;i++)
            {var temp = this.floor.create(i*50,50,'unit');temp.body.immovable=true;}
        for(var i=1;i<game.world.height/50-1;i++)
            {var temp = this.floor.create(game.world.width-100,i*50,'unit');temp.body.immovable=true;}
        for(var i=1;i<game.world.height/50-1;i++)
            {var temp = this.floor.create(0,i*50,'unit');temp.body.immovable=true;}

        for(var i=1;i<6;i++)
            {var temp = this.floor.create(game.world.width-200-50*i,game.world.height-4*50,'unit');temp.body.immovable=true;}
        
        //var finalSmall = this.floor.create(300,300,'unit');
        var finalSmall = this.floor.create(game.world.width-210,game.world.height-4*50,'unit');
        finalSmall.body.immovable=true;
    
        for(var i=0;i<4;i++)
            {var temp = this.floor.create(200+50*i,8*50,'unit');temp.body.immovable=true;}
    
        var temp = this.floor.create(game.world.width-200-50*5,game.world.height-50*3,'unit');temp.body.immovable='true';
    
        temp = this.floor.create(50,50*6,'unit');temp.body.immovable='true';
        temp = this.floor.create(150,50*4,'unit');temp.body.immovable='true';
        temp = this.floor.create(250,50*6,'unit');temp.body.immovable='true';
        temp = this.floor.create(350,50*4,'unit');temp.body.immovable='true';
        temp = this.floor.create(450,50*6,'unit');temp.body.immovable='true';
        temp = this.floor.create(550,50*4,'unit');temp.body.immovable='true';
        temp = this.floor.create(650,50*6,'unit');temp.body.immovable='true';
        temp = this.floor.create(750,50*4,'unit');temp.body.immovable='true';
        temp = this.floor.create(50*17,50*6,'unit');temp.body.immovable='true';
        
        //Blue Gems
        this.collectors=game.add.group();
        this.collectors.enableBody= true;
        this.addCollectors();
        
        this.redDiamonds=game.add.group();
        this.redDiamonds.enableBody=true;
        this.redDiamonds.create(game.world.width-50*3,2*50,'redDiamond');
    
        //blueCircles
        this.blueCircles=game.add.group();
        this.blueCircles.enableBody=true;
        this.blueCircles.create(1*50,2*50,'blueCircle');

    
        scoreText = game.add.text(50, 0, 'Score: 0', { fontSize: '32px', fill: '#FFF' });
        collectSound=game.add.audio('beep1');
        
        this.key=game.add.sprite(11*50,3*50,'keyImage');
        game.physics.arcade.enable(this.key);
        //Key
        /*
        this.key = game.add.sprite(11*50,3*50,'keyImage');
        game.physics.arcade.enable(this.key);
        this.Level1Key=0;
        */
    },

    // This function is called 60 times per second
    update: function() {
        
        // Colliding and Updating logics
        game.physics.arcade.collide(dave,this.floor);
        game.physics.arcade.overlap(dave,this.collectors,this.overlapCollector);
        game.physics.arcade.overlap(dave,this.redDiamonds,this.overlapRedDiamonds);
        game.physics.arcade.overlap(dave,this.blueCircles,this.overlapBlueCircles);
        game.physics.arcade.overlap(dave,this.key,this.hit);
        
        //Velocity logic
        if((dave.body.touching.down||dave.body.velocity.y<=0)||     (dave.body.touching.up||dave.body.velocity.y<=0))dave.body.velocity.x=0;
        if(cursors.up.isDown&&dave.body.touching.down){dave.body.velocity.y=-350;}
        if(cursors.left.isDown){dave.body.velocity.x=-130;}
        if(cursors.right.isDown){dave.body.velocity.x=130;}

    
    },
    
    
    addCollector: function(x,y){
        this.collectors.create(x,y,'collector');
    },
    
    addCollectors: function(){
        this.addCollector(50*1,50*5);
        this.addCollector(50*1,50*7);
        this.addCollector(50*3,50*3);
        this.addCollector(50*5,50*5);
        this.addCollector(50*7,50*3);
        this.addCollector(50*9,50*5);
        this.addCollector(50*13,50*5);
        this.addCollector(50*15,50*3);
        this.addCollector(50*17,50*5);
    },
    
    
    overlapCollector: function(dave,collector){
       collector.kill();
        score += 10;
        scoreText.text = 'Score: ' + score;    
        collectSound.play();
    },
    
    overlapRedDiamonds: function(dave,redDiamond){
        redDiamond.kill();
        score += 20;
        scoreText.text = 'Score: ' + score;
        collectSound.play();
    },

    overlapBlueCircles: function(dave,blueCircle){
        blueCircle.kill();
        score+=15;
        scoreText.text = 'Score:' + score;
        collectSound.play();
    },  
    
    
    hit: function() {
        this.key.kill();
        scoreText.text = 'COOL!!';
    },
    
    /*
    levelOver: function(){
        if(this.Level1Key==1)scoreText.text = 'End';
    },
    */
    
};

// Add and start the 'main' state to start the game
game.state.add('main', mainState);  
game.state.start('main'); 