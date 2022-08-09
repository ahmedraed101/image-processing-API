import path from 'path';
import sharp from 'sharp';

const resizeImage = async (
    imageTitle: string,
    width: number,
    height: number,
    outPath: string
): Promise<void> => {
    await sharp(path.join('assets', 'full', `${imageTitle}.jpg`))
        .resize(width, height)
        .toFile(outPath);
};

export default resizeImage;
