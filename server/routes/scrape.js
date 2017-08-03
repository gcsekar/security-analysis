var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var cors = require('cors');

var trend = [];

/* GET home page. */
router.get('/', cors(), function(req, res, next) {
	var trend = [];
	async.waterfall([ function(cb) {
		var options = {
			url : 'http://www.stocktwits.com',
			headers : {
				'cache-control' : 'true'
			}
		}
		request(options, function(err, response, html) {
			if (!err) {
				var $ = cheerio.load(html)
				$(".with-ticker-card").filter(function() {
					data = $(this);
					trend.push(data.data('symbol'))
				});
			}
			cb(null, trend);
		});
	}, function(trend, cb) {
//		console.log(trend);
		res.send(JSON.stringify(trend));
	} ]);

});

router.get('/quotes', cors(), function(req, res, next) {
	async.waterfall([ function(cb) {
//		console.log("Symbols ...");
		var symbols = req.query.symbols;
		symbols = symbols.split('"').join('');
		symbols = symbols.split("'").join('');
		symbols = symbols.split(',');
		cb(null, symbols);
	}, function(symbols, cb) {
//		console.log("Data ...");
//		var trend = [];
		for (item = 0; item < symbols.length; item++) {
			(function() {
				var html = getHtml(symbols[item], function(html) {
					getSecurityData(html, function(nib) {
						trend.push(nib);
					});
				})
			})();
		}
//		console.log(trend);
		cb(null, trend);
	} ], function(err, result) {
//		console.log("Response ...");
		console.log(result);
		res.send(JSON.stringify(result));
		trend = [];
	});
});

function cleanData(data){
	var txt = data.replace("\n", '');
	txt = txt.replace("%)", "")
	txt = txt.split(',').join('');
	return txt
}


function getSecurityData(html, callback) {
	nib = {}
	var $ = cheerio.load(html)
	var data = $(".ticker-header").find(".symbol-box").first().text();
	nib.stock = data.split(",")[0].replace("\n", '').split('\n')[0];
	// console.log("Stock " + nib.stock);
	$(".ticker-header").find(".metric-change").find('.change.positive').filter(
			function() {
				data = $(this);
				var txt = cleanData(data.text());
				nib.stock_trend = "Positive"
				nib.change = parseFloat(txt.split("(")[0]);
				nib.change_pct = parseFloat(txt.split("(")[1])/100;
			});
	$(".ticker-header").find(".metric-change").find('.change.negative').filter(
			function() {
				data = $(this);
				var txt = cleanData(data.text());
				nib.stock_trend = "Negative"
				nib.change = parseFloat(txt.split("(")[0]);
				nib.change_pct = parseFloat(txt.split("(")[1])/100;
			});
	$(".ticker-header").find(".pricing").find(".price").filter(function() {
		data = $(this);
		var txt = cleanData(data.text());
		nib.price = parseFloat(txt);
	});
	$(".current-score").find(".score").find(".bullish").filter(function() {
		data = $(this);
		var txt = cleanData(data.text());
		nib.sentiment_bullish = parseFloat(txt);
	});
	$(".current-score").find(".score").find(".bearish").filter(function() {
		data = $(this);
		var txt = cleanData(data.text());
		nib.sentiment_bearish = parseFloat(txt);
	});
	$(".current-score").find(".messages").filter(function() {
		data = $(this);
		var txt = cleanData(data.text());
		nib.message_count = parseFloat(txt);
	});
	$(".current-score").find(".change-contain").find(".change").filter(
			function() {
				data = $(this);
				var txt = cleanData(data.text());
				nib.message_change_pct = parseFloat(txt)/100;
			});
	$(".ticker-header").find(".pricing").find(".last-updated").filter(
			function() {
				data = $(this);
				var txt = data.text().replace('last updated ', '')
				nib.last_updated = dateFromString(txt);
			});
	callback(nib);
}

function getHtml(item, callback) {
	var _html
	var options = {
		url : 'https://www.stocktwits.com/symbol/' + item,
		headers : {
			'cache-control' : 'true'
		}
	};
	request(options, function(err, response, html) {
		if (!err) {
			callback(html);
		}
	});
}

function callback(err, response, html) {
	if (!err) {
		var $ = cheerio.load(html)
		$(".with-ticker-card").filter(function() {
			data = $(this);
			trend.push(data.data('symbol'))
		});
	}
}

function format(data) {
	var local = [];
	var resp = [];
	local = data.split('\n')
	local.forEach(function(item) {
		if (!item.isEmpty()) {
			resp.push(item);
		}
	})
	return resp.join(',');
}

String.prototype.isEmpty = String.prototype.isEmpty || function() {
	return (this.trim().length == 0);
}

function dateFromString(str) {
	var m = str.match(/(\d+)\/(\d+)\/(\d+),\s+(\d+):(\d+):(\d+)(\s*)/i);
	return Date(+m[1], +m[2], +m[3], +m[4], +m[5]);
}

function getQuotes(symbols, callback) {
	var res_quotes = [];
	var item;
	var nib;
	for (i = 0; i < symbols.length; i++) {
		nib = {};
		item = symbols[i];
		item = item.split('"').join('');
		nib = func(item, function(resp) {
			res_quotes.push(resp)
		});
	}
//	console.log(res_quotes.length);
	callback(res_quotes);
}

function getData(item) {
	var data
	var options = {
		url : 'http://localhost:3000/scrape/quotes?symbols=' + item,
		headers : {
			'cache-control' : 'true'
		}
	}

	request(options, function(err, response, html) {
		if (!err) {
			var $ = cheerio.load(html)
			$(".metric-change").filter(function() {
				data = $(this);
//				console.log(data.text());
			});
		}
	});
	return;
}

module.exports = router;
