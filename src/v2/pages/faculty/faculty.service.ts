import { iFaculty } from './faculty.interface';
import API_URL from '../../../environment';

export function getFacultyList(): Promise<any> {
    return fetch(API_URL + 'faculty-list', {
        method: "GET"
    })
}

export function addFaculty(data: iFaculty): Promise<any> {
    return fetch(API_URL + 'faculty-list', {
        method: "POST",
        body: JSON.stringify({})
    })
}