import express from "express";
import { POST_API } from "../path";
// interface
import Controller from "../interface/controller";
import {
  createFailureResponse,
  createSuccessResponse,
} from "../interface/response";
// functions
import { prisma } from "../helpers/prisma";
class PostController implements Controller {
  public path = POST_API;
  public router = express.Router();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(`${POST_API}/photo/create`, this.createPhotoPost);
    this.router.post(`${POST_API}/code/create`, this.createCodePost);
    this.router.get(`${POST_API}/find`, this.findPosts);
  }

  private createPhotoPost = async (
    request: express.Request,
    response: express.Response
  ) => {
    const { photo, userId } = request.body;
    try {
      const res = await prisma.postsPhoto.create({
        data: {
          photo,
          userId,
        },
      });
      return response.send(createSuccessResponse(res));
    } catch (e) {
      return response.send(createFailureResponse(500, "Internal Error"));
    }
  };
  private createCodePost = async (
    request: express.Request,
    response: express.Response
  ) => {
    const { status, language, userId } = request.body;
    try {
      const res = await prisma.postsCode.create({
        data: {
          status,
          language,
          userId,
        },
      });
      return response.send(createSuccessResponse(res));
    } catch (e) {
      return response.send(createFailureResponse(500, "Internal Error"));
    }
  };
  private findPosts = async (
    _request: express.Request,
    response: express.Response
  ) => {
    try {
      const Photo = await prisma.postsPhoto.findMany();
      const code = await prisma.postsCode.findMany();
      return response.send(
        createSuccessResponse({
          photoPost: Photo,
          codePost: code,
        })
      );
    } catch (error) {
      return response.send(createFailureResponse(500, "Internal Server Error"));
    }
  };
}

export default PostController;
