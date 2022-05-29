import { Request, Response, Router } from 'express';
import { users } from '..';

const route = Router();

route.post('/create-user', (req: Request, res: Response) => {
  try {
    const userNames = users.map((user) => user.userName);

    if (!userNames.includes(req.body.username)) {
      const { userToSave } = addUser(req.body);
      return res
        .status(200)
        .json({ description: userToSave, name: 'UserSaved' });
    }

    return res
      .status(500)
      .json({ description: 'user already exist', name: 'userAlreadyExists' });
  } catch (error) {
    console.log(error);
    throw new Error('WRON');
  }
});

export default route;

function addUser({ username }: { username: string }) {
  const userToSave = {
    userName: username,
    rank: `${Math.floor(Math.random() * 100)}`,
  };
  users.push(userToSave);

  return { userToSave };
}
