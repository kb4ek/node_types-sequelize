import { Model, Association } from 'sequelize';
import BoardComment from './boardComment.model';

export default class Board extends Model {

  public pk!: number;
  public user_pk!: string;
  public title!: string;
  public content!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt?: Date;

  public static associations: {
    boardComments: Association<Board, BoardComment>
  }
}