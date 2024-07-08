import map from './map';
import dotenv from 'dotenv';
dotenv.config();

export default map.postgres(process.env.POSTGRES_URL, { size: 10});

