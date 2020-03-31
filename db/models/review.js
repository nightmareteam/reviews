/* eslint-disable camelcase */
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  
  return sequelize.define('review', {
    /* GAME FIELDS */
    game_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: false
    }, 

    /* REVIEW FIELDS */
    post_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    }, 
    recommended: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    review_date: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    hours_played: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    language: {
      type: Sequelize.STRING,
      allowNull: false
    },
    helpful_yes_count: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    helpful_no_count: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    helpful_funny_count: {
      type: Sequelize.INTEGER,
      allowNull: false
    },

    /* USER FIELDS */
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: false
    }, 
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_avatar: {
      type: Sequelize.STRING,
      allowNull: false
    },
    product_count: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    review_count: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    steam_level: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    registration_date: {
      type: Sequelize.DATEONLY,
      allowNull: false
    }
  });
};