export interface iSchoolYear {
    uid: string;
    codeId: string;
    name: string;
    description: string;
    college: string;        // the uid of the college
    syStartDate: string;
    syEndDate: string;
    yearRange: string[2];   // strictly 2 [2023, 2024]
}