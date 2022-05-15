const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create our Post model
class Post extends Model {
  static upvote(body, models) {
    return Post.findOne({
      where: {
        id: body.post_id,
      },
      attributes: ["id", "post_url", "title", "created_at"],
    });
  }
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;