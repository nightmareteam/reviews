/* eslint-disable camelcase */
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  
  return sequelize.define('comment', {
  /* REVIEW FIELDS */
    // post_id: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   primaryKey: false
    // }, 
    comment_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    }, 
    comment_date: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    comment_content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    post_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: false
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

    /* STEAM INFO */
    steam_level: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    acheivement_text: {
      type: Sequelize.STRING,
      allowNull: false
    },
    experience_points: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });
};