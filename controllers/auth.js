import jwt from "jsonwebtoken";

const secret = process.env.SECRET;

const auth = async (req, res, next) => {
  try {
    let decodedData;
    let token = req.headers.authorization;
    decodedData = jwt.verify(token, secret);
    req.userId = decodedData?.id;
    req.user = {
      email: decodedData?.email,
      name: decodedData?.name
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "session expired!" });
    throw new Error(error)
  }
};

export default auth;