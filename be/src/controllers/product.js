import { StatusCodes } from "http-status-codes";
import Product from "../models/product";

export const create = async (req, res) => {
    try {
        const product = await Product.create(req.body);

        return res.status(StatusCodes.CREATED).json(product);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(StatusCodes.OK).json(products);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
export const getProductById = async (req, res) => {
    try {
        const products = await Product.findById(req.params.id);
        return res.status(StatusCodes.OK).json(products);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
export const updateProductById = async (req, res) => {
    try {
        const products = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        return res.status(StatusCodes.OK).json(products);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
export const removeProductById = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        return res.status(StatusCodes.OK).json(product);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
// iphone 13 product max => /product/iphone-13-product-max
// GET /product/:slug
