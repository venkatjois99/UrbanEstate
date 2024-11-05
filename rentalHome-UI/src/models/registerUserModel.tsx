interface RegisterUser {
    userName: string,
    email: string,
    password: string,
    phoneNumber: string
}

interface LoginModel {
    email: string,
    password: string
}

interface UserModelDTO {
    userId: number,
    userName: string,
    email: string,
    phoneNumber: string

}

export type { RegisterUser, LoginModel, UserModelDTO };