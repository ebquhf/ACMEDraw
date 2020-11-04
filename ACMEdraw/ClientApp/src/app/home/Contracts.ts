export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
}

export interface Product {
  id: number;
  name: string;
  serialNumber: string;
}
export interface Draw {
  id: number;
  email: string;
  isWinning: boolean;
  firstName: string;
  lastName: string;
  serialNumber: string;
  person: Person;
  product: Product;
}
