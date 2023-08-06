import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangleBig
 * @constructor
 * @param scene 
 */


export class MyTriangleBig extends CGFobject {
	constructor(scene, texCoords) {
		super(scene);
		this.initBuffers(texCoords);
	}
	
	initBuffers(texCoords) {
		this.vertices = [
			-2, 0, 0,   //0
			2, 0, 0,   //1
			0, 2, 0,  //2

			-2, 0, 0,   //3 0
			2, 0, 0,   //4 1
			0, 2, 0  //5 2
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
			0, 0, 
			1, 0, 
			0.5, 1, 
			0, 0, 
			1, 0, 
			0.5, 1 
		];

		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}