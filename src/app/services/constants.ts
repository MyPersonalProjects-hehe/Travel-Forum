import dotenv from 'dotenv';
dotenv.config();

export const DB_URL = process.env['DBURL'];
export const API_KEY = process.env['APIKEY'];
export const DOMAIN = process.env['DOMAIN'];
export const PROJECT_ID = process.env['PROJECTID'];
export const STORAGE_BUCKET = process.env['SB'];
export const MESSAGE_SENDER = process.env['MESSAGESENDER'];
export const APP_ID = process.env['APPID'];
