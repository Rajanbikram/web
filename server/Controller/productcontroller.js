import { Product } from "../Model/productModel.js";


export const getAll = async (req, res) => {
  try {
    const data = await Product.findAll();
    res.status(200).json({
      success: true,
      data: data,
      message: "Products retrieved successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const save = async (req, res) => {
  try {
    const data = await Product.create(req.body);
    res.status(201).json({
      success: true,
      data: data,
      message: "Product created successfully"
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


