import {Request, Response} from "express";
import { FinishOrderService } from "../../services/order/FinishOrderService";


class FinishOrderController{
    async handle(request: Request, response: Response){
        const { order_id } = request.body;

        const finishOrder = new FinishOrderService();

        const order = await finishOrder.execute({
            order_id
        });

        return response.json(order);
    }
}


export { FinishOrderController }