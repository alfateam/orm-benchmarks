import map from './map';
import dotenv from 'dotenv';
dotenv.config();

const POOLSIZE = Number.parseInt(process.env.POOLSIZE);

export default map.sqlite("sqlite.db", { size: POOLSIZE});

