
import RepositoryBase from "./base.js";

class ImagenesProductoRepository extends RepositoryBase {
    constructor(model) {
        super(model);
    }
    async TodasLasImagenes() {
        try {
            return await this.model.findAll();
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async getImagesByProductId(productId) {
        try {
            return await this.model.findAll({
                where: { id_producto: productId }
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async createImage(url, productId) {
        try {
            return await this.model.create({
                url: url,
                id_producto: productId
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async deleteImage(imageId) {
        try {
            await this.model.destroy({
                where: { id: imageId }
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateImage(imageId, url) {
        try {
            await this.model.update(
                { url: url },
                { where: { id: imageId } }
            );
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default ImagenesProductoRepository;