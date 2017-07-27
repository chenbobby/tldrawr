import * as FeedParser from 'feedparser';
import * as Request from 'request';

export default function getFeed(feedUrl: string) {
    const req = Request(feedUrl, {
        timeout: 10000,
        pool: false
    });

    req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36')
    req.setHeader('accept', 'text/html, application/xhtml+xml');

    const feedParser = new FeedParser({
        normalize: true
    });

    req.on('error', done);
    req.on('response', (res) => {
        if (res.statusCode != 200) {
            return console.log('Bad Status Code');
        }

        res.pipe(feedParser);
    });

    feedParser.on('meta', (data: any) => {
        console.log('*'.repeat(150) + 'META');
        console.log(data);
    });

    feedParser.on('data', (data: any) => {
        console.log('-'.repeat(150) + 'DATA');
        console.log(data);
    });

    feedParser.on('error', done);
    feedParser.on('end', done);


}


function done(err: Error) {
    if (err) {
        console.log(err, err.stack);
    }
}
