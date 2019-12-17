import { Request, Response, NextFunction, Router } from 'express';
import User from '../database/models/user.model';
import Board from '../database/models/board.model';
import BoardComment from '../database/models/boardComment.model';

const router: Router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {

  const name: string = req.body.name;

  const user: User = await User.create({
    name: name,
  }).catch(err => {
    console.log(err);
    throw err;
  })

  const board1: Board = await Board.create({
    user_pk: user.pk,
    title: "테스트",
    content: "테스트",
  }).catch(err => {
    console.log(err);
    throw err;
  })

  const board2: Board = await Board.create({
    user_pk: user.pk,
    title: "테스트",
    content: "테스트",
  }).catch(err => {
    console.log(err);
    throw err;
  })

  const boardComment1: BoardComment = await BoardComment.create({
    user_pk: user.pk,
    board_pk: board1.pk,
    author: user.name,
    content: "테스트",
  }).catch(err => {
    console.log(err);
    throw err;
  })

  const boardComment2: BoardComment = await BoardComment.create({
    user_pk: user.pk,
    board_pk: board1.pk,
    author: user.name,
    content: "테스트",
  }).catch(err => {
    console.log(err);
    throw err;
  })

  const userHasBoard: User[] = await User.findAll({
    include: [
      {
        model: Board,
        as: "boards",
        include: [
          {
            model: BoardComment,
            as: "boardComments"
          }
        ]
      }
    ]
  }).catch(err => {
    console.log(err);
    throw err;
  })


  res.json({
    a: userHasBoard,
  })
})

export default router;