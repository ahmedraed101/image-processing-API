import resizeImage from '../../utils/process-images';
import { existsSync, unlinkSync } from 'fs';
import path from 'path';

const [imageName, width, height] = ['one', 250, 200];
const outputFile = path.resolve(
    path.join('assets', 'thumb', `${imageName}_${width}_${height}.jpg`)
);

// remove test image if it exists
if (existsSync(outputFile)) {
    unlinkSync(outputFile);
}

(async (): Promise<void> => {
    await resizeImage(imageName, width, height, outputFile);
})();

describe('testing the image processing function', async () => {
    it('should find the resized image and return true', () => {
        expect(existsSync(outputFile)).toBeTruthy();
    });
});
