import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangleSmall
 * @constructor
 * @param scene 
 */


export class MyTriangleSmall extends CGFobject {
	constructor(scene, texCoords) {
		super(scene);
		this.initBuffers(texCoords);
	}
	
	initBuffers(texCoords) {
		this.vertices = [
			-1, 0, 0,   //0
			1, 0, 0,   //1
			0, 1, 0,  //2

			-1, 0, 0,   //3 0
			1, 0, 0,   //4 1
			0, 1, 0  //5 2
		];

		this.indices = [
			0, 1, 2,
			5,4,3
		];

		this.normals=[
			0,0,1,
			0,0,1,
			0,0,1,

			0,0,-1,
			0,0,-1,
			0,0,-1
		];

		this.texCoords = [
			0, 1,
			1, 1,
			0.5, 0,
		
			0, 1,
			1, 1,
			0.5, 0
		];
		

		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

