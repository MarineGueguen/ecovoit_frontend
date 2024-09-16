//______________LOGIN______________

export interface LoginValues {
    email: string;
    password: string;
}

//______________REGISTER______________

export interface RegisterValues {
    first_name: string;
    last_name: string;
    password: string;
    email: string;
    date_of_birth: date;
}

//______________JOURNEYS INFOS______________

export interface JourneyUserInfos {
    id: number | string;
    first_name: string;
    last_name: string;
    photo?: string;
}
