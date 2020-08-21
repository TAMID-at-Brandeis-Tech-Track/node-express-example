const mongoose = require('mongoose');
const schema = mongoose.Schema;

const MemberSchema = new schema({
	first_name: String,
	last_name: String,
	group: {
		type: String,
		enum: ['education', 'fund', 'consulting', 'tech'],
		default: 'education'
	}
});

const member = mongoose.model('Member', MemberSchema);

module.exports = member;
