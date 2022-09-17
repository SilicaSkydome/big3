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

export interface ITeamFormData{
    image?: FileList,
    name: string,
    division: string,
    conference: string,
    year: number
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