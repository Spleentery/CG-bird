import { CGFobject } from '../lib/CGF.js';

/**
 * MyTorus
 * @constructor
 * @param scene 
 * @param innerRadius 
 * @param outerRadius 
 * @param slices 
 * @param loops 
 */
export class MyTorus extends CGFobject {
    constructor(scene, innerRadius, outerRadius, slices, loops) {
        super(scene);
        this.innerRadius = innerRadius;
        this.outerRadius = outerRadius;
        this.slices = slices;
        this.loops = loops;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for(let loopIdx = 0; loopIdx <= this.loops; loopIdx++) {
            let theta = loopIdx * 2 * Math.PI / this.loops;
            let sinTheta = Math.sin(theta);
            let cosTheta = Math.cos(theta);

            for(let sliceIdx = 0; sliceIdx <= this.slices; sliceIdx++) {
                let phi = sliceIdx * 2 * Math.PI / this.slices;
                let sinPhi = Math.sin(phi);
                let cosPhi = Math.cos(phi);

                let x = (this.outerRadius + this.innerRadius * cosPhi) * cosTheta;
                let y = (this.outerRadius + this.innerRadius * cosPhi) * sinTheta;
                let z = this.innerRadius * sinPhi;

                this.vertices.push(x, y, z);

                let nx = cosTheta * cosPhi;
                let ny = sinTheta * cosPhi;
                let nz = sinPhi;

                this.normals.push(nx, ny, nz);

                // texture coordinates
                let u = loopIdx / this.loops;
                let v = sliceIdx / this.slices;
                this.texCoords.push(u, v);
            }
        }

        for(let loopIdx = 0; loopIdx < this.loops; loopIdx++) {
            for(let sliceIdx = 0; sliceIdx < this.slices; sliceIdx++) {
                let first = (loopIdx * (this.slices + 1)) + sliceIdx;
                let second = first + this.slices + 1;

                this.indices.push(first, second, first + 1);
                this.indices.push(second, second + 1, first + 1);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
      
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        
        // Draw the object
        super.display();

        this.scene.popMatrix();
};
}
