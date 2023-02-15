// create a basic express server to ping the server

import App from "./app";
import logger from "./services/logger";
import UserController from "./controllers/user.controller";
import PostController from "./controllers/post.controller";
const main = async () => {
  // Setup db connection and then start app
  const app = new App([new UserController(), new PostController()]);

  app.listen();
};
main()
  .then(() => {
    logger.info("App started");
  })
  .catch((err) => {
    logger.error("App failed");
    logger.error(err.stack);
  });
