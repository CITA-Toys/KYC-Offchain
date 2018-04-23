import * as Sequelize from 'sequelize'
import service, { HashedFile } from '../service'
class Files {
  public getFile(hash: string) {
    return HashedFile.findOne({
      where: {
        hash,
      },
    })
      .then(file => ({
        data: file,
      }))
      .catch(err => ({
        error: {
          code: -1,
          message: err.errors[0].message,
        },
      }))
  }

  public addFile(name: string, hash: string, url: string) {
    return service
      .sync()
      .then(() =>
        HashedFile.create({
          name,
          hash,
          url,
        }),
      )
      .then(file => {
        return {
          data: 1,
        }
      })
      .catch(err => {
        return {
          error: {
            code: -1,
            message: err.errors[0].message,
          },
        }
      })
  }
}

export default new Files()
