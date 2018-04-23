import * as Router from 'koa-router'
import filesRouter from './files'
const router = new Router()

router.use(filesRouter.routes()).use(filesRouter.allowedMethods())
router.get('/', (ctx, next) => {
  ctx.body = 'hel'
})

export default router
