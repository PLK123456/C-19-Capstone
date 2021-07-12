var towerImage, tower;
var doorImage, door, doorGroup;
var climberImage, climber, climberGroup;
var invClimber, invClimberGroup;
var ghostImage, ghost;
var gameState = "PLAY";




function preload()
{
    towerImage = loadImage("tower.png");
    doorImage = loadImage("door.png");
    climberImage = loadImage("climber.png");
    ghostImage = loadImage("ghost-standing.png")
}


function setup ()
{
    createCanvas(600, 600);

    tower = createSprite(300,300);
    tower.addImage(towerImage);
    tower.velocityY = 1;

    doorGroup = new Group();
    climberGroup = new Group();
    invClimberGroup = new Group();

    ghost = createSprite(200,200,50,50);
    ghost.addImage(ghostImage);
    ghost.scale = 0.3;

    ghost.debug = false;
    ghost.setCollider("rectangle",-20,0,150,240)
   
    
}


function draw()
{
    background("black");
    console.log(tower.y);
    
    if(gameState === "PLAY")
    {
        if(tower.y > 450)
    {
        tower.y = tower.width/2
    }

    if(keyDown("space"))
    {
        ghost.velocityY = -3;
        
    }
    if(keyDown("right"))
    {
        ghost.x = ghost.x + 3;
    
    }
    if(keyDown("left"))
    {
        ghost.x = ghost.x - 3
    }
    //ghost.velocityY = ghost.velocityY + 2 
    if(climberGroup.isTouching(ghost))
    {
        ghost.velocityY = 0;
        
    }
    
    spawnDoor();
    
    if(invClimberGroup.isTouching(ghost) || ghost.y > 600)
    {
        ghost.destroy();
        gameState = "END";
    }

    drawSprites();
    }
   
    
    


    
    

    if(gameState === "END")
    {
        textSize(30);
        fill("red");
        text("GAMEOVER",200,200);
        
    }

}

function spawnDoor()
{
    
    
    if(frameCount % 250 === 0)
    {
        door = createSprite(200,-50);
        door.addImage(doorImage);
        door.velocityY = 1;
        door.x = Math.round(random(120,500));
        doorGroup.add(door);
        door.lifetime = 700;
        ghost.depth = door.depth+3;
        


        climber = createSprite(200,10);
        climber.addImage(climberImage);
        climber.velocityY = 1;
        climber.x = door.x;
        climber.lifetime = 700;
        climberGroup.add(climber);
        ghost.depth = climber.depth + 3;
        
        
        invClimber = createSprite(200,15)
        invClimber.x = climber.x
        invClimber.width = climber.width;
        invClimber.height = 2;
        invClimber.velocityY = 1;
        invClimber.lifetime = 700;
        invClimberGroup.add(invClimber);
        invClimber.visible = false;

    }



}










