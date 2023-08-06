import {CGFobject} from '../lib/CGF.js';
import { MyBillboard } from './MyBillboard.js';

/**
 * MyTreeGroupPatch
 * @constructor
 * @param scene 
 */

export class MyTreeGroupPatch extends CGFobject {
    
    constructor(scene) {
        super(scene);

        //Trees in the patch
        this.tree1= new MyBillboard(scene, Math.floor(Math.random() * 3) + 1);
        this.tree2= new MyBillboard(scene, Math.floor(Math.random() * 3) + 1);
        this.tree3= new MyBillboard(scene, Math.floor(Math.random() * 3) + 1);
        this.tree4= new MyBillboard(scene, Math.floor(Math.random() * 3) + 1);
        this.tree5= new MyBillboard(scene, Math.floor(Math.random() * 3) + 1);
        this.tree6= new MyBillboard(scene, Math.floor(Math.random() * 3) + 1);
        this.tree7= new MyBillboard(scene, Math.floor(Math.random() * 3) + 1);
        this.tree8= new MyBillboard(scene, Math.floor(Math.random() * 3) + 1);
        this.tree9= new MyBillboard(scene, Math.floor(Math.random() * 3) + 1);

}

display() {
    //Display the trees in the patch, with some desalignment
    this.scene.pushMatrix();
    this.tree1.display(100, -39, -20);
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tree2.display(95, -39, -10);
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tree3.display(100, -39, 0);
    this.scene.popMatrix();
    
    this.scene.pushMatrix();
    this.tree4.display(85, -39, -10);
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tree5.display(80, -39, -20);
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tree6.display(85, -39, 0);
    this.scene.popMatrix();
    
    this.scene.pushMatrix();
    this.tree7.display(70, -39, -15);
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tree8.display(70, -39, -5);
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tree9.display(75, -39, 0);
    this.scene.popMatrix();

    
}

}