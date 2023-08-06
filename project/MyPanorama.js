import { CGFappearance, CGFobject, CGFtexture } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";

/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 * @param texture - Texture to be applied to the sphere
 */
export class MyPanorama extends CGFobject {
	constructor(scene, texture) {
		super(scene);
        this.initBuffers();
    
        this.sphere = new MySphere(this.scene, 200, 50, 50, true);

        this.appearance = new CGFappearance(this.scene);
        this.terrainTex = new CGFtexture(this, "images/blue.jpg");
        this.appearance.setTexture(texture);
        this.appearance.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');
    }

  display() {

    // Apply texture
    this.appearance.apply();

    // Draw the sphere
    this.sphere.display();
  }
}
