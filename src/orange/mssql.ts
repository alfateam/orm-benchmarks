import map from './map';
import dotenv from 'dotenv';
dotenv.config();

const POOLSIZE = Number.parseInt(process.env.POOLSIZE);

export default map.mssql(process.env.MSSQL_URL, { size: POOLSIZE});

