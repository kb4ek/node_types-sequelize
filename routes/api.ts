import { Request, Response, NextFunction, Router } from 'express';
import PlayList from '../database/models/playList.model';
import Video from '../database/models/video.model';

const router: Router = Router();

router.get('/playlist', async (req: Request, res: Response, next: NextFunction) => {
  const lat: PlayList['lat'] = req.body.lat;
  const lng: PlayList['lng'] = req.body.lng;

  if (lat == undefined || lng == undefined) {
    res.status(412).json({
      success: false,
      code: 412,
      message: "잘못된 데이터",
    });
  }

  const playList: PlayList[] = await PlayList.findAll({
    where: {
      lat,
      lng,
    },
  }).catch(err => {
    console.log(err);
    throw res.status(500).json({
      success: false,
      message: 'db error',
    });
  });

  res.json({
    success: true,
    data: {
      playList,
    }
  });
});

router.get('/playlist/video', async (req: Request, res: Response, next: NextFunction) => {
  const playList_pk: PlayList['pk'] | undefined = req.body.playList_pk || undefined;

  if (playList_pk == undefined) {
    res.status(412).json({
      success: false,
      code: 412,
      message: "잘못된 데이터",
    });
  }

  const playListHasSong: PlayList = await PlayList.findOne({
    where: {
      pk: playList_pk,
    },
    include: [
      {
        model: Video,
        as: 'videos',
        required: false,
      }
    ]
  }).catch(err => {
    console.log(err);
    throw res.status(500).json({
      success: false,
      message: 'db error',
    });
  });

  res.status(200).json({
    success: true,
    data: {
      playList: {
        title: playListHasSong.title,
        songs: playListHasSong.videos.map(val => ({
          pk: val.pk,
          playList_pk: val.pk,
          video_title: val.title,
          video_id: val.video_id,
        }))
      },
    }
  })
})

router.post('/playlist', async (req: Request, res: Response, next: NextFunction) => {
  const title: PlayList['title'] | undefined = req.body.title || undefined;
  const lat: PlayList['lat'] | undefined = req.body.lat || undefined;
  const lng: PlayList['lng'] | undefined = req.body.lng || undefined;
  const background: PlayList['background'] | undefined = req.body.background || undefined;

  console.log(background);
  if (title == undefined || lat == undefined || lng == undefined || background == undefined) {
    res.status(412).json({
      success: false,
      code: 412,
      message: '잘못된 데이터'
    });
  }

  const playList: PlayList = await PlayList.create({
    title: title,
    lat: lat,
    lng: lng,
    background: background,
  }).catch(err => {
    console.log(err);
    throw res.status(500).json({
      success: false,
      message: 'db error',
    });
  });

  res.status(200).json({
    success: true,
    data: {
      playList,
    }
  });
});

router.post('/playlist/video', async (req: Request, res: Response, next: NextFunction) => {
  const playList_pk: PlayList['pk'] | undefined = req.body.playList_pk || undefined;
  const title: Video['title'] | undefined = req.body.title || undefined;
  const video_id: Video['video_id'] | undefined = req.body.video_id || undefined;

  if (playList_pk == undefined || title == undefined || video_id == undefined) {
    res.status(412).json({
      success: false,
      code: 412,
      message: '잘못된 데이터'
    });
  }

  const video: Video = await Video.create({
    playList_pk,
    title,
    video_id,
  }).catch(err => {
    console.log(err);
    throw res.status(500).json({
      success: false,
      message: 'db error',
    });
  });

  res.json({
    success: true,
    data: {
      video,
    }
  })
})

export default router;