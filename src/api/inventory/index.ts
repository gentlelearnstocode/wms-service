import { Router } from 'express';
import { deleteInventory, getAllInventories, getInventory, upsert } from './inventory.controller';
import { configService } from '../../configs';

const router = Router();
const api = configService.INVENTORY_API;

router.post(`${api}/create-inventory/`, upsert);
router.get(`${api}/`, getAllInventories).get(`${api}/:id`, getInventory);
router.delete(`${api}/:id`, deleteInventory);

export default router;