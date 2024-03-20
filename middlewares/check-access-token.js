import jwt from "jsonwebtoken";

import { errorClientResponse, errorServerResponse, successResponse } from "../helpers/response-helper.js"

const CheckAccessToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]
    if (!token) return errorClientResponse(res, 401, "token is required")
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return errorClientResponse(res, 401, "token invalid")
      req.currentUser = decoded
      next();
    })
  } catch (error) {
    errorServerResponse(res, error)
  }
}

export default CheckAccessToken