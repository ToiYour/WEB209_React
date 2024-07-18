import { Router } from "express";
import {
    create,
    getAllProducts,
    getProductById,
    removeProductById,
    updateProductById,
} from "../controllers/product";

const router = Router();
router.get("/products", getAllProducts);
router.post("/products", create);
router.delete("/products/:id", removeProductById);
router.get("/products/:id", getProductById);
router.put("/products/:id", updateProductById);
export default router;
