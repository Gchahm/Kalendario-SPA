import {Service} from './Service';


export interface Employee {
  id: number;
  name: string;
  email: string;
  instagram: string;
  photoUrl: string;
  bio: string;
  services: Service[];
}
