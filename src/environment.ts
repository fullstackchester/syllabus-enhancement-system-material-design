import process from "process"

const isDevelopment: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

const API_URL: string = isDevelopment ? 'http://localhost:3001/' : 'PROD_URL';

export default API_URL