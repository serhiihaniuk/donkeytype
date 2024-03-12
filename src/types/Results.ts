export type speedHistoryType = {[key: string]: number}
export type Results = {
  wpm: number,
  speedHistory: number[],
  charCorrectness: speedHistoryType
}