export default interface IPlayerCard{
    "name": string,
    "number": number,
    "team": string,
    "imageUrl": string,
    "id": number
}
export interface IPlayer{
    "name": string,
    "number": number,
    "position": string,
    "team": number,
    "birthday": Date,
    "height": number,
    "weight": number,
    "avatarUrl": string,
    "id": number,
    "teamName": string
  }
export interface ISelectOption{
    label: number,
    value: number
}