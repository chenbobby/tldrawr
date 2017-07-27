import * as FeedParser from 'feedparser';
import * as Request from 'request';

export default function getFeed(feedUrl: string) {

    const req = createFeedRequest(feedUrl);
    const feedParser = createFeedParser();

    req.on('response', (res) => {
        if (res.statusCode != 200) {
            return console.log('Bad Status Code');
        }
        res.pipe(feedParser)
    });

    feedParser.on('data', (data: any) => {
        console.log('-'.repeat(150) + 'DATA');
        //console.log(data);
        console.log(data.meta['title']);
        console.log(data['rss:title']['#']);
        console.log(data['rss:link']['#']);
        console.log(data['rss:pubdate']['#']);
    });
}


// Feed Request Helper
function createFeedRequest(feedUrl: string): Request.Request {
    const options = {
        timeout: 10000,
        pool: false,
        accept: ['text/html', 'application/xhtml+xml'],
    }
    const req = Request(feedUrl, options)
    req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36')
    req.on('error', (err: Error) => console.log(err));

    return req;
}


// Feed Parser Helper
function createFeedParser(): FeedParser {
    const options = {
        normalize: true,
        addmeta: true
    }
    const feedParser = new FeedParser(options);
    feedParser.on('error', (err: Error) => console.log(err));
    feedParser.on('end', () => console.log('End of Read'));

    return feedParser;

}
