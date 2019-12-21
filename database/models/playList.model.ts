import { Model, DataTypes, HasMany } from 'sequelize';

import { sequelize } from '../index';

export default class PlayList extends Model<PlayList> {
  public static associations: {
    videos: HasMany<PlayList, Video>;
  }

  public readonly videos: Video[];

  public pk: number;
  public title: string;
  public lat: number;
  public lng: number;
  public background: string;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

PlayList.init({
  pk: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lat: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  lng: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  background: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'playLists',
});

import Video from './video.model';

PlayList.hasMany(Video, {
  sourceKey: 'pk',
  foreignKey: 'playList_pk',
  as: 'videos',
});
