import * as http from 'http';
import * as cors from 'cors';
import * as express from 'express';
import * as compression from 'compression';
import { config } from './config';
import { initRoutes } from './route';
import { IUserDto } from './auth/auth.dto';
import { morganMiddleware } from './core/morgan.middleware';
import { limiterMiddleware } from './core/limiter.middleware';

declare global {
  namespace Express {
    interface Request {
      auth?: IUserDto;
    }
  }
}

export class Server {
  private readonly app: express.Express;
  private readonly port: number = config.server.port;

  constructor() {
    this.app = express();
    this.applyMiddleware();
  }

  private applyMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(compression());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morganMiddleware());
    this.app.use(limiterMiddleware());

    // initial routes
    initRoutes(this.app);
  }

  async start() {
    const httpServer = http.createServer(this.app);

    httpServer.listen(this.port, () =>
      console.info(
        `HTTP Server listening on http://${config.server.host}:${this.port}`
      )
    );
  }
}
