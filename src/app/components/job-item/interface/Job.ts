import { Application } from "src/app/Interface/Application";

export interface Job {
    jobId: number;
    jobName: string;
    location: string;
    salary: number;
    publishDate: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
    maximumApplication: number;
    acceptingResponse: boolean;
    jobApplications: Application[]
}
