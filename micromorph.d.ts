declare module "micromorph" {
  const micromorph: (from: Node, to: Node) => Promise<void>
  export default micromorph
}
