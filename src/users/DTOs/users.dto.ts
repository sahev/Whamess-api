export interface UsersDTO {
    name: string,
    email: string,
    password: string,
    isActive: boolean
}

export interface UpdateUsersDTO {
    id: string,
    name: string,
    lastname: string, 
    email: string,
    phone: string    
}