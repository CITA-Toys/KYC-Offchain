import * as fs from 'fs'
import * as path from 'path'
import fileService from '../contexts/files'
class FileController {
  /**
   * @function index
   * @description list files
   * @param ctx
   * @param next
   */
  async index(ctx, next) {
    await ctx.render('files/index', {
      files: ['file'],
    })
  }

  async new(ctx, next) {
    await ctx.render('files/new')
  }

  /**
   * @function show
   * @description list a single file
   * @param {any} ctx
   * @param {any} next
   * @memberof FileController
   */
  async show(ctx, next) {
    const { hash } = ctx.params
    const result = await fileService.getFile(hash)
    await ctx.render('files/show', {
      ...result,
    })
  }

  async create(ctx, next) {
    const msgs = {
      name: '',
      file: null,
      error: '',
      info: '',
    }
    const { name } = ctx.request.body.fields
    const { file } = ctx.request.body.files

    console.log(file)

    if (!name) {
      msgs.error = 'Name required'
      msgs.file = file
    } else if (!file || !file.size) {
      msgs.error = 'File required'
      msgs.name = name
    } else {
      const pathSegs = file.path.split('/')
      const url = pathSegs[pathSegs.length - 1]
      // TODO: Hash
      const hash = url

      const res = await fileService.addFile(name, hash, url)
      if (res.error) {
        msgs.error = res.error.message
      } else {
        msgs.info = `File ${name} Uploaded to ${url} with hash ${hash}`
      }
    }
    ctx.body = msgs
  }

  async download(ctx, next) {
    const { hash } = ctx.params
    const result = await fileService.getFile(hash)
    if (result.error) {
      return (ctx.body = {
        error: result.error,
      })
    }
    if (result.data) {
      const filePath = path.join(__dirname, '../../uploads/', result.data.url)
      try {
        fs.accessSync(filePath)
      } catch (err) {
        return (ctx.body = {
          code: -1,
          message: err.message,
        })
      }

      const stream = fs.createReadStream(filePath)
      return (ctx.body = stream)
    }
    return (ctx.body = {
      error: {
        code: -1,
        message: 'File not found',
      },
    })
  }
}

export default new FileController()
