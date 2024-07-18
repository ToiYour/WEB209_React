import { IProduct } from "@/common/types/product";
import { getAllProducts, removeProduct } from "@/services/product";
import { Button, Divider, message, Radio, Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";

const ProductPage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const response = await getAllProducts();
                const data = await response.data;
                if (response.status !== 200) throw new Error("Error");
                setProducts(
                    data?.map((product: IProduct) => ({
                        ...product,
                        key: product._id,
                    })),
                );
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);
    if (isLoading) return <div>Loading....</div>;
    if (isError) return <div>Error</div>;
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IProduct[]) => {
            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows,
            );
        },
        getCheckboxProps: (record: IProduct) => ({
            disabled: record.name === "Disabled User", // Column configuration not to be checked
            name: record.name,
        }),
    };
    const columns: TableColumnsType<IProduct> = [
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
        },
        {
            title: "Giá",
            dataIndex: "price",
        },
        {
            title: "Ảnh ",
            dataIndex: "image",
        },
        {
            title: "Mô tả ",
            dataIndex: "description",
        },
        {
            title: "Actions",
            dataIndex: "description",
            render: (_, product) => (
                <div className="flex flex-wrap items-start gap-1">
                    <Button
                        type="primary"
                        danger
                        onClick={() => handleDelete(product)}
                    >
                        Xoá
                    </Button>
                    <Button
                        type="primary"
                        href={`/admin/products/${product._id}/edit`}
                    >
                        Sửa
                    </Button>
                </div>
            ),
        },
    ];
    const handleDelete = async (product: IProduct) => {
        try {
            const data = await removeProduct(product);
            if (!data) {
                throw new Error();
            }
            setProducts(products.filter((p) => p._id != product._id));
            messageApi.open({
                type: "success",
                content: "Xoá sản phẩm thành công",
            });
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "Xoá sản phẩm thất bại vui lòng thử lại sau",
            });
        }
    };
    return (
        <>
            {contextHolder}
            <h2>Quản lý sản phẩm</h2>
            <div>
                <Divider />
                <Table
                    rowSelection={{
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={products}
                />
            </div>
        </>
    );
};

export default ProductPage;
