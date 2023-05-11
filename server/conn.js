import pkg from 'pg';
import dotenv from 'dotenv';
const { Pool } = pkg;
dotenv.config();

const pool = new Pool({
    user : "postgres",
    host : "localhost",
    database :process.env.DATABASE,
    password: process.env.PASSWORD,
    post: process.env.POST,
});
// pool.query("CREATE TABLE wazirx (name VARCHAR(255), last VARCHAR(255), buy VARCHAR(255), Sell VARCHAR(255), volume VARCHAR(255), base_unit VARCHAR(255))",(err,result)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("table creted");
//     }
// })

export default pool;