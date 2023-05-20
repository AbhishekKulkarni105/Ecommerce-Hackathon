const { product } = require("../models");
const addProduct = async (req, res) => {
    try {
      const record = await product.create({ ...req.body });
      
      return res.status(200).json(record);
    } catch (e) {
      return res.status(400).json(e);
    }
  };

  const updateProduct = async (req, res) => {
    try {
      const data = await product.update(req.body, {
        where: { productId: req.params.id },
      });
      return res
        .status(200)
        .send({ message: data[0] === 1 ? "Record updated" : "No record found" });
    } catch (e) {
      return res.status(400).json(e.message);
    }
  };const removeProduct = async (req, res) => {
    try {
      const count = await product.destroy({
        where: { productId: req.params.id },
      });
      if (count === 1) {
        return res.status(200).json(data);
      }
      return res.status(404).send();
    } catch (e) {
      return res.status(400).json(e.message);
    }
  };
  const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? (page - 1) * limit : 0;
    return { limit, offset };
  };
  const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows } = data;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, rows, totalPages, currentPage: page ? page : 1 };
  };
    
const getAllProducts = async (req, res) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const data = await product.findAndCountAll({ offset, limit });
    const response = getPagingData(data, page, limit);
    return res.status(200).json(response);
  }
 catch (e) {
      return res.status(400).json(e);
    }
  };
  const getProductById = async (req, res) => {
    try {
        
      const data = await product.findByPk(req.params.id);
      if(data){
          return res.status(200).send(data);
      }
      return res.status(204).send();
    } catch (e) {
      return res.status(400).json(e.message);
    }
  };
  const bulkInsert = async (req, res) => {
    try {
      await product.bulkCreate(req.body);
      return res.status(200).json({ message: "Success" });
    } catch (e) {
      return res.status(400).json(e);
    }
  };

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  removeProduct,
  updateProduct,bulkInsert
};
