import bcrypt from "bcryptjs";
import { users, hashPassword,organizations,areas,sites } from "../models/index.js";
import {organizationValidator,siteValidator,areaValidator,registerUserValidator,loginUserValidator }from "../validators/index.js";
import { connectDB } from "../drizzle/db.js";
import { redisClient } from "../config/redis/redisconf.js";
import { logger } from "../utils/logger.js";
import { organization_reg_otp_template } from "../utils/emailtemplate/template.js";
import sendMail from "../utils/sendverification/email.js";


export const checkBusinessName = async(req,res)=>{

  const db = await connectDB();
  let logger_target;
  try{
    const businessName = (req.body.businessName);

    logger_target = businessName;
     
    const existingBusiness = db.select().from(organizations).where(organizations.name === businessName);
    
    
  
  if (existingBusiness) {
    const errorMessage = "This business name is already registered. Try logging in or choose a different name.";
    logger.error(errorMessage, { businessName });
    return res.status(400).json({ error: "This business name is already registered. Try logging in or choose a different name." });
  }
     logger.info("success", { businessName });
    return res.status(200).json({message:"success"});


  }
  catch (error) {
    if (error?.errors) {
      return res.status(400).json({ error: error?.errors });
    } else {
      console.error(error);
      const server_error = "Internal Server Error";
      logger.error(server_error, { businessName: logger_target });

      return res.status(500).json({ error: server_error });
    }
  }
  

}

export const sendOtp = async(req,res)=>{

  const db = await connectDB();
  let logger_target;
  try{
    const email = (req.body.email);

    logger_target = email;
     
    const existingBusiness = db.select().from(organizations).where(organizations.email_domain === email);
    
    
    
  if (existingBusiness.length > 0) {
    const errorMessage = "This business email is already registered. Try logging in or choose a different email.";
    logger.error(errorMessage, { email });
    return res.status(400).json({ error: "This business email is already registered. Try logging in or choose a different email." });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await redisClient.setex(`otp:${email}`, 300, otp);

  let emailContent = organization_reg_otp_template.replace("{{OTP}}", otp);
 
    let data = await sendMail(
      "Apptiv",
      email,
      "OTP verification",
      emailContent
    );

    logger.info("OTP sent successfully", { email });
    return res.status(201).json({ message: "OTP sent successfully" });
  }

  
  catch (error) {
    if (error?.errors) {
      return res.status(400).json({ error: error?.errors });
    } else {
      console.error(error);
      const server_error = "Internal Server Error";
      logger.error(server_error, { businessName: logger_target });

      return res.status(500).json({ error: server_error });
    }
  }
  

}

export const verifyOtp = async (req, res) => {
  const db = await connectDB();
  try {
    const { email, otp,businessName } = req.body;

    if (!email || !otp || !businessName) {
      const errorMessage = "Email,OTP and businessName are required ";
      logger.error(errorMessage);
      return res.status(400).json({ error: "Email,OTP and businessName required" });
    }

    const storedOtp = await redisClient.get(`otp:${email}`);

    if (!storedOtp) {
      const errorMessage = "OTP expired or invalid";
      logger.error(errorMessage, { email });
      return res.status(400).json({ error: "OTP expired or invalid" });
    }

    // Check if OTP matches
    if (storedOtp !== otp) {
      const errorMessage = "Invalid OTP";
      logger.error(errorMessage, { email });
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // OTP is valid → Delete it from Redis to prevent reuse
    await redisClient.del(`otp:${email}`);

    await db.insert(organizations).values({
      email_domain:email,
      name:businessName
    });

    logger.info("OTP verified successfully and oranganization has been registered", { email });

    return res.status(200).json({ message: "OTP verified successfully and oranganization has been registered" });



  } catch (error) {
    if (error?.errors) {
      return res.status(400).json({ error: error?.errors });
    } else {
      console.error(error);
      const server_error = "Internal Server Error";
      logger.error(server_error, { businessName: businessName });

      return res.status(500).json({ error: server_error });
    }
  }
};

export const getRedisData = async (req, res) => {
  
  try {

    const key = req.params.key;
 
        // Retrieve data from Redis using the provided key
        const data = await redisClient.get(key);
 
        if (data) {
            // If data exists, parse it and send it in the response
            const parsedData = JSON.parse(data);
            return res.status(200).json(parsedData);
        } else {
            return res.status(404).json({ message: 'Data not found in Redis' });
        }
    } catch (error) {
        console.log('Error retrieving data from Redis:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}