import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const dbName: string = process.env.DB_URL as string

mongoose.connect(dbName)

export const db = mongoose.connection
