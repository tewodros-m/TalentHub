import { createApp } from './app';
import { env } from './config/env';

const app = createApp();
app.listen(env.PORT, () => {
  console.log(`🚀 TalentHub API running on port ${env.PORT}`);
});
