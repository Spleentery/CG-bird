#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float uHeightScale; // factor

/* contains a texture that represents the heightmap  */
uniform sampler2D terrainMap;

varying vec2 vTextureCoord;

void main() {    
    vTextureCoord = aTextureCoord;
    
    /* white component per vertex */
    vec4 filter = texture2D(terrainMap, vTextureCoord);

    /* 
     * calculating the offset based on how white is the current vertex
     * The higher the factor, the more pronounced the height differences are
     */
    vec3 offset = aVertexNormal * filter.r * uHeightScale;

    /* standard way of applying the position and offset*/
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0)*100.0;
}