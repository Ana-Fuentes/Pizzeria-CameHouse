import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Auth E2E - Autenticación y acceso protegido', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('debe rechazar el acceso a /orders sin JWT', async () => {
    await request(app.getHttpServer())
      .get('/orders')
      .expect(401);
  });

  it('debe autenticar al usuario y obtener un JWT', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'gerente@pizzeria.com',
        password: 'admin123',
      })
      .expect(201);

    expect(response.body).toHaveProperty('access_token');
    expect(response.body.access_token).toBeDefined();

    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('email');
    expect(response.body.user.email).toBe('gerente@pizzeria.com');

    accessToken = response.body.access_token;
  });

  it('debe permitir acceder a /orders utilizando el JWT', async () => {
    expect(accessToken).toBeDefined();

    const response = await request(app.getHttpServer())
      .get('/orders')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body).toBeDefined();
  });
});
