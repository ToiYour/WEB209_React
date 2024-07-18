import { IProduct } from "@/common/types/product";
import { addProduct, editProduct, getProductById } from "@/services/product";
import { Button, Form, FormProps, Input, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
type FieldType = {
    name?: string;
    price?: number;
    image?: string;
    description?: string;
};
type Props = {
    id?: string;
};
const FormProduct = ({ id }: Props) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [oldProduct, setOldProduct] = useState<IProduct>();
    useEffect(() => {
        (async () => {
            if (id) {
                const data = await getProductById(id as string);
                console.log(data);
                form.setFieldsValue(data);
                setOldProduct(data);
            }
        })();
    }, [id]);
    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        try {
            if (id) {
                const data = await editProduct({
                    ...values,
                    _id: id as string,
                } as IProduct);
                if (!data) {
                    throw new Error();
                }
                navigate("/admin/products");
                messageApi.open({
                    type: "success",
                    content: "Cập nhập sản phẩm thành công",
                });
            } else {
                const data = await addProduct(values as IProduct);
                if (!data) {
                    throw new Error();
                }
                messageApi.open({
                    type: "success",
                    content: "Thêm sản phẩm thành công",
                });
            }
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "Thêm sản phẩm thất bại vui lòng thử lại sau",
            });
        }
    };
    return (
        <>
            {contextHolder}
            <Form
                form={form}
                name="basic"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                className="w-full"
                initialValues={oldProduct}
            >
                <Form.Item<FieldType>
                    label="Tên sản phẩm"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên sản phẩm!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Giá sản phẩm"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn giá sản phẩm!",
                        },
                    ]}
                >
                    <Input type="number" />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Ảnh sản phẩm"
                    name="image"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập ảnh sản phẩm!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Mô tả sản phẩm"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập mô tả sản phẩm!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="">
                        {id ? "Cập nhập sản phẩm" : "Thêm sản phẩm"}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default FormProduct;
