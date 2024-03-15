declare module "*.module.css" {
  const content: Record<string, string>;
  export default content;
}
declare module '@/data/words' {
  const wordsData: string[];
  export default wordsData;
}
declare module '@/data/contractionWords' {
  const contractionWords: string[];
  export default contractionWords;
}
declare module "@/utils/randomIndex" {
  function randomIndex<T>(data: T[]): number;
  export default randomIndex;
}
declare module "*.svg" {
  const content: string;
  export default content;
}