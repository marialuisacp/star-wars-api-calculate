const starshipsController = require('../services/starships');

const getTimeByString = (word) => {
	const hours = 1;
	const days = 24 * hours;

	switch (word) {
		case 'hour':
			return hours;
		case 'day':
			return days;
		case 'week':
			return 7 * days;
		case 'month':
			return 30 * days;
		case 'year':
			return 365 * days;
		default:
			return 0;
	}
}

const convertToTimesHour = (stg) => {
	stg = stg.replace(/\s/g, '');

	let word = /[^\d]+/g.exec(stg);
	let count = /[\d]+/g.exec(stg);

	word = Array.isArray(word) && word[0];
	count = Array.isArray(count) && count[0];

	if (word && word[word.length - 1] === 's') {
		word = word.substr(0, (word.length - 1));
	}

	return getTimeByString(word) * count;
}

const getNameImg = (stg) => {
	return stg.replace(/\s/g, '-').toLowerCase();
}

const getTimeByMGLT = (starshipCapacity, totalMGLT) => {
	time = totalMGLT / starshipCapacity;
	return time;
}

exports.getStops = async (req, res) => {
	const MGLT_calculate = req.params.mglt;
	const starships = await starshipsController.getAllStarships();

	if (starships) {
		starships.map((starship) => {
			starship.stops = getTimeByMGLT(starship.MGLT, MGLT_calculate) / convertToTimesHour(starship.consumables);
			starship.img_name = getNameImg(starship.name);
		});
		res.status(200).json(starships);
	} else {
		handleError(res, err.message, 'Failed to get starships.');
	}
};