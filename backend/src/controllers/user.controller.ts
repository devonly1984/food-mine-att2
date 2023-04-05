import asyncHandler from 'express-async-handler';
import { UserModel } from '../mongodb/models/User.model';
import jwt from 'jsonwebtoken';

export const loginUser = asyncHandler(async(req,res)=> {
    const {email,password} = req.body;
    const user = await UserModel.find({email});
    if (user) {
        res.send(generateTokenResponse(user));
    } else {
        res.status(400).send("User name or password is incorrect")
    }

})
const generateTokenResponse = (user: any)=>{
    const token = jwt.sign({
        email: user.email,isAdmin: user.isAdmin

    },process.env.JWT_SECRET!,{
        expiresIn: "30d"
    }
    );
    user.token = token
    return user;

}