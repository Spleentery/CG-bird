import { CGFobject, CGFshader } from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';

export class MyTerrain extends CGFobject {

  //private variables because of encapsulation
  #texTerrain;
  #texTerrainMap;
  #texTerrainAltimetry;
  #shader;

  constructor(scene, texTerrain, texTerrainMap, texTerrainAltimetry, heightScale) {
    super(scene);
    this.scene = scene;
    this.#texTerrain = texTerrain;
    this.#texTerrainMap = texTerrainMap;
    this.#texTerrainAltimetry = texTerrainAltimetry;
    this.heightScale = heightScale;
    this.initBuffers();
  }

  initBuffers() {
    this.plane = new MyPlane(this.scene, 128);
    this.#shader = new CGFshader(this.scene.gl, 'shaders/terrain.vert', 'shaders/terrain.frag');
    this.#shader.setUniformsValues({ terrainTex: 0 });
    this.#shader.setUniformsValues({ terrainMap: 1 });
    this.#shader.setUniformsValues({ terrainAltimetry: 2 });
    this.#shader.setUniformsValues({ uHeightScale: this.heightScale });
    this.#texTerrain.bind(0);
    this.#texTerrainMap.bind(1);
    this.#texTerrainAltimetry.bind(2);
  }


  display() {
    this.scene.pushMatrix();
    this.scene.setActiveShader(this.#shader);
    this.#texTerrain.bind(0);
    this.#texTerrainMap.bind(1);
    this.#texTerrainAltimetry.bind(2);
    this.scene.translate(0, 0, -70);
    this.scene.scale(8, 8, 8); // scale 400x400
    this.plane.display();
    this.scene.setActiveShader(this.scene.defaultShader);
    this.scene.popMatrix();
  }
}