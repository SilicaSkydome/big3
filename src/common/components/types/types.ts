export type SignInFormValues = {
    login: string,
    password: string,
}

export type fetchValues = {
    name: string,
    avatarUrl: string,
    token: string
    isCustomError?: boolean,
    status?: number
}
export interface IsingInProps {
    setToken: Function
}
export type SignUpFormValues = {
    name: string,
    login: string,
    password: string,
    repeatPassword: string,
    agreement: boolean
}
export interface IsignUpProps {
    setToken: Function
}