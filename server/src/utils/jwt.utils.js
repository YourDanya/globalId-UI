import jwt from 'jsonwebtoken'
import { promisify } from 'util'


  
 export const addJwtCookie = (res, value) =>{
    const token = jwt.sign({id: value},   process.env.JWT_SECRET,{
      expiresIn: process.env.JWT_SECRET_IN
    })

    const cookieOptions= {
      expires: new Date(Date.now()+process.env.JWT_COOKIES_EXPIRES_IN*24*3600*1000),
      httpOnly: true,
    }
  
    if(process.env.NODE_ENV=== 'production') {
      cookieOptions.secure = true
      cookieOptions.sameSite = 'none'
    }
  
    res.cookie('jwt', token, cookieOptions);
    return token
  }

  export async function jwtParser(req, res, next) {
    console.log('jwt token')
    let token=req.cookies.jwt
    if(!token){
      return res.status(400).send('No auth token found')
    }
    req.decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    next()
  }


