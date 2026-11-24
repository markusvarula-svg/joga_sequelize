const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/joga_mysql');

const Article = require('../models/article')(sequelize, Sequelize.DataTypes);
const Author = require('../models/author')(sequelize, Sequelize.DataTypes);
const Tag = require('../models/tag')(sequelize, Sequelize.DataTypes);


Article.belongsTo(Author, {
    foreignKey: 'author_id',
    as: 'Author'
});
Article.belongsToMany(Tag, {
    through: 'ArticleTags',
    foreignKey: 'articleId',
    otherKey: 'tagId',
    as: 'Tags'
});

const getAllArticles = (req, res) => {
    Article.findAll()
        .then(articles => {
            console.log(articles);
            return res.status(200).json({ articles });
        })
        .catch(error => {
            return res.status(500).send(error.message);
        });
};

const getArticleBySlug = (req, res) => {
    Article.findOne({
        where: {
            slug: req.params.slug
        },
        include: [
            {
                model: Author,
                as: 'Author'
            },
            {
                model: Tag,
                as: 'Tags',
                through: {
                    attributes: []
                }
            }
        ]
    })
        .then(article => {
            console.log(article);
            return res.status(200).json({ article });
        })
        .catch(error => {
            return res.status(500).send(error.message);
        });
};

module.exports = {
    getAllArticles,
    getArticleBySlug
};