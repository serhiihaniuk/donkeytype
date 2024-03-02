declare module "*.module.css" {
  const content: Record<string, string>;
  export default content;
}
declare module '@/data/words' {
  const wordsData: string[];
  export default wordsData;
}
declare module "*.svg" {
  const content: string;
  export default content;
}