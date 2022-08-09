import express from 'express';
import { existsSync } from 'fs';
import path from 'path';
import resizeImage from '../../utils/process-images';

const images = express.Router();

images.get('/', (req: express.Request, res: express.Response) => {
    const imageName = req.query.imagename as string;
    const imageWidth = parseInt(req.query.width as string);
    const imageHeight = parseInt(req.query.height as string);
    const originalImagePath = path.resolve(
        path.join('assets', 'full', `${imageName}.jpg`)
    );
    const resizedImagePath = path.resolve(
        path.join(
            'assets',
            'thumb',
            `${imageName}_${imageWidth}_${imageHeight}.jpg`
        )
    );

    try {
        // imagename not provided
        if (imageName === undefined) {
            return res
                .status(400)
                .send("bad request query parameters 'imagename' is required.");
        }
        // if image does't exist
        if (!existsSync(originalImagePath)) {
            return res.status(404).send('image not found');
        }
        // width or height not provided
        if (isNaN(imageWidth) || isNaN(imageHeight)) {
            return res
                .status(400)
                .send(
                    "bad request, query parameters 'width' and 'height' is required 'in numbers'"
                );
        }
        // imageWidth and imageHeight should be greater that zero
        if (imageWidth <= 0 || imageHeight <= 0) {
            return res
                .status(400)
                .send(
                    'Bad request, width and height should be greater than zero'
                );
        }

        // if resized image already exists
        if (existsSync(resizedImagePath)) {
            return res.sendFile(resizedImagePath);
        }

        resizeImage(imageName, imageWidth, imageHeight, resizedImagePath).then(
            () => {
                res.sendFile(resizedImagePath);
            }
        );
    } catch (err) {
        console.log(err);
    }
});

export default images;
