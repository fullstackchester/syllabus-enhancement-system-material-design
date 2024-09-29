import { set } from "firebase/database";
import { uploadBytes } from "firebase/storage";

export function rtdbSet(firebaseRef, value) {
    return set(firebaseRef, value);
}

export function storageUpload(storageRef, data) {
    return uploadBytes(storageRef, data);
}