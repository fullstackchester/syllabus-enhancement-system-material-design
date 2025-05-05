import { randomUUID } from "node:crypto";

export default class Faculty {
    
    private _uid: string;
    private _eid: string;
    private _name: string;
    private _department: string;
    private _files: string[];
    private _isSuperUser: boolean;

    constructor(name: string, department: string) {
        this._uid = randomUUID().toString();
        this._eid = this.generateEid();
        this._name = name;
        this._department = department;
        this._files = [];
        this._isSuperUser = false;
    }

    private generateEid(): string {
        const year = new Date().getFullYear().toString().slice(-2); 
        const randomThreeDigits = Math.floor(Math.random() * 999 + 1).toString().padStart(3, '0');
        return year + randomThreeDigits;
    }

    get uid(): string {
        return this._uid;
    }
    
    get eid(): string {
        return this._eid;
    }

    get files(): string[] {
        return this._files;
    }

    set files(files: string[]) {
        this._files = files;
    }
    
    
}