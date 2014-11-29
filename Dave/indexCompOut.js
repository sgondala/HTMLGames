
var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'gameDiv', { preload: preload, create: create, update: update });

function preload() {
    
    game.load.image('dave','dude.png');
    game.load.image('unit','floor.png');
    game.load.image('keyImage','red.jpg');
    game.load.image('doorImage','brown.jpg');
    game.load.audio('beep1','Beep1.wav');
}

var dave;
var floor;
var door;

function create() {     // Bug at left and right corner
    //Door
    door = game.add.sprite(game.world.width-50*8,game.world.height-50*3,'doorImage');
    game.physics.arcade.enable(door);
    
    //dave
    dave = game.add.sprite(200,200,'dave');
    game.physics.arcade.enable(dave);
    dave.body.gravity.y = 500; 
    dave.body.collideWorldBounds = true;
    cursors = game.input.keyboard.createCursorKeys();
    
    floor=game.add.group();
    floor.enableBody = true;
    
    game.physics.arcade.enable(floor);
        
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
    temp = floor.create(50*17,50*6,'unit');temp.body.immovable='true';

}

function update() {
    game.physics.arcade.collide(dave,floor);
    if((dave.body.touching.down||dave.body.velocity.y<=0)||(dave.body.touching.up||dave.body.velocity.y<=0))dave.body.velocity.x=0;
    if(cursors.up.isDown&&dave.body.touching.down){dave.body.velocity.y=-350;}
    if(cursors.left.isDown){dave.body.velocity.x=-130;}
    if(cursors.right.isDown){dave.body.velocity.x=130;}
}
