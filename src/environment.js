import process from "process"

const environment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export default environment