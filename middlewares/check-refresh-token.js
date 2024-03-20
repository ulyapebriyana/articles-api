import jwt from "jsonwebtoken";

import { errorClientResponse, errorServerResponse, successResponse } from "../helpers/response-helper.js"
import { User } from "../models/index.js"

const CheckRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return errorClientResponse(res, 401, "token is required")
    const getRefreshToken = await User.findAll({
      where: { refreshToken: refreshToken }
    })
    if (!getRefreshToken[0]) return errorClientResponse(res, 404, "refresh token not found please login again")
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) errorClientResponse(res, 401, "refresh token invalid")
      req.currentUser = decoded
      next();
    });
  } catch (error) {
    return errorServerResponse(res, error)
  }
}

export default CheckRefreshToken