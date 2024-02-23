declare module "*.module.css" {
  const content: Record<string, string>;
  export default content;
}
declare module '@/data/words' {
  const wordsData: { val: string }[];
  export default wordsData;
}