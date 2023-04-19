import Layout from '@/components/Layout'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Categories = () => {
  const [editedCategory, setEditedCategory] = useState(null)
  const [name, setName] = useState('')
  const [categories, setCategories] = useState([])
  const [parentCategory, setParentCategory] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = () => axios.get('/api/categories').then(result => {
    setCategories(result.data)
  })

  const data = {
    name, parentCategory
  }

  const saveCategory = async (e) => {
    e.preventDefault()
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put('/api/categories', data)
      setEditedCategory(null)
    } else {
      await axios.post('/api/categories', data)
    }
    setName('')
    fetchCategories()
  }

  const editCategory = (category) => {
    setEditedCategory(category)
    setName(category.name)
    setParentCategory(category.parent?._id)
  }
  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit Category ${editedCategory.name}`
          : 'Create new category'}</label>
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
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 && categories.map(category => (
            <tr key={category.name}>
              <td>{category.name}</td>
              <td>{category?.parent?.name}</td>
              <td>
                <button onClick={() => editCategory(category)} className='btn-primary mr-1'>Edit</button>
                <button className='btn-primary'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default Categories
