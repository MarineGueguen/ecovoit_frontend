import { JourneyUserInfos } from "./User";

interface Car {
  id: number;
  created_at: Date;
  model: string;
  brand: CarBrand;
  energy: Fuel;
  seats_number: number;
  sticker?: number;
  registration_number: string;
  registration_year: Date;
  color?: CarColor;
  owner: User;
  journeys: Journey[]
}

export interface CarInfos implements Car {
  id?: number;
  created_at?: Date;
  model?: string;
  brand?: CarBrand;
  energy?: Fuel;
  seats_number?: number;
  registration_number?: string;
  registration_year?: Date;
  owner: JourneyUserInfos;
  journeys?: Journey[]
}

export interface createCarInput {
  brand: string,
  energy: string,
  model: string,
  registration_number: string,
  registration_year: Date | string,
  seats_number: number,
  sticker?: number,
  color?: string
}