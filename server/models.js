import sequelize from "./database.js";
import { DataTypes } from "sequelize";

export const Users = sequelize.define(
  "Users",
  {
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  { tableName: "users", timestamps: false }
);

export const Posts = sequelize.define(
  "Posts",
  {
    title: {
      type: DataTypes.STRING,
    },
    postText: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
  },
  { tableName: "posts", timestamps: false }
);

Users.hasMany(Posts);
Posts.belongsTo(Users);

export const Comments = sequelize.define(
  "Comments",
  {
    commentsText: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
  },
  { tableName: "comments", timestamps: false }
);

Posts.hasMany(Comments);
Comments.belongsTo(Posts);

export const Likes = sequelize.define("likes",null,{ tableName: "likes", timestamps: false });

Users.hasMany(Likes);
Likes.belongsTo(Users);
Posts.hasMany(Likes);
Likes.belongsTo(Posts);
