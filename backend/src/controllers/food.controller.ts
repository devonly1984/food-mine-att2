import asyncHandler from "express-async-handler";
import { FoodModel } from "../mongodb/models/Food.model";
export const getAllFoods = asyncHandler(async (req, res) => {
  const foods = await FoodModel.find();
  res.send(foods);
});
export const getFoodBySearchTerm = asyncHandler(async (req, res) => {
  const searchRex = new RegExp(req.params.searchTerm, "i");
  const foods = await FoodModel.find({ name: { $regex: searchRex } });
  res.send(foods);
});
export const getAllTags = asyncHandler(async (req, res) => {
  const tags = await FoodModel.aggregate([
    {
      $unwind: "$tags",
    },
    {
      $group: {
        _id: "$tags",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id",
        count: "$count",
      },
    },
  ]).sort({ count: -1 });
  const all = {
    name: "All",
    count: await FoodModel.countDocuments(),
  };
  tags.unshift(all);
  res.send(tags);
});
export const getFoodByTagName = asyncHandler(async (req, res) => {
  const foods = await FoodModel.find({ tags: req.params.tagName });

  res.send(foods);
});
export const getFoodDetails = asyncHandler(async (req, res) => {
  const foods = await FoodModel.findById(req.params.foodId);
  res.send(foods);
});
