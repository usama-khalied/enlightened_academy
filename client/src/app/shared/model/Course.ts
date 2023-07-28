 class Course {
    id: string;
    name: string;
    fee: number;

    constructor(id: string, name: string, fee: number) {
      this.id = id;
      this.name = name;
      this.fee = fee;
    }
  
    printCourseDetails() {
      // console.log(`ID: ${this.id}, Name: ${this.name}, Fee: ${this.fee}`);
    }
  }
  export interface Course1 {
    id: string;
    name: string;
    fee: number; 
  } 