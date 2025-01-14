const Post = require("../models/posts");
const User = require("../models/user2");

const getAllPosts = async (req, res) => {
  try {
    const proficientArray = [];
    const postsArray = [];
    console.log(req.params.searchJob);
    const posts = await Post.find({
      title: { $regex: req.params.searchJob, $options: "i" },
    });

    const proficient = await User.find({
      career: { $regex: req.params.searchJob, $options: "i" },
    }).select("career dayRate city profile");

    for (const element of proficient) {
      let proficient = {
        title: element.career,
        price: element.dayRate,
        location: element.city,
        id: element._id,
      };
      proficientArray.push(proficient);
    }

    for (const element of posts) {
      let posts = {
        title: element.title,
        content: element.content,
        location: element.location,
        price: element.dayRate,
        id: element._id,
      };
      postsArray.push(posts);
    }

    const result = {
      posts: postsArray,
      proficient: proficientArray,
    };

    console.log(result);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

const getSpecificData = async (req, res) => {
  try {
    const data = JSON.parse(req.params.data);
    const title = data.title;
    const cities = data.cities;
    const min = data.dayRate.min;
    const max = data.dayRate.max;
    const rating = data.rating;

    const postsArray = [];
    const proficientArray = [];

    const postsFilter = {
      ...(title && { title: { $regex: title, $options: "i" } }),
      ...(cities.length > 0 && { location: { $in: cities } }),
      ...(min && { dayRate: { $gte: parseInt(min, 10) } }),
      ...(max && { dayRate: { $lte: parseInt(max, 10) } }),
      ...(rating && { rating: { $gte: parseInt(rating, 10) } }),
    };

    const proficientFilter = {
      ...(title && { career: { $regex: title, $options: "i" } }),
      ...(cities.length > 0 && { city: { $in: cities } }),
      ...(min && { dayRate: { $gte: parseInt(min, 10) } }),
      ...(max && { dayRate: { $lte: parseInt(max, 10) } }),
      ...(rating && { rating: { $gte: parseInt(rating, 10) } }),
    };

    const posts = await Post.find(postsFilter);
    const proficient = await User.find(proficientFilter).select(
      "career dayRate city profile"
    );

    for (const element of proficient) {
      let proficient = {
        title: element.career,
        price: element.dayRate,
        location: element.city,
        id: element._id,
      };
      proficientArray.push(proficient);
    }

    for (const element of posts) {
      let posts = {
        title: element.title,
        content: element.content,
        location: element.location,
        price: element.dayRate,
        id: element._id,
      };
      postsArray.push(posts);
    }
    const result = {
      posts: postsArray,
      proficient: proficientArray,
    };

    console.log(result);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

module.exports = { getAllPosts, getSpecificData };
