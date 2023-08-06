
import {CGFobject} from '../lib/CGF.js';
/**
 * MyParallelogram
 * @constructor
 * @param scene 
 */


export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [      
			0,0,0,   //0
			1,0,0,   //1
			2,0,0,  //2
			1,1,0,   //3
			2,1,0,	//4
			3,1,0,   //5

			0,0,0,   //6 0
			1,0,0,   //7 1
			2,0,0,  //8 2
			1,1,0,   //9 3
			2,1,0,	//10 4
			3,1,0  //11 5

	
							
		];

		this.indices = [       
			0,1,3,  
			0,3,1,        
			1,4,3,
			1,3,4,           
			1,2,4,
			1,4,2,			
			2,5,4,
			2,4,5,			
			1,2,4,
			1,4,2,
			1,4,3,
			1,3,4
			
		];

		this.normals=[
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,-1,
			0,0,-1,
			0,0,-1,
			0,0,-1,
			0,0,-1,
			0,0,-1
		];

		this.texCoords = [
			1.0,1.0,
			0.75,1.0,
			0.5,1.0,
			0.75,0.75,
			0.5,0.75,
			0.25, 0.75
		]
	


		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
