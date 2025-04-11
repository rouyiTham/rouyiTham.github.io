declare module 'meshline' {
  import { BufferGeometry, Material, NormalBufferAttributes } from 'three';

  export class MeshLineGeometry extends BufferGeometry<NormalBufferAttributes> {
    constructor();
    setPoints(points: Array<THREE.Vector3>): void;
  }

  export class MeshLineMaterial extends Material {
    constructor(parameters?: {
      color?: THREE.ColorRepresentation;
      lineWidth?: number;
      resolution?: [number, number];
      sizeAttenuation?: boolean;
      near?: number;
      far?: number;
      depthTest?: boolean;
      depthWrite?: boolean;
      opacity?: number;
      transparent?: boolean;
      blending?: THREE.Blending;
      side?: THREE.Side;
      useMap?: boolean;
      map?: THREE.Texture;
      repeat?: [number, number];
    });
  }
} 