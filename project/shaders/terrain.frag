#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D terrainMap;
uniform sampler2D terrainTex;
uniform sampler2D terrainAltimetry;

void main() {
  vec4 color = texture2D(terrainTex, vTextureCoord);
  vec4 altColor = texture2D(terrainAltimetry, vTextureCoord);

  /* combine original color with altimetry color (70% original, 30% altimetry) */
  gl_FragColor = mix(color, altColor, 0.3);
}
