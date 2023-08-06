import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene 
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0.5, 0.5, -0.5,	//0
			0.5, -0.5, -0.5,	//1
			0.5, 0.5, 0.5,	//2
			0.5, -0.5, 0.5,	//3
            -0.5, -0.5, 0.5,	//4
            -0.5, 0.5, 0.5,	//5
            -0.5, 0.5, -0.5,	//6
            -0.5, -0.5, -0.5,  	//7

            0.5, 0.5, -0.5,	//8
			0.5, -0.5, -0.5,	//9
			0.5, 0.5, 0.5,	//10
			0.5, -0.5, 0.5,	//11
            -0.5, -0.5, 0.5,	//12
            -0.5, 0.5, 0.5,	//13
            -0.5, 0.5, -0.5,	//14
            -0.5, -0.5, -0.5,  	//15

            0.5, 0.5, -0.5,	//16
			0.5, -0.5, -0.5,	//17
			0.5, 0.5, 0.5,	//18
			0.5, -0.5, 0.5,	//19
            -0.5, -0.5, 0.5,	//20
            -0.5, 0.5, 0.5,	//21
            -0.5, 0.5, -0.5,	//22
            -0.5, -0.5, -0.5  	//23
                        
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            //Esquerda Direita
			3,1,0,
            0,2,3,
            4,7,6,
            6,5,4,
            //Cima Baixo
            10,8,14,
            14,13,10,
            11,9,15,
            15,12,11,
            //Frente Trás
            20,19,18,
            18,21,20,
            23,17,16,
            16,22,23

		];

        this.normals = [
			1,0,0,
			1,0,0,
			1,0,0,
			1,0,0,
			-1,0,0,
			-1,0,0,
			-1,0,0,
			-1,0,0,
			0,1,0,
			0,-1,0,
			0,1,0,
			0,-1,0,
			0,-1,0,
			0,1,0,
			0,1,0,
			0,-1,0,
			0,0,-1,
			0,0,-1,
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,-1,
			0,0,-1
		];


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;
      
		this.initGLBuffers();

	}



}
