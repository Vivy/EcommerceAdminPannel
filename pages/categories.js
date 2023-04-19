import Layout from '@/components/Layout'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Categories = () => {
  const [name, setName] = useState('')
  const [categories, setCategories] = useState([])
  const [parentCategory, setParentCategory] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = () => axios.get('/api/categories').then(result => {
    setCategories(result.data)
  })

  const saveCategory = async (e) => {
    e.preventDefault()
    await axios.post('/api/categories', { name, parentCategory })
    setName('')
    fetchCategories()
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <label>New category name</label>
      <form onSubmit={saveCategory} className='flex gap-1'>
        <input
          type='text'
          onChange={e => setName(e.target.value)}
          value={name}
          placeholder={'Category name'}
          className='mb-0' />
        <select
          className='mb-0'
          onChange={e => setParentCategory(e.target.value)}
          value={parentCategory}
        >
          <option value=''>No parent category</option>
          {categories.length > 0 && categories.map(category => (
            <option value={category._id} key={category._id}>{category.name}</option>
          ))}
        </select>
        <button type='submit' className='btn-primary py-1'>Save</button>
      </form>
      <table className='basic mt-4'>
        <thead>
          <tr>
            <td>Category name</td>
            <td>Parent category</td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 && categories.map(category => (
            <tr key={category.name}>
              <td>{category.name}</td>
              <td>{category?.parent?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default Categories