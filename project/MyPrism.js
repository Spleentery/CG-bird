import {CGFobject} from '../lib/CGF.js';

/**
 * MyPrism
 * @constructor
 * @param scene 
 * @param slices 
 * @param stacks 
 */
export class MyPrism extends CGFobject{
    constructor(scene, slices, stacks, radius = 1) {
        super(scene);

        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
      

        var ang = 0;
        var alpha = 2*Math.PI/this.slices;

        for (var i = 0; i <= this.stacks; i++) {
            ang = 0;
            var center = i == 0 ? i*this.slices : i*this.slices+i;
            this.vertices.push(0, 0, i); 
            for (var j = 1; j <= this.slices; j++) { 
                this.vertices.push(this.radius*Math.cos(ang), this.radius*Math.sin(ang), i);
                
                if (i == 0) {
                    if (j+1 > this.slices) {
                        this.indices.push(center,1,center+(j));
                    } else {
                        this.indices.push(center,center+j+1,center+(j));
                    }
                }
                else if (j+1 > this.slices) {
                    this.indices.push(center,center+j,center+1);
                } else {
                    this.indices.push(center,center+j,center+(j+1));
                } 
  
                ang+=alpha;
            }
        }
       
        for(var i = 0; i < this.vertices.length/3; i+=(this.slices+1)){
            for (var j = i+1; j <= i + this.slices; j++) {
                if(j % (this.slices+1) == this.slices){
                    this.indices.push(j, i + 1, j + this.slices + 1);
                    this.indices.push(i+1, i+1+this.slices+1, j + this.slices + 1);
                }
                else {
                    this.indices.push(j, j + 1, j + this.slices + 1); 
                    this.indices.push(j + 1, j + this.slices + 2, j + this.slices + 1);
                }
                
            }
        }

        var norm = alpha/2; 

        for(var i = 0; i < this.vertices.length/(3); i+= (this.slices+1)){ 
            if (i == 0){
                this.normals.push(0,0,-1);
            }
            else {
                this.normals.push(0,0,1);
            }
            for(var j = i+1; j <= i + this.slices; j++) {
                this.normals.push(Math.cos(norm), Math.sin(norm), 0);
                norm += alpha;
              
            }
        }
        
        for (var i = 0; i <= this.stacks; i++) {
            ang = 0;
            var center = i == 0 ? i*this.slices : i*this.slices+i;
            this.vertices.push(0, 0, i); 
            for (var j = 1; j <= this.slices; j++) { 
                this.vertices.push(this.radius*Math.cos(ang), this.radius*Math.sin(ang), i);
                ang+=alpha;
            }
        }

        var norm = -alpha/2; 

        for(var i = 0; i < this.vertices.length/(3*2); i+= (this.slices+1)){
            if (i == 0){
                this.normals.push(0,0,-1);
            }
            else {
                this.normals.push(0,0,1);
            }
            for(var j = i+1; j <= i + this.slices; j++) {
                this.normals.push(Math.cos(norm), Math.sin(norm), 0);
                norm += alpha;

            }
        }
    	this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
    
   display() {
         
            this.scene.pushMatrix();
    
            // Draw the object
            super.display();
    
            this.scene.popMatrix();
   };
}
