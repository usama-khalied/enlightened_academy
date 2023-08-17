export interface Student {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phoneNumber: string;
    gender: string;
    birthDate: string;
    cnic: string;
    parentCNIC: string;
    qualification:string

}
export class StudentRegisterationSlip {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    address?: string;
    phoneNumber?: string;
    gender?: string;
    birthDate?: string;
    cnic?: string;
    parentCNIC?: string;
    qualification?: string;
  
    constructor(data: Partial<StudentRegisterationSlip> = {},
      id: number,
      firstName: string,
      lastName: string,
      email: string,
      address: string,
      phoneNumber: string,
      gender: string,
      birthDate: string,
      cnic: string,
      parentCNIC: string,
      qualification: string
    ) {
      this.id = data.id || 0;
      this.firstName = data.firstName || '';
      this.lastName = data.lastName || '';
      this.email = data.email || '';
      this.address = data.address || '';
      this.phoneNumber = data.phoneNumber ||  '';
      this.gender = data.gender || '';
      this.birthDate = data.birthDate || '';
      this.cnic = data.cnic || '';
      this.parentCNIC = data.parentCNIC || '';
      this.qualification = data.qualification || '';
    }
  }