import { useParams } from "react-router-dom";
import FormProduct from "../_components/FormProduct";

const UpdateProduct = () => {
    const { id } = useParams();

    return (
        <div className="max-h-screen overflow-y-auto">
            <h2 className="text-xl">Cập nhập sản phẩm</h2>
            <FormProduct id={id} />
        </div>
    );
};

export default UpdateProduct;
