{/* login 
    1. generate token berdasarkan identifier encrypt
    2. */}

{/* get-user detail */}

const express = require('express');
const router = express.Router();
const {
  getUserDetail,
  updateUserDetail,
  deleteUserDetail,
  getUserDetailById,
  getUserDetailByEmail,
  getUserDetailByPhone,
  getUserDetailByUsername,
} = require('../controllerS/userController');

router.get('/', getUserDetail);
router.get('/:id', getUserDetailById);
router.put('/:id', updateUserDetail);
router.delete('/:id', deleteUserDetail);
router.get('/email/:email', getUserDetailByEmail);
router.get('/phone/:phone', getUserDetailByPhone);
router.get('/username/:username', getUserDetailByUsername);

module.exports = router;

