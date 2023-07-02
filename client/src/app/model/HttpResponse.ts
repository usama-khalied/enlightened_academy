import { Student } from './Student';

export interface HttpResponse {
    timestamp: string;
    status: number;
    message: string;
    data: Student;
    path: string;
}