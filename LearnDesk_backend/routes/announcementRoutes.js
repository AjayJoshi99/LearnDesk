const express = require('express');
const router = express.Router();
const { addAnnouncement, getAnnouncementsByClass, deleteAnnouncement } = require('../controller/announcementController');

router.post('/add', addAnnouncement);

router.get('/class/:classCode', getAnnouncementsByClass);

router.delete('/:id', deleteAnnouncement);

module.exports = router;
