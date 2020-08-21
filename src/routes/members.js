const express = require('express');
const router = express.Router();

const Member = require('../models/member');

router.get('/', async (req, res) => {
	try {
		const members = await Member.find();

		const count = members.length;

		res.json({
			members,
			message: `${count} ${count == 1 ? 'member was' : 'members were'} found!`,
			numOfMembers: members.length
		});
	} catch(err) {
		res.send(`Error: ${err}`);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const member = await Member.findById(req.params.id);
		res.json(member);
	} catch (err) {
		res.send(`Error: ${err}`);
	}
});

router.post('/', async (req, res) => {
	const member = new Member({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		group: req.body.group
	});

	try {
		const newMember = member.save();
		res.json(newMember);
	} catch(err) {
		res.send(`Error: ${err}`);
	}
});

router.patch('/updateGroup/:id', async (req, res) => {
	try {
		const member = await Member.findById(req.params.id);
		member.group = req.body.group;
		const updatedMember = member.save();
		res.json(updatedMember);
	} catch(err) {
		res.send(`Error: ${err}`);
	}
});

router.delete('/:id', (req, res) => {
	try {
		const id = req.params.id;

	  Member.findByIdAndRemove(id)
	    .then(data => {
	      if (!data) {
	        res.status(404).send({
	          message: `Cannot delete Member with id=${id}. Maybe Member was not found!`
	        });
	      } else {
	        res.send({
	          message: "Member was deleted successfully!"
	        });
	      }
	    })
	    .catch(err => {
	      res.status(500).send({
	        message: "Could not delete Member with id=" + id
	      });
	    });
	} catch(err) {
		res.send(`Error: ${err}`);
	}
});

router.delete('/', (req, res) => {
	Member.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
});

module.exports = router;
