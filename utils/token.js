
import jwt from "jsonwebtoken";

const secret = process.env.SECRET;

export const generateToken = (data) => {
    try {
        return jwt.sign({ email: data.email, id: data._id }, secret , { expiresIn: "8h" });
    } catch(e) {
        throw new Error(e)
    }
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch(e) {
        throw new Error(e)
    }
}