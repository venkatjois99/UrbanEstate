 interface RegisterUser {
    userName:string,
    email:string,
    password:string,
    phoneNumber:string
}

interface LoginModel{
    email:string,
    password:string
}

export type { RegisterUser, LoginModel };