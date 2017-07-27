import * as express from 'express';
import getFeed from '../feed-parser';

export const apiRouter = express.Router();

apiRouter.use((req, res, next) => {
    next();
});

apiRouter.get('/', (req, res) => {
    res.send('Api Home');
});

apiRouter.get('/feed', (req, res) => {
    let feed = getFeed('http://feeds.bbci.co.uk/news/technology/rss.xml')
    res.send('Api Feed');
});