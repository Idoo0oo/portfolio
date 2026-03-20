export { };

declare module '*.glb';
declare module '*.webp';

declare module 'meshline' {
  import { BufferGeometry, Material } from 'three';
  export class MeshLineGeometry extends BufferGeometry {}
  export class MeshLineMaterial extends Material {}
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      meshLineGeometry: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      meshLineMaterial: any;
    }
  }
}