import {Request, Response} from "express";
import { ListOrderService } from "../../services/order/ListOrderService";


class ListOrderController{
    async handle(request: Request, response: Response){
        const listOrderService = new ListOrderService();

        const orders = await listOrderService.execute();

        return response.json(orders);
    }
}

export { ListOrderController }