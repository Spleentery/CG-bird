import {CGFobject} from '../lib/CGF.js';
import { MyBillboard } from './MyBillboard.js';

/**
 * MyTreeRowPatch
 * @constructor
 * @param scene 
 */

export class MyTreeRowPatch extends CGFobject {
    
    constructor(scene) {
        super(scene);

        //Trees on the row
        this.tree1= new MyBillboard(scene, Math.floor(Math.random() * 3) + 1);
        this.tree2= new MyBillboard(scene, Math.floor(Math.random() * 3) + 1);
        this.tree3= new MyBillboard(scene, Math.floor(Math.random() * 3) + 1);
        this.tree4= new MyBillboard(scene, Math.floor(Math.random() * 3) + 1);
        this.tree5= new MyBillboard(scene, Math.floor(Math.random() * 3) + 1);
        this.tree6= new MyBillboard(scene, Math.floor(Math.random() * 3) + 1);
        

}

display() {
    //Display the trees in a row, with some desalignment
    this.scene.pushMatrix();
    this.tree1.display(80, -39, 60);
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tree2.display(81, -39, 50);
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tree3.display(80, -39, 40);
    this.scene.popMatrix();
    
    this.scene.pushMatrix();
    this.tree4.display(82, -39, 10);
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tree5.display(83, -39, 20);
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tree6.display(80, -39, 30);
    this.scene.popMatrix();

    
}

}