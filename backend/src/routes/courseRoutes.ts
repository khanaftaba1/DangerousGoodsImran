import { Router } from 'express';
import { getCourses, getCourseBySlug } from '../controllers/courseController';

const router = Router();

router.get('/', getCourses);
router.get('/:slug', getCourseBySlug);

export default router;
