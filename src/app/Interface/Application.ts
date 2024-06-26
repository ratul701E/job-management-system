export interface Application {
    id: number
    applicationId: number
    isAiubian: boolean;
    isBscCompleted: boolean;
    isMscCompleted: boolean;
    name: string;
    phone: string;
    dob: string;
    email: string;
    aiubId: string;
    bscUniversity: string;
    bscDepartment: string;
    bscCGPA: number;
    mscUniversity: string;
    mscDepartment: string;
    mscCGPA: number;
    bscGraduationYear: number;
    bscAdmissionYear: number;
    mscGraduationYear: number;
    mscAdmissionYear: number;
    skills: string[];
    expectedSalary?: number
    cv?: string
    coverLetter?: string
}