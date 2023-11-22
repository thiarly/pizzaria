import {Request, Response} from "express";
import { RemoveItemService } from "../../services/order/RemoveItemService";


class RemoveItemController{
    async handle(request: Request, response: Response){
        const item_id = request.query.item_id as string;

        const removeItem = new RemoveItemService();

        const item = await removeItem.execute({
            item_id
        });

        return response.json(item);
    }
}

export { RemoveItemController }