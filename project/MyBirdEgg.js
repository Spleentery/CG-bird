import { CGFobject, CGFappearance} from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";

export class MyBirdEgg extends CGFobject {

  constructor(scene, eggTexture, eggX, eggY, eggZ, angleRot) {

    super(scene);
    this.initBuffers();

    this.eggX = eggX;
    this.eggY = eggY;
    this.eggZ = eggZ;
    this.angleRot = angleRot;
    this.displayOrNot = true;

    this.eggTexture = eggTexture;
    this.sphere = new MySphere(this.scene, 16, 64, 64, false);

    this.appearance = new CGFappearance(this.scene);
    this.appearance.setTexture(this.eggTexture);
    this.appearance.setTextureWrap('MIRRORED_REPEAT','MIRRORED_REPEAT');
    this.appearance.setDiffuse(0.8, 0.8, 0.8, 1);
    this.appearance.setSpecular(0.1, 0.1, 0.1, 1);
    this.appearance.setShininess(10);

    this.nestEgg1;
    this.nestEgg1;
    this.nestEgg1;
    this.nestEgg1;

  }

    display() {
            // Apply texture
            this.scene.pushMatrix();
            this.appearance.apply();
            
            this.scene.scale(1, 1.3, 1);
            this.scene.scale(0.015, 0.015, 0.015);
            
            // Draw the sphere
            this.sphere.display();
            this.scene.popMatrix();
    }
}
