// @ts-nocheck
import userService from "../services/userService";
import ErrorsUtils from "../utils/errors";

class UserController {
  
  static async signIn(req: Request, res: Response) {
    const { email, password} = req.body
    const { fingerprint } = req;
    try {
      const {accessToken, refreshToken, accessTokenExpiration} = 
      await userService.signIn({email, password, fingerprint })

      res.cookie("refreshToken", refreshToken, { 
        httpOnly: true,
        maxAge: 6048e5
      })
      return res.status(201).json({accessToken, accessTokenExpiration});
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async signUp(req: Request, res: Response) {
    const {username, email, password} = req.body
    const { fingerprint } = req;
    try {
      const {accessToken, refreshToken, accessTokenExpiration} = 
      await userService.signUp({username, email, password, fingerprint })

      res.cookie("refreshToken", refreshToken, { 
        httpOnly: true,
        maxAge: 6048e5
      })
      return res.status(201).json({accessToken, accessTokenExpiration});
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async logOut(req, res) {
    const refreshToken = req.cookies.refreshToken;
    try {
      await userService.logOut(refreshToken)

      res.clearCookie()
      return res.sendStatus(200);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async refresh(req, res) {
    const { fingerprint } = req;
    const currentRefreshToken = req.cookies.refreshToken
    try {
      const {accessToken, refreshToken, accessTokenExpiration} = 
      await userService.refresh({
        currentRefreshToken,
        fingerprint
      })

      res.cookie("refreshToken", refreshToken, { 
        httpOnly: true,
        maxAge: 6048e5
      })
      return res.status(200).json({accessToken, accessTokenExpiration})
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }
}

export default UserController;