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
  gameplayRating: number | null
  storyRating: number | null
  graphicsRating: number | null
  performanceRating: number | null
  funRating: number | null
  finalRating: number | null
  finalThoughts: string | null
}
