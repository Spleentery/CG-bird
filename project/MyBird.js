import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from './MyDiamond.js';
import { MyTriangle } from './MyTriangle.js';
import { CGFappearance } from '../lib/CGF.js';
import { MyCone } from './MyCone.js';
import { MySphere } from './MySphere.js';
import { MyTriangleBig } from './MyTriangleBig.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';

/**
 * MyBird
 * @constructor
 * @param scene 
 */


export class MyBird extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
        this.initMaterials(scene);

        this.birdX=100
        this.birdY=-41;
        this.birdZ=20;
        this.birdOrientation=0;
        this.birdSpeed=0;


        this.startTime = Date.now();
        
       
        this.headPiece1 = new MyDiamond(this.scene);   
        this.headPiece2 = new MyDiamond(this.scene);    
        this.head = new MySphere(this.scene);
        this.body = new MySphere(this.scene);
        this.eye1 = new MySphere(this.scene);
        this.eye2 = new MySphere(this.scene);
        this.beak = new MyCone(this.scene,5,1);
        this.tailPiece1 = new MyTriangle(this.scene);
        this.tailPiece2 = new MyTriangle(this.scene);
        this.tailPiece3 = new MyTriangle(this.scene);
        this.wingTB1 = new MyTriangleBig(this.scene);
        this.wingTS1 = new MyTriangleSmall(this.scene);
        this.wingTB2 = new MyTriangleBig(this.scene);
        this.wingTS2= new MyTriangleSmall(this.scene);

        this.pickedUpEgg;   
        this.hasPickedUpEgg=false;
        this.isDroping=false;
        this.isPicking=false;

    }
    initMaterials(scene) {
        
        
        //Head, Body and Wings texture
        this.headBody = new CGFappearance(scene);
        this.headBody.setAmbient(0.1, 0.1, 0.1, 1);
        this.headBody.setDiffuse(0.9, 0.9, 0.9, 1);
        this.headBody.setSpecular(0.1, 0.1, 0.1, 1);
        this.headBody.setShininess(10.0);
        this.headBody.loadTexture('images/feathers.jpg');
        this.headBody.setTextureWrap('REPEAT', 'REPEAT');

        //Eye texture
        this.eye = new CGFappearance(scene);
        this.eye.setAmbient(0.1, 0.1, 0.1, 1);
        this.eye.setDiffuse(0.9, 0.9, 0.9, 1);
        this.eye.setSpecular(0.1, 0.1, 0.1, 1);
        this.eye.setShininess(10.0);
        this.eye.loadTexture('images/eye.jpg');
        this.eye.setTextureWrap('REPEAT', 'REPEAT');

        //Beak and tail and head decorations texture
        this.blue = new CGFappearance(scene);
        this.blue.setAmbient(0.1, 0.1, 0.1, 1);
        this.blue.setDiffuse(0.9, 0.9, 0.9, 1);
        this.blue.setSpecular(0.1, 0.1, 0.1, 1);
        this.blue.setShininess(10.0);
        this.blue.loadTexture('images/blue.jpg');
        this.blue.setTextureWrap('REPEAT', 'REPEAT');


    }


    display() {
        // Represents 1 second
        const period = 1000;
    
        // Time that passed
        var deltaT = Date.now() - this.startTime;
    
        // Calculate bird's vertical position for picking  
        if (this.isPicking) {
            var descendHeight = (deltaT <= period) ? (-41 - (3 * deltaT / period)) : 0;
            var ascendHeight = (deltaT > period) ? -44+ (3 * (deltaT - period) / period) : 0;
            var height = descendHeight + ascendHeight;
            this.birdY = height;
            if (deltaT >= period*2) {
                this.startTime=Date.now();
                this.isPicking=false;

            }
        }
 
        // Bird's vertical position
        var height = 0.15 * Math.sin(2 * Math.PI * (deltaT / period));


        if (!this.hasPickedUpEgg) {   //Can only pick up an egg if is not carrying one already
            // Iterate over the eggs array to see if the bird is near one when it reaches the floor (y=-44)
            for (let i = 0; i < this.scene.eggs.length; i++) {
             const egg = this.scene.eggs[i];
     
             // Calculate the distance between the bird and the egg
             const dx = egg.eggX - this.birdX;
             const dz = egg.eggZ - this.birdZ;
             const distance = Math.sqrt(dx * dx + dz * dz);
     
            // Check if the bird is close enough to the egg and its Y value is near 44
             const margin = 0.5; 
             if (distance < margin && Math.abs(this.birdY + height + 44) < margin) {
                  // False to remove the egg from the scene
                    egg.displayOrNot=false;
                    this.hasPickedUpEgg=true;
                    this.pickedUpEgg=egg;
                    this.pickedUpEgg.eggX=0;
                    this.pickedUpEgg.eggY=-0.63;
                    this.pickedUpEgg.eggZ=0;
                   i--;
                  break;  //only one egg picked at a time
   
            }
            }
        }

         // Calculate the distance between the bird and the nest
         const nestdx = 115 - this.birdX;
         const nestdy = -43 - this.birdY;
         const nestdz = 20 - this.birdZ;
        this.distanceNest = Math.sqrt(nestdx * nestdx + nestdz * nestdz);


        //Drops the egg to its position in the nest
        if(this.isDroping) {
            const descendSpeed = 0.2;

            // Update the position of the picked egg so it descends
            this.pickedUpEgg.eggX += nestdx * descendSpeed;
            this.pickedUpEgg.eggY += nestdy * descendSpeed;
            this.pickedUpEgg.eggZ += nestdz * descendSpeed;

            //Makes the egg appear on its individual position in the nest
            if (Math.abs(this.pickedUpEgg.eggY == -43) <0.5) {
                this.pickedUpEgg.eggX=115;
                this.pickedUpEgg.eggY=-43;
                this.pickedUpEgg.eggZ=20;
                this.pickedUpEgg.displayOrNot=true;
                this.hasPickedUpEgg=false;
                this.isDroping=false;
            }
            };

        this.scene.pushMatrix();
        this.scene.translate(this.birdX, this.birdY + height, this.birdZ); // Translate the bird to its initial position plus the current height (oscillation)
        this.scene.rotate(this.birdOrientation, 0, 1, 0); //Rotate the bird regarding its current orientation
    
        // Wing flap
        var flappingSpeed = (0.1 + this.birdSpeed) / 3;
        var wingAngle = Math.sin(deltaT * (flappingSpeed / 20)) * Math.PI / 20;



        //Picked Up Egg
        if(this.hasPickedUpEgg) {
         this.scene.pushMatrix();
         this.scene.translate(this.pickedUpEgg.eggX,this.pickedUpEgg.eggY,this.pickedUpEgg.eggZ);
         this.scene.rotate(this.pickedUpEgg.angleRot, 0,0,1);
         this.pickedUpEgg.display();
         this.scene.popMatrix();

        }


        // Head decoration
          
        this.scene.pushMatrix();
        this.blue.apply();
        this.scene.translate(0,0.03,-0.19);  
        this.scene.rotate(Math.PI/6, 1,0,0);
        this.scene.translate(0.5,0.6,-0.1); 
        this.scene.scale(0.1,0.1,0.15);
        this.headPiece1.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.blue.apply();
        this.scene.translate(0.5,0.6,-0.05);    
        this.scene.rotate(-Math.PI/6, 1,0,0);
        this.scene.scale(0.1,0.1,0.15);
        this.headPiece2.display();
        this.scene.popMatrix();

        //Tail Decoration

        this.scene.pushMatrix();
        this.blue.apply();
        this.scene.translate(-0.5,0.2,0); 
        this.scene.scale(0.15,0.15,0.15); 
        this.tailPiece1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.blue.apply();
        this.scene.translate(-0.4,0.2,0.1); 
        this.scene.rotate(Math.PI/6, 0,1,0);
        this.scene.scale(0.15,0.15,0.15);
        this.tailPiece2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.blue.apply();
        this.scene.translate(-0.4,0.2,-0.1); 
        this.scene.rotate(Math.PI/6, 0,-1,0);
        this.scene.scale(0.15,0.15,0.15);
        this.tailPiece3.display();
        this.scene.popMatrix();


        //Body

        this.scene.pushMatrix();
        this.headBody.apply();
        this.scene.scale(0.4,0.4,0.4);
        this.body.display();
        this.scene.popMatrix();


        //Head

        this.scene.pushMatrix();
        this.headBody.apply();
        this.scene.translate(0.5,0.3,0); 
        this.scene.scale(0.25,0.25,0.25);
        this.head.display();
        this.scene.popMatrix();




        //Wings
       
        this.scene.pushMatrix();    
        this.scene.rotate(wingAngle, 1, 0, 4);  //Wing flap
        this.scene.translate(-0.25,0,0.74);
        this.scene.rotate(Math.PI/4,0,1,0);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.scene.scale(0.2,0.2,0.2);
        this.wingTB1.display();
        this.scene.popMatrix();

      
        this.scene.pushMatrix();
        this.scene.rotate(wingAngle, 1, 0, 4);  //Wing flap
        this.scene.translate(0,0,-0.18);     
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.scene.translate(0,0.5,0);
        this.scene.scale(0.2,0.2,0.2);
        this.wingTS1.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();    
        this.scene.rotate(-wingAngle, 1, 0, -4);  //Wing flap
        this.scene.rotate(Math.PI,1,0,0);
        this.scene.translate(-0.25,0,0.74);
        this.scene.rotate(Math.PI/4,0,1,0);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.scene.scale(0.2,0.2,0.2);
        this.wingTB2.display();
        this.scene.popMatrix();

    
        this.scene.pushMatrix();
        this.scene.rotate(-wingAngle, 1, 0, -4);   //Wing flap
        this.scene.rotate(Math.PI,1,0,0);
        this.scene.translate(0,0,-0.18);      
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.scene.translate(0,0.5,0);
        this.scene.scale(0.2,0.2,0.2);
        this.wingTS2.display();
        this.scene.popMatrix();

       
        //Eyes

        this.scene.pushMatrix();
        this.eye.apply();
        this.scene.translate(0.65,0.4,0.1);      
        this.scene.scale(0.05,0.05,0.05);
        this.eye1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.eye.apply();
        this.scene.translate(0.65,0.4,-0.1);      
        this.scene.scale(0.05,0.05,0.05);
        this.eye2.display();
        this.scene.popMatrix();


         //Beak

        this.scene.pushMatrix();
        this.blue.apply();
        this.scene.translate(0.7,0.3,0);   
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.scene.scale(0.1,0.1,0.1);
        this.beak.display();
        this.scene.popMatrix();





    };

    //Updates the bird position coordinates using its speed and orientation
    update() { 
        this.birdX += this.birdSpeed * Math.cos(this.birdOrientation) / 50;     //divided by 50 to not be too fast
        this.birdZ += this.birdSpeed * -Math.sin(this.birdOrientation) / 50;
     
    }


    //Changes bird orientation value
    turn(value) {  
        this.birdOrientation += value;

    }
    
    //Changes bird's speed value, if speed becomes negative is substituted by 0 (the bird stops moving)
    accelerate(value) {   
        this.birdSpeed += value;
        if (this.birdSpeed <0) this.birdSpeed=0;

    }

    //Resets the bird's position, speed and orientation
    reset() {
        this.birdX=100;
        this.birdY=-40;
        this.birdZ=20;
        this.birdSpeed=0;
        this.birdOrientation=0;
    }

    //Makes the bird descend and try to pick an egg 
    pick() {
        this.startTime = Date.now();
        this.isPicking = true;        //When true, bird's vertical position will be calculated regarding picking in the display function()
    }
       

    //Makes the bird drop an egg if it is holding one and is near the nest
    drop() {
        if (this.hasPickedUpEgg) {
            if (this.distanceNest < 2) {
                this.isDroping = true;
            }

          }

        }
 }
    

      



