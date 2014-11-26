
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    
    game.load.image('dave','dude.png');
    game.load.image('unit','floor.png');
    
}

var player;
var platforms;
var cursors;
var dave;
var stars;
var score = 0;
var scoreText;
var floor;

function create() {
    dave = game.add.sprite(200,200,'dave');
    game.physics.arcade.enable(dave);
    dave.body.gravity.y = 500; 
    dave.body.collideWorldBounds = true;
    cursors = game.input.keyboard.createCursorKeys();
    floor=game.add.group();
    floor.enableBody = true;
    game.physics.arcade.enable(floor);
    for(var i=0;i<game.world.width/40;i++)
        {var temp = floor.create(i*50,game.world.height-25,'unit');temp.body.immovable=true;}
    for(var i=0;i<game.world.width/40;i++)
        {var temp = floor.create(i*50,-25,'unit');temp.body.immovable=true;}
    for(var i=0;i<game.world.height/40;i++)
        {var temp = floor.create(game.world.width-25,i*50,'unit');temp.body.immovable=true;}
    for(var i=0;i<game.world.height/40;i++)
        {var temp = floor.create(-25,i*50,'unit');temp.body.immovable=true;}
    for(var i=0;i<4;i++)
        {var temp = floor.create(game.world.width-125-50*i,game.world.height-125,'unit');temp.body.immovable=true;}
    
    
    
    
    
}

function update() {
        //game.physics.arcade.overlap(dave, floor, collission, null, this);
    game.physics.arcade.collide(dave,floor);
    dave.body.velocity.x=0;
    //dave.body.velocity.y=0;
    if(cursors.left.isDown){
        dave.body.velocity.x=-100;
    }
    if(cursors.right.isDown){
        dave.body.velocity.x=100;
    }
    if(cursors.up.isDown&&dave.body.velocity.y==0){
        dave.body.velocity.y=-500;
    }
    
}

function hit() {
    floor.kill();
}