'use strict';

import express from 'express';
import controller from './search.controller';
var router = express.Router();

// main search endpoint
router.get('/', controller.index);

//  force SearchIndex init
router.get('/init', controller.init);

export default router;