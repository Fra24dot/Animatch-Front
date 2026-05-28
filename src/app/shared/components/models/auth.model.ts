export interface UserLogin {
    email: string;
    password: string;
}

export interface UserRegister {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    birthDate: string;
}

export interface ShelterRegister {
    name: string;
    email: string;
    password: string;
    companyNumber: string;
    phoneNumber: string;
    address: string;
    city: string;
    postalCode: string;
}