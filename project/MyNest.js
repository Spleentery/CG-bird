import { CGFobject, CGFappearance} from "../lib/CGF.js";
import { MyTorus } from "./MyTorus.js";
import { MyPrism } from "./MyPrism.js";

export class MyNest extends CGFobject {
    constructor(scene, texture) {
        super(scene);
        this.initBuffers();

        this.torus = new MyTorus(this.scene,  2, 2, 64, 64);
        
        this.nestX=0;
        this.nestY=0;
        this.nestZ=10;

        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(texture);
        this.appearance.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');

        this.stick = new MyPrism(this.scene, 64, 5, 0.01);

    }

    display() {
        //Display the nest in the terrain
        this.appearance.apply();
    
        this.scene.pushMatrix();
        this.scene.translate(0, -0.8, 0);
        this.scene.scale(0.5, 0.4, 0.5);

        this.torus.display();
        
        this.scene.popMatrix();
    }
}