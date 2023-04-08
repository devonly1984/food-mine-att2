import asyncHandler from "express-async-handler";
import {User, UserModel } from "../mongodb/models/User.model";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({email,password});
  if (user) {
   
    res.send(generateTokenResponse(user));
  } else {
    res.status(400).send("User name or password is incorrect");
  }
});
const generateTokenResponse = (user: any) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "30d",
    }
  );
 

  user.token = token;
  
  return {
    id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
      isAdmin: user.isAdmin,
      token: token
  };
};
export const registerUser = asyncHandler(async(req,res)=> {
  const {name,email,password,address} = req.body;
  const user = await UserModel.findOne({email});
  if (user) {
    res.status(500).send("User already exists with this email")
    return;
  } 
  const encryptedPassword = await bcrypt.hash(password,10);
  const newUser: User = {
    id: '',
    name,
    email: email.toLowerCase(),
    password: encryptedPassword,
    address,
    isAdmin: false
  }
  const dbUser = await UserModel.create(newUser);
  console.log(dbUser,"User Registered Successfully");
  res.send(generateTokenResponse(dbUser));
})