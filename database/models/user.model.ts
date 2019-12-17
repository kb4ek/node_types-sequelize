import { Model, Association } from 'sequelize';
import Board from './board.model';

export default class User extends Model {

  public pk!: string;
  public id!: string;
  public password!: string;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    boards: Association<User, Board>
  }
}