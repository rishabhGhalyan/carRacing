class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(car1Image);
    car2 = createSprite(300,200);
    car2.addImage(car2Image);
    car3 = createSprite(500,200);
    car3.addImage(car3Image);
    car4 = createSprite(700,200);
    car4.addImage(car4Image);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
     image(trackImage,0,-7*displayHeight,displayWidth,displayHeight*8)
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 120 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        //x = x + 200;
        
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = cars[index-1].x
          camera.position.y = cars[index-1].y;
           
           if(keyIsDown(RIGHT_ARROW) && player.index !== null){
          cars[index-1].x += 7;
        }
        if(keyIsDown(LEFT_ARROW) && player.index !== null){
          cars[index-1].x -= 7;
        }
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=15
      player.update();
    }
    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distance -=10
      player.update();
    }


    if(player.distance > 5950){
      gameState = 2;
    }
   
    drawSprites();
  }
  if(gameState=2){
    fill("white")
     textSize(15);
     text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 50,display_position)
  }

  end(){
    console.log("Game Ended");
  }
}