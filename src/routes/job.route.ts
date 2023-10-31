import express from 'express';
import { jobController } from 'controllers';
import { validate } from 'middlewares';
import { createJobSchema, updateJobSchema } from 'schemas';


const router = express.Router();

router.get('/', jobController.getJobs);
router.post('/', validate(createJobSchema), jobController.createJob);
router.get('/:id', jobController.getJobById);
router.put('/:id', validate(updateJobSchema), jobController.updateJobById);
router.delete('/:id', jobController.deleteJobById);

export default router;
