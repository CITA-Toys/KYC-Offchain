import * as Koa from 'koa'
import * as views from 'koa-views'
import * as path from 'path'
import * as koaBody from 'koa-body'
import * as serve from 'koa-static'
import router from './routes'

require('dotenv').config({
  path: path.join(__dirname, '../config/.env'),
})
const app = new Koa()

app
  .use(serve(path.join(__dirname, './public/')))
  .use(
    views(path.join(__dirname, './views'), {
      extension: 'pug',
    }),
  )
  .use(
    koaBody({
      multipart: true,
      urlencoded: true,
      json: true,
      formidable: {
        uploadDir: path.join(__dirname, process.env.UPLOADS || '../uploads'),
        keepExtensions: true,
      },
    }),
  )

app.use(router.routes()).use(router.allowedMethods())

app.listen(process.env.PORT || 3000)
