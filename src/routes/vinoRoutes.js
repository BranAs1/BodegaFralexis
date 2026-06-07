import { Router } from 'express';
import { VinoController } from '../controllers/VinoController.js';

const router = Router();

router.get('/', VinoController.getAll);
router.get('/:id', VinoController.getById);
router.post('/', VinoController.create);
router.put('/:id', VinoController.update);
router.delete('/:id', VinoController.delete);

export default router;
