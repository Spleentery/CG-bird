import { CGFscene, CGFcamera, CGFaxis, CGFtexture } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyBird } from "./MyBird.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyBirdEgg } from "./MyBirdEgg.js";
import { MyNest } from "./MyNest.js";
import { MyBillboard } from "./MyBillboard.js";
import { MyTreeGroupPatch } from "./MyTreeGroupPatch.js";
import { MyTreeRowPatch } from "./MyTreeRowPatch.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    // materials and textures initialization
    this.panoramaTexture = new CGFtexture(this, "images/panorama.jpg");
		this.terrainTex = new CGFtexture(this, "images/terrain.jpg");
    this.terrainMap = new CGFtexture(this, "images/heightmap1.jpg");
    this.terrainGradient = new CGFtexture(this, "images/altimetry.png");
    this.eggTexture = new CGFtexture(this, "images/egg.jpg");
    this.nestTexture = new CGFtexture(this, "images/nest.jpg");

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.sphere = new MySphere(this);
    this.bird = new MyBird(this);
    

    this.initCameras();

    this.birdEgg = new MyBirdEgg(this, this.eggTexture, 105,-44,15, -Math.PI/4);     
    this.birdEgg2 = new MyBirdEgg(this, this.eggTexture, 100,-44,20, Math.PI/4);  
    this.birdEgg3 = new MyBirdEgg(this, this.eggTexture, 95,-44,25, Math.PI/6); 
    this.birdEgg4 = new MyBirdEgg(this, this.eggTexture, 84,-44,35, -Math.PI/3);
    this.eggs = [];
    this.eggs.push(this.birdEgg);
    this.eggs.push(this.birdEgg2);
    this.eggs.push(this.birdEgg3);
    this.eggs.push(this.birdEgg4);


    this.panoramaTexture = new CGFtexture(this, "images/panorama.jpg");
    this.nest = new MyNest(this, this.nestTexture);
    this.panorama = new MyPanorama(this, this.panoramaTexture);
    this.terrain = new MyTerrain(this, this.terrainTex, this.terrainMap, this.terrainGradient, 12.0);
    this.billboard = new MyBillboard(this, 3);
    this.treeGroupPatch = new MyTreeGroupPatch(this);
    this.treeRowPatch = new MyTreeRowPatch(this);
    
    //Objects connected to MyInterface
    this.displayAxis = false;
    this.scaleFactor = 1;
    this.displaySphere = false;
    this.displayPanorama = true;
    this.displayTerrain = true;
    this.displayEgg = true;
    this.displayNest = true;
    this.displayBillboard = true;
    this.displayTreePatch = true;
    this.displayTreeRow = false;
    this.enableTextures(true);
    this.speedFactor = 1;

    //Music
    this.music = new Audio('music/music.mp3');
    this.music.volume = 0.7;
    this.music.loop=true;

    this.setUpdatePeriod(16);
  }

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }

  initCameras() {
    

    this.camera = new CGFcamera(1.0, 0.1, 1000, vec3.fromValues(0, 0, 5), vec3.fromValues(115, -43, 20));
     

  }



  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }


  display() {
    // ---- BEGIN Background, camera and axis setup

    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();


    // Camera following the bird (uncomment to have the camera following the bird)
    // const cameraOffset = vec3.fromValues(-10, 6, 5); // Offset from the bird's position
    // const target = vec3.fromValues(this.bird.birdX, this.bird.birdY, this.bird.birdZ); // Bird's position
    // const position = vec3.create();
    // vec3.add(position, target, cameraOffset);
    // this.camera.setPosition(position);
    // this.camera.setTarget(target);
    

   

    // Draw axis
    if (this.displayAxis) this.axis.display();
    
    this.setDefaultAppearance();

    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    this.multMatrix(sca);

    // ---- BEGIN Primitive drawing section
    
    //Panorama
    this.pushMatrix();
    this.rotate(-Math.PI/2, 1, 0, 0);
    if (this.displayPanorama) this.panorama.display();

    //Billboard
    this.pushMatrix();
    this.rotate(Math.PI/2,1,0,0);
    if (this.displayBillboard)this.billboard.display(90,-39,60);
    this.popMatrix();
    this.popMatrix();

    //Tree Patch
    this.pushMatrix();
    if(this.displayTreePatch)this.treeGroupPatch.display();
    this.popMatrix();

    //Tree Row
    this.pushMatrix();
    if (this.displayTreeRow) this.treeRowPatch.display();
    this.popMatrix();

    //Bird
    this.pushMatrix();
    this.bird.display();
    this.popMatrix();

   //Nest
    this.pushMatrix();
    this.translate(115, -43, 20);
    if (this.displayNest) this.nest.display();
    this.popMatrix();

    //Terrain
    this.pushMatrix();
    this.translate(0, -10, 0);
    this.scale(50, 1, 50);
    this.rotate(-1*Math.PI/2, 1, 0, 0);
    if(this.displayTerrain)
      this.terrain.display();
    this.popMatrix();

    
     //Placing the eggs in the initial position
    this.pushMatrix();
    if (this.displayEgg) {
      for (var i = 0; i < this.eggs.length; i++) {
          this.pushMatrix();  
          switch(i) {
              case 0:
                  this.translate(0.3, 0, 0);   //defines egg position in the nest
                  this.translate(this.birdEgg.eggX, this.birdEgg.eggY,this.birdEgg.eggZ); 
                  this.rotate(this.birdEgg.angleRot, 0, 0, 1);
                  break;
              case 1:
                  this.translate(-0.3, 0, 0);
                  this.translate(this.birdEgg2.eggX, this.birdEgg2.eggY,this.birdEgg2.eggZ); 
                  this.rotate(this.birdEgg2.angleRot, 0, 0, 1);
                  break;
              case 2:
                  this.translate(0, 0, 0.3);
                  this.translate(this.birdEgg3.eggX, this.birdEgg3.eggY,this.birdEgg3.eggZ); 
                  this.rotate(this.birdEgg3.angleRot, 0, 0, 1);
                  break;
              case 3:
                  this.translate(0, 0, -0.3);
                  this.translate(this.birdEgg4.eggX, this.birdEgg4.eggY,this.birdEgg4.eggZ);
                  this.rotate(this.birdEgg4.angleRot, 0, 0, 1);
                  break;
             
          }
          if (this.eggs[i].displayOrNot) this.eggs[i].display();
          this.popMatrix(); 
      }
  }


    // ---- END Primitive drawing section

  }

  
  //Updates the bird in the scene, regarding the pressed keys 
  update() {
    this.checkKeys();
    this.bird.update();
  };
  
  

  //Deals with the pressed keys, calling the methods related to each one
  checkKeys() {
    var text="Keys pressed: ";
    var keysPressed = false;

    //W increases the bird's speed and starts the background music
    if (this.gui.isKeyPressed("KeyW")) {
      this.music.play();
      this.bird.accelerate(0.05 * this.speedFactor);  //multiplied by 0.05 so it's not too fast
      text+=" W ";
      keysPressed=true;
    }

    //S decreases the bird's speed
    if (this.gui.isKeyPressed("KeyS")) {
      this.bird.accelerate(-0.05 * this.speedFactor);
      text+=" S ";
      keysPressed=true;
    }

    //A makes the bird turn left
    if (this.gui.isKeyPressed("KeyA")) {
      this.bird.turn(-Math.PI/90);
      text+=" A ";
      keysPressed=true;
    }

    //D makes the bird turn right
    if (this.gui.isKeyPressed("KeyD")) {
      this.bird.turn(Math.PI/90);
      text+=" D ";
      keysPressed=true;
    }

    //R resets the bird
    if (this.gui.isKeyPressed("KeyR")) {
      this.bird.reset();
      text+=" R ";
      keysPressed=true;
    }

     //P picks an egg only if there is one nearby
     if (this.gui.isKeyPressed("KeyP")) {
      this.bird.pick();
      text+=" P ";
      keysPressed=true;
    }

     //O drops an egg if the bird is holding one and is near the nest
     if (this.gui.isKeyPressed("KeyO")) {
      this.bird.drop();
      text+=" O ";
      keysPressed=true;
    }
    
    if (keysPressed) {
      console.log(text);
    }
  
  };

  
}


