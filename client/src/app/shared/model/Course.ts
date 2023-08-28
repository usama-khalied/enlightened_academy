//  class Course {
//     id: string;
//     name: string;
//     fee: number;

//     constructor(id: string, name: string, fee: number) {
//       this.id = id;
//       this.name = name;
//       this.fee = fee;
//     }
//   }
//   export interface Course1 {
//     id: string;
//     name: string;
//     fee: number; 
//   } 
export class Course {
  id!: string;
  name!: string;
  description!: string;
  fee!: number;
  url!: string | null;
}