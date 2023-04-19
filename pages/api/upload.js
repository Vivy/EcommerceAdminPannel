import multiparty from 'multiparty'

const handle = async (req, res) => {
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
