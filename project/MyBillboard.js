import {CGFobject, CGFappearance, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyBillboard
 * @constructor
 * @param scene 
 */

export class MyBillboard extends CGFobject {
    constructor(scene, appearanceNum) {
        super(scene);
       
        this.quad= new MyQuad(this.scene);   

        //Three different textures and appearances
        this.treeTexture1 = new CGFtexture(this.scene, 'images/billboardtree.png');
        this.treeTexture2 = new CGFtexture(this.scene, 'images/billboardtree2.png');
        this.treeTexture3 = new CGFtexture(this.scene, 'images/billboardtree3.png');

        
        this.treeAppearance = new CGFappearance(this.scene);
        this.treeAppearance.setTexture(this.treeTexture1);

        this.treeAppearance2 = new CGFappearance(this.scene);
        this.treeAppearance2.setTexture(this.treeTexture2);

        this.treeAppearance3 = new CGFappearance(this.scene);
        this.treeAppearance3.setTexture(this.treeTexture3);


        //Each tree will have one of the appearances, chosen randomly
        this.appearanceNum = appearanceNum;

        this.treeShader = new CGFshader(this.scene.gl, './shaders/tree.vert', './shaders/tree.frag');
        this.treeShader.setUniformsValues({ treeTexture: 0 });


        
    }

    display(x, y, z) {

        this.billboardX=x;
        this.billboardY=y;
        this.billboardZ=z;
      
        //Make the billboard always face the camera
        var cameraPos = vec3.fromValues(this.scene.camera.position[0], 0, this.scene.camera.position[2]);
        var billboardPos = vec3.fromValues(this.billboardX, 0, this.billboardZ);
        
        var normalVec = vec3.fromValues(this.quad.normals[0], 0, this.quad.normals[2]);
    
        // Vector from object to camera
        let objectCameraVec = vec3.create();
        vec3.sub(objectCameraVec, cameraPos, billboardPos);
        vec3.normalize(objectCameraVec, objectCameraVec);
    
        // Perpendicular to objectCameraVec and normalVec
        let perpendicular = vec3.create();
        vec3.cross(perpendicular, objectCameraVec, normalVec);
        vec3.normalize(perpendicular, perpendicular);
        
        // angle between vectors
        let cos_angle = vec3.dot(objectCameraVec, normalVec);
        let angle = Math.acos(cos_angle);



        //Display
        
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.treeShader);
        
        this.scene.translate(x, y, z);
        this.scene.scale(5,10,10);
    
        // Rotate the plane so that it faces the camera
        this.scene.rotate(-angle, perpendicular[0], perpendicular[1], perpendicular[2]);
    
        
        //Choose the texture based on the randomly given appearancenNum
        switch(this.appearanceNum) {
            case 1:
                this.treeAppearance.apply();
                break;
            case 2:
                this.treeAppearance2.apply();
                break;    
            case 3:
                this.treeAppearance3.apply();
                break;
            default:
                this.treeAppearance.apply(); 
        }
    
        this.quad.display();
        
        // Set the active shader back to the default shader
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
    }
    
      
}