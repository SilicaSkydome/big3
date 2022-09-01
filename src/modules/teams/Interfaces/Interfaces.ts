export interface ITeam{
    "name": string,
    "foundationYear": number,
    "division": string,
    "conference": string,
    "imageUrl": string,
    "id": number
}

export interface ITeamCard{
    "name": string,
    "foundationYear": number,
    "imageUrl": string,
    "id": number
}

export interface ISelectOption{
    label: number,
    value: number
}