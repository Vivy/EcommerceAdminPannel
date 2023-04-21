import { mongooseConnect } from '@/lib/mongoose'
import multiparty from 'multiparty'
import { isAdminRequest } from './auth/[...nextauth]';

const handle = async (req, res) => {

  await mongooseConnect()
  await isAdminRequest(req, res);
  const form = new multiparty.Form()
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err)
      resolve({ fields, files })
    })
  })
  res.json('ok')

}

export default handle


export const config = {
  api: { bodyParser: false }
}
