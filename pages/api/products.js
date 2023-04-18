import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/product';

const handle = async (req, res) => {
  const { method } = req;
  await mongooseConnect()
  if (method == 'POST') {
    const { title, description, price } = req.body;
    const productDoc = await Product.create({
      title, description, price
    })
    res.json(productDoc)
  }
}

export default handle