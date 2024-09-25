export interface Game {
  id?: number
  game: string
  playedBefore: boolean
  clockedBefore: boolean
  platform: string
  startDate: string | null
  finishDate: string | null
  playtimeEstimate: string | null
  playtimeFinal: string | null
  gameplayRating: number
  storyRating: number
  graphicsRating: number
  performanceRating: number
  funRating: number
  finalRating: number
  finalThoughts: string | null
}
