const {user} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require("../config")

const saltRounds = 10;
const id2 = user.userId;
const hashPassword=async (password)=>{
    try{
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return Promise.resolve(hash); // hashed password
    }catch(e){
        return Promise.reject(e);
    }
}

const generateToken = (userId,role) => {
    const token = jwt.sign(
      {
        subject: userId,
        role,
      },
      SECRET_KEY,
      { expiresIn: 60 * 60 }
    );
    return token;
  };
  
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await user.findOne({ where: { userEmail: email.trim() } });
        let message = "";
        let access_token = null;
        if (data === null) message = "No user found!";
        else {
          const verify = await bcrypt.compare(password, data.userPassword);
          if (verify === true) {
            message = "Login successful";
            access_token = generateToken(data.userId,data.userRole);
          } else message = "Invalid login details";
        }
        return res.status(200).json({ message, access_token });
      } 
    catch (e) {
      return res.status(400).json(e);
    }
  };

const register = async (req, res) => {
    try {
      const {email, password, contact } = req.body;
      const hashed = await hashPassword(password);
      const data = await user.create({
        userEmail: email,
        userPassword: hashed,
        userContact: contact,
      });
      return res.status(201).json(data);
    } catch (e) {
      return res.status(400).json(e.message);
    }
  };
  const profile = async (req, res) => {
    try {
      const data = await user.findByPk(res.locals.user.id,{
        attributes:["userId","userEmail","userContact"]
      });
      return res.status(200).send(data);
    } catch (e) {
      return res.status(400).send(e);
    }
  };
  
  module.exports = {register,login,profile,generateToken,id2};