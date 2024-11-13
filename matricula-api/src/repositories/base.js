class RepositoryBase {
    constructor(model) {
        this.model = model;
    }
    async findAll() {
        try {
            return await this.model.findAll();
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async create(entity) {
        try {
            return await this.model.create(entity);
        } catch (error) {
            console.log(error);
            return null;
        }


    }

    async findOne(id) {
        try {
            return await this.model.findOne({ where: { id: id } });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async update(entity) {
        try {
            await this.model.update(entity, { where: { id: entity.id } });
            return entity;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async remove(id) {
        try {
            const entity = await this.findOne(id);
            if (entity) {
                await this.model.destroy({ where: { id: id } });
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return null;
        }
    }


}

export default RepositoryBase;

