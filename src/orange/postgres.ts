import map from './map';
import dotenv from 'dotenv';
dotenv.config();

const POOLSIZE = Number.parseInt(process.env.POOLSIZE);

export default map.postgres(process.env.POSTGRES_URL, { size: POOLSIZE});

