import * as Router from 'koa-router'
import controller from '../controllers/files'

const router = new Router({
  prefix: '/files',
})

router.get('/', controller.index)
router.get('/new', controller.new)
router.get('/:hash', controller.show)
router.post('/new', controller.create)
router.get('/download/:hash', controller.download)

export default router
