import asyncHandler from 'express-async-handler';
import { FoodModel } from '../mongodb/models/Food.model';
export const getAllFoods = asyncHandler(async (req,res)=> {
    const foods = await FoodModel.find({});
    res.send(foods);
})
export const getFoodBySearchTerm = asyncHandler(async(req,res)=> {
    const searchTerm = req.params.searchTerm;

    const foods = await FoodModel.findOne({name: searchTerm});
})
export const getAllTags = asyncHandler(async(req,res)=>{
    
})
export const getFoodByTagName = asyncHandler(async(req,res)=>{
    const tagName = req.params.tagName;  
})
export const getFoodDetails = asyncHandler(async(req,res)=> {
    const foodId= req.params.foodId;
    const foods = await FoodModel.findById(foodId);
    res.send(foods);
})
    
