import { Model } from 'sequelize';

export default class BoardComment extends Model {

  public pk!: number;
  public board_pk!: number;
  public user_pk!: string;
  public author!: string;
  public content!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}