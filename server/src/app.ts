import { app } from ".";

app.listen(app.get("port"), () => {
  console.log(`Server started on port ${app.get("port")}`);
});
