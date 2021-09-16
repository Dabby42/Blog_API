import dotenv from 'dotenv';
import fs from 'fs';

if(process.env.NODE_ENV == 'test'){
    try{
      let dotenvt = dotenv.parse(fs.readFileSync('.env.test'));
      for (const k in dotenvt) {
        process.env[k] = dotenvt[k]
      }
    }catch(err){
      
    }
    
}
dotenv.config();

const secrets = {
  port: process.env.PORT,
  
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtTtl: process.env.JWT_TTL,
  jwtRefreshTtl: process.env.JWT_REFRESH_TTL,
  
  mongoUri: process.env.MONGO_URI,
  mongoUser: process.env.MONGO_USER,
  mongoPass: process.env.MONGO_PASS,

  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME, 
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY, 
  cloudinaryApiSecret: process.env.CLOUDINARY_SECRET,

};

module.exports = secrets;