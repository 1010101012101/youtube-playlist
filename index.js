'use strict';

const got = require('got');
const cheerio = require('cheerio');

const url = 'https://youtube.com/watch?v=';

const tag = {
	name: 'data-title',
	url: 'data-video-id',
	id: 'data-video-id'
};

module.exports = (data, opt) => {
	return got(data).then(res => {
		const $ = cheerio.load(res.body);
		const thumb = $('tr');
		const arr = {playlist: []};
		const holder = tag[opt];

		const def = (cuts, marks) => {
			return cuts === 'url' ? arr.playlist.push(`${url}${marks}`) : arr.playlist.push(marks);
		};

		for (let i = 0; i < thumb.length; i++) {
			const data = thumb.eq(i).attr(holder);
			def(opt, data);
		}
		return {data: arr};
	});
};
