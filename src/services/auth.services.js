const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');
const pool =require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

async function registerUser(email,name, password) {
    const hashedPassword = await bcrypt.hash(password,10);
    const result = await pool.query(
        `INSERT INTO users (email,name,password) VALUES ($1,$2,$3) RETURNING id,email,name`,
        [email,name,hashedPassword]
    );
    return result.rows[0];
}

async function loginUser(email,password) {
    const result = await pool.query(
        `SELECT * FROM users WHERE email=$1`,
        [email]
    );
    if (result.rows.length===0){
        throw new Error("Invalid email or password");
    }
    const user= result.rows[0];
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if (!isPasswordValid){
        throw new Error("Invalid email or password");
    }
    const token = jwt.sign(
        {userId: user.id, email: user.email},
        JWT_SECRET,
        {expiresIn: '1h'}
    );
    return {token, user: {id: user.id, email: user.email, name: user.name}};
}

module.exports = {
    registerUser,
    loginUser
};
    