import path from "path";

const root = path.resolve()

export const paths = {
    root: root,
    src: path.join(path.dirname(""),"src"),
    public: path.join(root, "src", "public"),
    images: path.join(root, "src", "public", "images"),
    default_product_thumbnail: path.join(root, "src", "public", "images", "default_product.jpg" )
}