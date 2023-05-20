const { category } = require("../models");
const addCategory = async (req, res) => {
    try {
      const record = await category.create({ ...req.body });
      
      return res.status(200).json(record);
    } catch (e) {
      return res.status(400).json(e);
    }
  };

  const removeCategory = async (req, res) => {
    try {
      const count = await product.destroy({
        where: { category: req.params.id },
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
    
const getAllCategory = async (req, res) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const data = await category.findAndCountAll({ offset, limit });
    const response = getPagingData(data, page, limit);
    return res.status(200).json(response);
  }
 catch (e) {
      return res.status(400).json(e);
    }
  };
  const getCategoryById = async (req, res) => {
    try {
        
      const data = await category.findByPk(req.params.id);
      if(data){
          return res.status(200).send(data);
      }
      return res.status(204).send();
    } catch (e) {
      return res.status(400).json(e.message);
    }
  };

module.exports = {
  addCategory,
  getAllCategory,
  getCategoryById,
  removeCategory,
};
