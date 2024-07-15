import map from './map';
import dotenv from 'dotenv';
dotenv.config();

const POOLSIZE = Number.parseInt(process.env.POOLSIZE);

export default map.mysql(process.env.MYSQL_URL, { size: POOLSIZE});

