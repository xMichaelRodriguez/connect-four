import { app, server } from '.';

server.listen(app.get('port'), () => {
  console.log(`Server started on port ${app.get('port')}`);
});
