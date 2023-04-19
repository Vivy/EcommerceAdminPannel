import Layout from '@/components/Layout'
import axios from 'axios';
import { useRouter } from 'next/router'
import { useEffect } from 'react';

const EditProductPage = () => {
  const router = useRouter();
  const { id } = router.query

  useEffect(() => {
    if (!id) { return }
    axios.get('/api/products?id=' + id).then(response => {
      console.log(response.data)
    })
  }, [id])

  return (
    <Layout>
      Edit product form here
    </Layout>
  )
}

export default EditProductPage
