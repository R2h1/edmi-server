import Koa, { Context } from 'koa';
import cors from '@koa/cors';
import koaBody from 'koa-body';
import router from './router';

const app = new Koa();

app.use(cors());
app.use(koaBody());
app.use(router.routes());

app.on('error', (err) => {
  console.error(JSON.stringify(err));
});

const msg = 'Hello World';

app.use(async (ctx: Context): Promise<void> => {
  ctx.body = msg;
});

app.listen(7000, () => {
  console.log('\nhttp://127.0.0.1:7000');
});
