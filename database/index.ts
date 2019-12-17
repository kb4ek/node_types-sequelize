import { Sequelize, DataTypes, UUID } from "sequelize";
import User from "./models/user.model";
import * as dotenv from 'dotenv';
import Board from "./models/board.model"
import BoardComment from './models/boardComment.model';

dotenv.config();

const DB_CONFIG = {
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
};

export async function connect(force: boolean, logging?: boolean) {
  try {
    await init();
    await init().sync({ force, logging });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export function init(): Sequelize {

  const sequelize = new Sequelize({
    host: DB_CONFIG.DB_HOST,
    dialect: 'mysql',
    database: DB_CONFIG.DB_NAME,
    username: DB_CONFIG.DB_USERNAME,
    password: DB_CONFIG.DB_PASSWORD,
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  });

  User.init({
    pk: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(20),
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'users',
    engine: 'InnoDB',
  });

  Board.init({
    pk: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    user_pk: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
    content: {
      type: new DataTypes.TEXT,
      allowNull: false,
    },
  },
    {
      sequelize,
      paranoid: true,
      tableName: 'boards',
    });

  BoardComment.init({
    pk: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_pk: {
      type: DataTypes.UUID,
      allowNull: false
    },
    board_pk: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: "boardComments",
    paranoid: true
  })

  User.hasMany(Board, {
    sourceKey: 'pk',
    foreignKey: 'user_pk',
    as: 'boards',
  })

  Board.hasMany(BoardComment, {
    sourceKey: 'pk',
    foreignKey: 'board_pk',
    as: 'boardComments',
  })

  return sequelize;
}