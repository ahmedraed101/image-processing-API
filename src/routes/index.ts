import express from 'express';
import images from './api/images';

const routes = express.Router();

routes.get('/', (req: express.Request, res: express.Response) => {
    res.send(
        'Hello to the image processing api visit api/images?imagename="imagename" to see the image and add width and height paramter to resize the photo'
    );
});

routes.use('/images', images);

export default routes;
