import { Request, Response } from 'express';
import { CreateCategoryService } from '../../services/category/CreateCategoryService';

class CreateCatoryController{
    async handle(request: Request, response: Response){

        const { name } = request.body;

        const createCategoryService = new CreateCategoryService();

        const category = await createCategoryService.execute({
            name: request.body.name,
        });

        return response.json(category);
    }
}


export { CreateCatoryController }