import envSchema from 'env-schema';
import zod from 'zod';

const schema = zod.object({
  PORT: zod.number(),
  ENV: zod.string(),
});

type Env = zod.infer<typeof schema>;

const config = envSchema<Env>({
  schema: {
    type: 'object',
    required: [],
    properties: {
      PORT: {
        type: 'number',
        default: 4000,
      },
      ENV: {
        type: 'string',
        default: 'development',
      },
    },
  },
  dotenv: true,
});

export default config;
