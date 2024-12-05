import path from "path";

const root = path.resolve()

export const paths = {
    root: root,
    src: path.join(path.dirname(""),"src"),
    public: path.join(root, "src", "public"),
    images: path.join(root, "src", "public", "images"),
    default_product_thumbnail: path.join(root, "src", "public", "images", "default_product.jpg" ),
    data: path.join(root,"src","data"),
    productJSON: path.join(root,"src","data", "products.json")
}

export default paths