import { createApp } from './app';
import { connectDB } from './config/db';
import { env } from './config/env';

(async () => {
  await connectDB();

  const app = createApp();
  app.listen(env.PORT, () => {
    console.log(`🚀 TalentHub API running on port ${env.PORT}`);
  });
})();
