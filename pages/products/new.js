import Layout from '@/components/Layout'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';

const New = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [goToProducts, setGoToProducts] = useState(false)
  const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { title, description, price };
    await axios.post('/api/products', data)
    setGoToProducts(true)
  }
  if (goToProducts) {
    router.push('/products')
  }
  return (
    <Layout>
      <form onSubmit={handleSubmit}>

        <h1 >New Product</h1>
        <label>Product name</label>
        <input type='text' placeholder='product name' value={title} onChange={e => setTitle(e.target.value)} />
        <label>Description</label>
        <textarea placeholder='description' value={description} onChange={e => setDescription(e.target.value)}></textarea>
        <label>Price (in USD)</label>
        <input type='number' placeholder='price' value={price} onChange={e => setPrice(e.target.value)} />
        <button className='btn-primary' type='submit'>Save</button>
      </form>
    </Layout>
  )
}

export default New
