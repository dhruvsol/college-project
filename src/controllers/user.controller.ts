import express from "express";
import { USER_API } from "../path";
// interface
import Controller from "../interface/controller";
import {
  createFailureResponse,
  createSuccessResponse,
} from "../interface/response";
// functions
import { prisma } from "../helpers/prisma";
class UserController implements Controller {
  public path = USER_API;
  public router = express.Router();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(`${USER_API}/create`, this.createUser);
    this.router.post(`${USER_API}/find`, this.checkUser);
  }

  private createUser = async (
    request: express.Request,
    response: express.Response
  ) => {
    const { avatar, email, fullname, password, username } = request.body;
    try {
      const res = await prisma.user.create({
        data: {
          avatar: avatar,
          email: email,
          fullname: fullname,
          password: password,
          username: username,
        },
      });
      return response.send(createSuccessResponse(res));
    } catch (e) {
      return response.send(createFailureResponse(500, "Internal Error"));
    }
  };
  private checkUser = async (
    request: express.Request,
    response: express.Response
  ) => {
    const { email, password } = request.body;
    try {
      const res = await prisma.user.findFirst({
        where: {
          email,
        },
      });
      if (res) {
        if (res.password === password) {
          return response.send(createSuccessResponse(res));
        } else {
          return response.send(createSuccessResponse("wrong password"));
        }
      } else {
        return response.send(createSuccessResponse("user not found"));
      }
    } catch (error) {
      console.log(error);
      return response.send(createFailureResponse(500, "Internal Error"));
    }
  };
}

export default UserController;
