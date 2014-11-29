// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'gameDiv');

var dave;
var count=3;
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
    
        
    },

    // This function is called 60 times per second
    update: function() {
        game.physics.arcade.collide(dave,this.floor);
        if((dave.body.touching.down||dave.body.velocity.y<=0)||     (dave.body.touching.up||dave.body.velocity.y<=0))dave.body.velocity.x=0;
        if(cursors.up.isDown&&dave.body.touching.down){dave.body.velocity.y=-350;}
        if(cursors.left.isDown){dave.body.velocity.x=-130;}
        if(cursors.right.isDown){dave.body.velocity.x=130;}
    },

    
};

// Add and start the 'main' state to start the game
game.state.add('main', mainState);  
game.state.start('main'); 