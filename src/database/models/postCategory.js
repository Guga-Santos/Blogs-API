module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
        postId: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            primaryKey: true,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            primaryKey: true,
        }
    }, {
        timestamps: false,
        tableName: 'PostCategories',
    });

    PostCategory.associate = (models) => {
        models.Category.belongsToMany(models.BlogPost, {
            through: PostCategory,
            foreignKey: 'categoryId',
            otherKey: 'postId',
            as: 'posts',
        });
        models.BlogPost.belongsToMany(models.Category, {
            through: PostCategory,
            foreignKey: 'postId',
            otherKey: 'categoryId',
            as: 'categories',
        });
    }

    return PostCategory;
}