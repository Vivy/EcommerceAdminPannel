import Layout from '@/components/Layout'
import Link from 'next/link'

const Products = () => {
  return (
    <Layout>
      <Link className='bg-blue-900 text-white py-1 px-2' href={'/products/new'}> Add new product </Link>
    </Layout>
  )
}

export default Products