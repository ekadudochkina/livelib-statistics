const Cheerio = require('cheerio');
const BASE_URL = 'https://www.livelib.ru';



exports.getData =  (userName, pageName) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
        }
    };
    let url = BASE_URL + '/reader/' + userName + '/' + pageName + '/listview/biglist';

    async function paginated_fetch(
        url, options,
        page = 1
    ) {
        try {
            const response = await fetch(url, options);
            let htmlContent = await response.text();
            let bookArray = [];
            // console.log(htmlContent);

            console.log('Get html');
            let currentDate = undefined
            let $ = Cheerio.load(htmlContent, null, false)


            $(".book-item-manage").each(function (i, node) {
                let book = parseToBook($, node, currentDate);
                bookArray.push(book);
            });

            if ($("#a-list-page-next-"+page).length > 0) {
                page++;
                url = BASE_URL + '/reader/' + userName + '/' + pageName + '/listview/biglist/~'+page;

                let temp_data = await paginated_fetch(url, options, page);
                bookArray = bookArray.concat(temp_data);
            }


            return bookArray;


        } catch (err) {
            return console.error(err);
        }
    }


    return paginated_fetch(url, options).then(data => {
        return data;
    });







    // return fetch(url, options)
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.text();
    //     })
    //     .then(htmlContent => {
    //         console.log('Get html');
    //         let currentDate = undefined
    //         let $ = Cheerio.load(htmlContent, null, false)
    //         const bookArray = []
    //         $(".book-item-manage").each(function (i, node) {
    //             let book = parseToBook($, node, currentDate);
    //             bookArray.push(book);
    //         });
    //
    //
    //         return bookArray;
    //
    //     })
    //     .catch(error => {
    //         console.error('Fetch error:', error);
    //     });

};


/**
 *
 * @param $
 * @param node
 * @param currentDate
 * @returns {{}}
 */
function parseToBook($, node, currentDate) {
    let book = {}

    let bookTitleNode = $('a.brow-book-name', node)[0];
    book.title = bookTitleNode.firstChild.nodeValue;
    book.bookHref = BASE_URL + bookTitleNode.attribs.href;
    book.coverHref = $('img', node)[0].attribs.src;
    book.annotation = $('[id*="full"]', node).text().split('\n').map(line => line.trim()).join('\n');
    book.readDate = currentDate;


    book.rating = {}
    $('span.rating-value', node).each((index, spanNode) => {
        if (index == 0) {
            book.rating.overall = spanNode.firstChild.nodeValue
        } else if (index == 1) {
            book.rating.user = spanNode.firstChild.nodeValue
        }
    })


    book.authors = []
    $('a[class*="brow-book-author"]', node).each((index, aNode) => {
        book.authors.push({name: aNode.firstChild.nodeValue, href: BASE_URL + aNode.attribs.href})
    })


    book.genres = []
    $('a.label-genre', node).each((index, aNode) => {
        let lines = aNode.firstChild.nodeValue.split(/\xa0/) // символ неразыврного пробела для строк "№10 в жанре X"
        if (lines.length == 3) {
            book.genres.push({topPlace: lines[0], name: lines[2], href: BASE_URL + aNode.attribs.href})
        } else {
            book.genres.push({name: lines[0], href: BASE_URL + aNode.attribs.href})
        }
    })


    book.stats = {}
    $('div.brow-stats > a', node).each((index, aNode) => {
        let value = parseInt(aNode.lastChild.nodeValue)
        if (index == 0) {
            book.stats.loved = value
        } else if (index == 1) {
            book.stats.reviews = value
        } else if (index == 2) {
            book.stats.quotes = value
        } else if (index == 3) {
            book.stats.read = value
        }
    })


    book.details = {}
    $('tr', node).each((index, trNode) => {
        let [key, value] = $(trNode).text().split(':')
        key = key.trim().toLowerCase()
        if (key.includes('isbn')) {
            book.details.isbn = value
        } else if (key.includes('год')) {
            book.details.year = value
        } else if (key.includes('издатель')) {
            book.details.publishers = value
        } else if (key.includes('серия')) {
            book.details.series = value
        } else if (key.includes('язык')) {
            book.details.language = value
        }
    })


    return book;
}