import { CGFobject } from "../lib/CGF.js";

/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - Radius of the sphere
 * @param slices - Number of slices around the sphere
 * @param stacks - Number of stacks along the sphere
 * @param inverted - Whether the sphere should be inverted or not
 */
export class MySphere extends CGFobject {
  constructor(scene, radius, slices, stacks, inverted) {
    super(scene);
    this.radius = radius || 1;
    this.slices = slices || 16;
    this.stacks = stacks || 8;
    this.inverted = inverted || false;
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    let phi = 0;
    let theta = 0;
    let phiInc = Math.PI / this.stacks;
    let thetaInc = (2 * Math.PI) / this.slices;
    let x, y, z;
    let s, t;

    for (let i = 0; i <= this.stacks; i++) {
      phi = i * phiInc;
      s = i / this.stacks;
      for (let j = 0; j <= this.slices; j++) {
        theta = j * thetaInc;
        t = j / this.slices;
        x = this.radius * Math.sin(phi) * Math.cos(theta);
        y = this.radius * Math.sin(phi) * Math.sin(theta);
        z = this.radius * Math.cos(phi);
        this.vertices.push(x, y, z);
        if (this.inverted) {
          this.normals.push(-x, -y, -z);
        } else {
          this.normals.push(x, y, z);
        }
        this.texCoords.push(t, s);
      }
    }

    for (let i = 0; i < this.stacks; i++) {
      for (let j = 0; j < this.slices; j++) {
        let first = i * (this.slices + 1) + j;
        let second = first + this.slices + 1;
        if (this.inverted) {
          this.indices.push(first, first + 1, second);
          this.indices.push(second, first + 1, second + 1);
        } else {
          this.indices.push(first, second, first + 1);
          this.indices.push(second, second + 1, first + 1);
        }
      }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
