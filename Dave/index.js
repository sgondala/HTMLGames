
var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    
    game.load.image('dave','dude.png');
    game.load.image('unit','floor.png');
    game.load.image('keyImage','red.jpg');
    game.load.image('doorImage','brown.jpg');
    game.load.image('collector','voilet.jpg');
    game.load.image('redDiamond','orange.jpg');
    game.load.image('blueCircle','blue.jpg');
    game.load.audio('beep1','Beep1.wav');
}

var dave;
var floor;
var key;
var Level1Key;
var score = 0;
var scoreText;
var door;
var collectors;
var winText;
var redDiamonds;
var blueCircles;
var collectSound;

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
    key = game.add.sprite(11*50,3*50,'keyImage');
    game.physics.arcade.enable(key);
    Level1Key=0;
    
    
    //Collectors
    collectors=game.add.group();
    collectors.enableBody= true;
    addCollectors();
    
    //redDIaminds
    redDiamonds=game.add.group();
    redDiamonds.enableBody=true;
    redDiamonds.create(game.world.width-50*3,2*50,'redDiamond');
    
    //blueCircles
    blueCircles=game.add.group();
    blueCircles.enableBody=true;
    blueCircles.create(1*50,2*50,'blueCircle');
    
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

    //Score
    scoreText = game.add.text(50, 0, 'Score: 0', { fontSize: '32px', fill: '#FFF' });
    winText = game.add.text(300,game.world.height-50,'', { fontSize: '32px', fill: '#FFF' });
    game.physics.arcade.enable(temp);
    
    //Sounds
    collectSound=game.add.audio('beep1');
}

function update() {
    game.physics.arcade.collide(dave,floor);
    if((dave.body.touching.down||dave.body.velocity.y<=0)||(dave.body.touching.up||dave.body.velocity.y<=0))dave.body.velocity.x=0;
    if(cursors.up.isDown&&dave.body.touching.down){dave.body.velocity.y=-350;}
    if(cursors.left.isDown){dave.body.velocity.x=-100;}
    if(cursors.right.isDown){dave.body.velocity.x=100;}
    game.physics.arcade.overlap(dave,key,hit);
    game.physics.arcade.overlap(dave,door,levelOver);
    game.physics.arcade.overlap(dave,collectors,overlapCollector);
    game.physics.arcade.overlap(dave,redDiamonds,overlapRedDiamonds);
    game.physics.arcade.overlap(dave,blueCircles,overlapBlueCircles);
}

function hit() {
    key.kill();
    Level1Key=1;
    winText.text = 'GOOD, GO TO THE DOOR';
}

function levelOver(){
    if(Level1Key==1)scoreText.text = 'End';
}

function addCollectors(){
    addCollector(50*1,50*5);
    addCollector(50*1,50*7);
    addCollector(50*3,50*3);
    addCollector(50*5,50*5);
    addCollector(50*7,50*3);
    addCollector(50*9,50*5);
    addCollector(50*13,50*5);
    addCollector(50*15,50*3);
    addCollector(50*17,50*5);
}

function addCollector(x,y){
    var tempCollector = collectors.create(x,y,'collector');
}

function overlapCollector(dave,collector){
    collector.kill();
    score += 10;
    scoreText.text = 'Score: ' + score;
    collectSound.play();
}

function overlapRedDiamonds(dave,redDiamond){
    redDiamond.kill();
    score += 20;
    scoreText.text = 'Score: ' + score;
    collectSound.play();
}

function overlapBlueCircles(dave,blueCircle){
    blueCircle.kill();
    score+=15;
    scoreText.text = 'Score:' + score;
    collectSound.play();
}