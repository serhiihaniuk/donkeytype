export type speedHistoryType = {[key: string]: number}
export type Accuracy = {correct: number, incorrect: number}
export type Results = {
  wpm: number,
  speedHistory: number[],
  charCorrectness: speedHistoryType,
  accuracy: Accuracy
}