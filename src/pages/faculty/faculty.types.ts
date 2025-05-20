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
    coAuthored: string[];   // refers to the files that you contributed
    position: string;       // uid of roles/posistion
    college: string;        // uid of college
    userCreated: string;
    superUser: boolean;
}

export interface iPosition {
    uid: string;
    codeId: string;
    name: string;
    description: string;
}

export interface iDepartment {
    uid: string;
    codeId: string;
    name: string;
    description: string;
}

export interface iCollege {
    uid: string;
    codeId: string;
    name: string;
    description: string; 
}

/* main feature */
export interface iSyllabus {
    uid: string;
    versionid: string;          // uid, but for versioning
    author: string;             // author uid
    dateCreated: string;        // one time date upon creation
    lastDateModified: string;
    verions: iSyllabus[];       // save all the previous version for comparison
    fileName: string;
    description: string;
    content: string;            // the content of the file in binary
    dateDue: string;
    status: string;
}

export interface iPublishedSyllabus extends iSyllabus {
    datePublished: string;
    schoolYear: string;     // uid of the school schoolYear
}