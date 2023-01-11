import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { QueryEngineDto } from './engine.dto';

@Injectable()
export class EngineService {
  state = { velocity: {}, blocked: {} };

  switchEngine(queryEngineDto: QueryEngineDto, res: Response) {
    const { id, status } = queryEngineDto;

    const distance = 500000;

    if (status === 'drive') {
      const velocity = this.state.velocity[id];

      if (!velocity) {
        return res
          .status(429)
          .send(
            "Drive already in progress. You can't run drive for the same car twice while it's not stopped.",
          );
      }

      if (this.state.blocked[id]) {
        return res
          .status(404)
          .send(
            "Engine parameters for car with such id was not found in the garage. Have you tried to set engine status to 'started' before?",
          );
      }

      this.state.blocked[id] = true;

      const x = Math.round(distance / velocity);

      if (new Date().getMilliseconds() % 3 === 0) {
        setTimeout(() => {
          delete this.state.velocity[id];
          delete this.state.blocked[id];

          return res
            .status(500)
            .send(
              "Car has been stopped suddenly. It's engine was broken down.",
            );
        }, (Math.random() * x) ^ 0);
      } else {
        setTimeout(() => {
          delete this.state.velocity[id];
          delete this.state.blocked[id];

          return res.status(200).send(JSON.stringify({ success: true }));
        }, x);
      }
    } else {
      const x = (Math.random() * 2000) ^ 0;

      const velocity =
        status === 'started' ? Math.max(50, (Math.random() * 200) ^ 0) : 0;

      if (velocity) {
        this.state.velocity[id] = velocity;
      } else {
        delete this.state.velocity[id];
        delete this.state.blocked[id];
      }

      setTimeout(
        () => res.status(200).send(JSON.stringify({ velocity, distance })),
        x,
      );
    }
  }
}
