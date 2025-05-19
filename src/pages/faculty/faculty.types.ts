export interface iFaculty {
    uid: string;
    name: string;
    department: number;
    files: string[];

}

export interface iFacultyV2 {
    uid: string;
    name: string;
    department: string;     // uid of department
    files: string[];        // refers to the uids of current files
    published: string[];    // refers to the uids of officially published syllabus
    position: string;       // uid of roles/posistion
    college: string;        // uid of college
    dateCreated: string;
    superUser: boolean;
}