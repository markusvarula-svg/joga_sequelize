const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/joga_mysql');

const Article = require('../models/article')(sequelize, Sequelize.DataTypes);
const Author = require('../models/author')(sequelize, Sequelize.DataTypes);

const getAuthorArticles = (req, res) => {
    Author.findByPk(req.params.id, {
        include: {
            model: Article,
            as: 'articles'
        }
    })
    .then(author => {
        res.status(200).json({ author });
    })
    .catch(error => {
        return res.status(500).send(error.message);
    });
};

module.exports = {
    getAuthorArticles
};