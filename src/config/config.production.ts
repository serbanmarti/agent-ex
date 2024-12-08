import { get } from 'env-var';

export default {
  GLOBAL: {
    NODE_ENV: get('NODE_ENV').default('production').asString(),
  },
  NEST: {
    PORT: get('PORT').default('3000').asPortNumber(),
  },
  OPENAI: {
    KEY: get('OPENAI_API_KEY').required().asString(),
  },
};
