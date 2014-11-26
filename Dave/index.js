
var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    
    game.load.image('dave','dude.png');
    game.load.image('unit','floor.png');
    game.load.image('keyImage','red.jpg');
    game.load.image('doorImage','brown.jpg');
    game.load.image('collector','voilet.jpg');
}


var dave;
var powers;
var floor;
var key;
var Level1Key;
var score = 0;
var scoreText;
var door;

function create() {     // Bug at left and right corner
    dave = game.add.sprite(200,200,'dave');
    game.physics.arcade.enable(dave);
    dave.body.gravity.y = 500; 
    dave.body.collideWorldBounds = true;
    cursors = game.input.keyboard.createCursorKeys();
    
    floor=game.add.group();
    floor.enableBody = true;
    
    /*
    points=game.add.group();
    points.enableBody=true;
    game.add.sprite(100,100,'collector'); */
    
    game.physics.arcade.enable(floor);
    key = game.add.sprite(11*50,3*50,'keyImage');
    game.physics.arcade.enable(key);
    Level1Key=0;
    door = game.add.sprite(game.world.width-50*8,game.world.height-50*3,'doorImage');
    game.physics.arcade.enable(door);
    
    //Borders
    for(var i=0;i<game.world.width/50-1;i++)
        {var temp = floor.create(i*50,game.world.height-100,'unit');temp.body.immovable=true;}
    for(var i=0;i<game.world.width/50-1;i++)
        {var temp = floor.create(i*50,50,'unit');temp.body.immovable=true;}
    for(var i=1;i<game.world.height/50-1;i++)
        {var temp = floor.create(game.world.width-100,i*50,'unit');temp.body.immovable=true;}
    for(var i=1;i<game.world.height/50-1;i++)
        {var temp = floor.create(0,i*50,'unit');temp.body.immovable=true;}
    
    //Big Bar above Exit
    for(var i=1;i<6;i++)
        {var temp = floor.create(game.world.width-200-50*i,game.world.height-4*50,'unit');temp.body.immovable=true;}
        var finalSmall = floor.create(game.world.width-210,game.world.height-4*50,'unit');finalSmall.body.immovable=true;
    
    //Small bar
    
    for(var i=0;i<4;i++)
        {var temp = floor.create(200+50*i,8*50,'unit');temp.body.immovable=true;}
    
    
    var temp = floor.create(game.world.width-200-50*5,game.world.height-50*3,'unit');temp.body.immovable='true';
    
    //Small individual pieces, Starting from left
    temp = floor.create(50,50*6,'unit');temp.body.immovable='true';
    temp = floor.create(150,50*4,'unit');temp.body.immovable='true';
    temp = floor.create(250,50*6,'unit');temp.body.immovable='true';
    temp = floor.create(350,50*4,'unit');temp.body.immovable='true';
    temp = floor.create(450,50*6,'unit');temp.body.immovable='true';
    temp = floor.create(550,50*4,'unit');temp.body.immovable='true';
    temp = floor.create(650,50*6,'unit');temp.body.immovable='true';
    temp = floor.create(750,50*4,'unit');temp.body.immovable='true';

    //Score
    scoreText = game.add.text(50, 0, 'Score: 0', { fontSize: '32px', fill: '#FFF' });
    
}

function update() {

    
    game.physics.arcade.collide(dave,floor);
    if((dave.body.touching.down||dave.body.velocity.y<=0)||(dave.body.touching.up||dave.body.velocity.y<=0))dave.body.velocity.x=0;
    if(cursors.up.isDown&&dave.body.touching.down){dave.body.velocity.y=-350;}
    if(cursors.left.isDown){dave.body.velocity.x=-100;}
    if(cursors.right.isDown){dave.body.velocity.x=100;}
    game.physics.arcade.overlap(dave,key,hit);
    game.physics.arcade.overlap(dave,door,levelOver);
}

function hit() {
    key.kill();
    Level1Key=1;
    score += 10;
    scoreText.text = 'Score: ' + score;
}

function levelOver(){
    if(Level1Key==1)scoreText.text = 'End';
}