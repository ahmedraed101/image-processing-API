import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('testing the images api endpoints', () => {
    it('not providing an imagename parameter returns -> (400)', async () => {
        await request.get('/images').expect(400);
    });

    it("providing an imagename of image that doesn't exists gives -> (404)", async () => {
        await request.get('/images?imagename=four').expect(404);
    });

    it('providing an imagename parameter of an existing image with no width and height gives -> (400)', async () => {
        await request.get('/images?imagename=one').expect(400);
    });

    it('providing an imagename, width, and height parameters gives -> (200)', async () => {
        await request
            .get('/images?imagename=one&width=120&height=320')
            .expect(200);
    });
});
