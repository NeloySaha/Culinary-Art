const Recipe = require("../models/RecipeModel");
const User = require("../models/UserModel");

const createRecipe = async (req, res) => {
  const userId = req.user.id;
  try {
    const {
      name,
      category,
      instructions,
      keywords,
      ingredients,
      time,
      servings,
      difficulty,
      image,
    } = req.body;

    const newRecipe = new Recipe({
      name,
      category,
      instructions,
      keywords,
      ingredients,
      time,
      servings,
      difficulty,
      imageUrl: image,
      comments: [],
      createdBy: userId,
      likedUsers: [],
    });

    await newRecipe.save();

    res.status(200).json({
      success: true,
      message: "Recipe created successfully",
      data: newRecipe,
    });
  } catch (error) {
    console.error("Error creating recipe:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const editRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const {
      name,
      category,
      instructions,
      keywords,
      ingredients,
      time,
      servings,
      difficulty,
      image,
    } = req.body;

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      {
        name,
        category,
        instructions,
        keywords,
        ingredients,
        time,
        servings,
        difficulty,
        imageUrl: image,
      },
      { new: true } // return the updated document
    );

    if (!updatedRecipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      data: updatedRecipe,
    });
  } catch (error) {
    console.error("Error updating recipe:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const getRecipesByUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const recipes = await Recipe.find({
      createdBy: userId,
    });
    res.status(200).json({
      success: true,
      data: recipes,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const getRecipesByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const recipes = await Recipe.find({ category: category.toLowerCase() });

    if (recipes.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({
      success: true,
      message: "Recipes fetched successfully",
      data: recipes,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const getSearchedRecipes = async (req, res) => {
  const { q } = req.params;

  try {
    let recipes = [];
    if (q) {
      recipes = await Recipe.find({
        $or: [
          { name: { $regex: q, $options: "i" } },
          { keywords: { $elemMatch: { $regex: q, $options: "i" } } },
        ],
      });
    }
    res.status(200).json({
      success: true,
      message: "Recipes fetched successfully",
      data: recipes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const addComment = async (req, res) => {
  const userId = req.user.id;
  const { recipeId, comment } = req.body;

  try {
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const newComment = {
      commentedBy: userId,
      comment,
    };

    recipe.comments.push(newComment);
    await recipe.save();

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: newComment,
    });
  } catch (error) {
    console.error("Error adding comment:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const addLike = async (req, res) => {
  const userId = req.user.id;
  const { recipeId } = req.body;

  try {
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    const existingUserIndex = recipe.likedUsers.findIndex(
      (likedUserId) => likedUserId.toString() === userId
    );

    if (existingUserIndex !== -1) {
      // User has already liked, so remove the like
      recipe.likedUsers.splice(existingUserIndex, 1);
      recipe.likesCount = (recipe.recipeLikeCount || 1) - 1;
    } else {
      // User hasn't liked, so add the like
      recipe.likedUsers.push(userId);
      recipe.likesCount = (recipe.recipeLikeCount || 0) + 1;
    }

    await recipe.save();

    return res.status(200).json({
      success: true,
      message: "Like operation handled successfully",
      likeCount: recipe.recipeLikeCount,
    });
  } catch (error) {
    console.error("Error adding/removing like:", error.message);
    res.status(500).json({
      success: false,
      message: "Like operation error",
      error: error.message,
    });
  }
};

const addBookmark = async (req, res) => {
  const userId = req.user.id;
  const { recipeId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const existingRecipeIndex = user.bookmarks.findIndex(
      (bookmarkedRecipeId) => bookmarkedRecipeId.toString() === recipeId
    );

    if (existingRecipeIndex !== -1) {
      // User has already bookmarked, so remove the bookmark
      user.bookmarks.splice(existingRecipeIndex, 1);
    } else {
      // User hasn't bookmarked, so add the bookmark
      user.bookmarks.push(recipeId);
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Bookmark operation handled successfully",
    });
  } catch (error) {
    console.error("Error adding/removing bookmark:", error.message);
    res.status(500).json({
      success: false,
      message: "Bookmark operation error",
      error: error.message,
    });
  }
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id)
      .populate({
        path: "createdBy",
        select:
          "-password -email -bio -role -bookmarks -userLikeCount -creditPoints -createdAt -updatedAt",
      })
      .populate({
        path: "comments.commentedBy",
        select:
          "-password -email -bio -role -bookmarks -userLikeCount -creditPoints -createdAt -updatedAt",
      });

    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "recipe not found" });
    }

    // Sort comments by createdAt (newest first)
    recipe.comments.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.status(200).json({
      success: true,
      message: "recipe fetched successfully",
      data: recipe,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const getMostLikedRecipes = async (req, res) => {
  try {
    const mostLikedRecipe = await Recipe.find()
      .sort({ likesCount: -1 })
      .limit(8)
      .select("-comments")
      .populate("createdBy", "username");

    if (!mostLikedRecipe) {
      return res.status(404).json({
        success: false,
        message: "No recipes found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Most liked recipe fetched successfully",
      data: mostLikedRecipe,
    });
  } catch (error) {
    console.error("Error fetching most liked recipe:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
const getLatestRecipes = async (req, res) => {
  try {
    const latestRecipes = await Recipe.find()
      .sort({ _id: -1 })
      .limit(4)
      .select("-comments")
      .populate("createdBy", "username");

    if (latestRecipes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No recipes found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Latest recipes fetched successfully",
      data: latestRecipes,
    });
  } catch (error) {
    console.error("Error fetching latest recipes:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json({
      success: true,
      data: recipes,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const getOtherRecipes = async (req, res) => {
  const { excludeId } = req.params; // or req.query, depending on how you're passing the ID

  try {
    const recipes = await Recipe.find({ _id: { $ne: excludeId } }).limit(10);
    res.status(200).json({
      success: true,
      data: recipes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

async function getUniqueKeywords(req, res) {
  try {
    const result = await Recipe.aggregate([
      { $unwind: "$keywords" },
      {
        $project: {
          keyword: { $toLower: "$keywords" }, // normalize to lowercase
        },
      },
      {
        $group: {
          _id: "$keyword",
        },
      },
      {
        $sort: { _id: 1 }, // sort alphabetically
      },
      {
        $project: {
          _id: 0,
          keyword: "$_id",
        },
      },
    ]);

    const uniqueKeywords = result.map((entry) => entry.keyword);

    res.status(200).json({
      success: true,
      data: uniqueKeywords,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
}

async function getRecipeByKeywords(req, res) {
  const { keyword } = req.body;

  try {
    const recipes = await Recipe.find({
      keywords: { $regex: new RegExp(`^${keyword}$`, "i") },
    });
    res.status(200).json({
      success: true,
      data: recipes,
    });
  } catch (err) {
    console.error("Error fetching recipes by keyword:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const deleteRecipe = async (req, res) => {
  const delrecipeId = req.params.id;
  const userId = req.user.id;

  try {
    const recipe = await Recipe.findById(delrecipeId);

    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    if (recipe.createdBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can only delete your own recipes",
      });
    }

    await recipe.deleteOne();

    res.json({
      success: true,
      message: "Recipe deleted successfully",
      recipe,
    });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  getAllRecipes,
  getOtherRecipes,
  createRecipe,
  getRecipesByUser,
  getRecipesByCategory,
  getSearchedRecipes,
  addComment,
  addLike,
  addBookmark,
  getRecipeById,
  getMostLikedRecipes,
  getLatestRecipes,
  deleteRecipe,
  getUniqueKeywords,
  getRecipeByKeywords,
  editRecipe,
};
