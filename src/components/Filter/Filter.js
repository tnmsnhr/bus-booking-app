import React, { useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'

const Filter = ({ data, handleFilter }) => {
  const [currentFilter, setCurrentFilter] = useState('')

  const handleClick = (e) => {
    const newData = [...data]
    switch (e.target.id) {
      case 'name':
        newData.sort((a, b) => {
          //asc
          if (currentFilter !== 'name')
            return b.passangerName.localeCompare(a.passangerName)
          //dsc
          if (currentFilter === 'name')
            return a.passangerName.localeCompare(b.passangerName)
        })
        if (currentFilter === 'name') {
          handleFilter(newData, '')
          setCurrentFilter('')
        } else {
          handleFilter(newData, 'name')
          setCurrentFilter('name')
        }
        break
      case 'price':
        newData.sort((a, b) => {
          const aKey = Object.keys(a.bookingCategory)
          const bKey = Object.keys(b.bookingCategory)
          //desc order
          if (
            +a.bookingCategory[aKey[0]] > +b.bookingCategory[bKey[0]] &&
            currentFilter !== 'price'
          )
            return -1

          //asc order

          if (
            +a.bookingCategory[aKey[0]] < +b.bookingCategory[bKey[0]] &&
            currentFilter === 'price'
          )
            return -1
        })
        if (currentFilter === 'price') {
          handleFilter(newData, '')
          setCurrentFilter('')
        } else {
          handleFilter(newData, 'price')
          setCurrentFilter('price')
        }

        break
      case 'date':
        newData.sort((a, b) => {
          //dsc
          if (
            Date.parse(a.date) > Date.parse(b.date) &&
            currentFilter !== 'date'
          )
            return -1

          //asc
          if (
            Date.parse(a.date) < Date.parse(b.date) &&
            currentFilter === 'date'
          )
            return -1
        })
        if (currentFilter === 'date') {
          handleFilter(newData, '')
          setCurrentFilter('')
        } else {
          handleFilter(newData, 'date')
          setCurrentFilter('date')
        }
        break
      default:
    }
  }
  return (
    <div className='filter'>
      <div className='filter--container'>
        <button className='filter--name filter-item' onClick={handleClick}>
          <p id='name'>
            Name
            <span className='filter-icon'>
              {currentFilter === 'name' ? (
                <MdKeyboardArrowUp />
              ) : (
                <MdKeyboardArrowDown />
              )}
            </span>
          </p>
        </button>
        <button className='filter--date filter-item' onClick={handleClick}>
          <p id='date'>
            Date
            <span className='filter-icon'>
              {currentFilter === 'date' ? (
                <MdKeyboardArrowUp />
              ) : (
                <MdKeyboardArrowDown />
              )}
            </span>
          </p>
        </button>
        <button className='filter--price filter-item' onClick={handleClick}>
          <p id='price'>
            Price
            <span className='filter-icon'>
              {currentFilter === 'price' ? (
                <MdKeyboardArrowUp />
              ) : (
                <MdKeyboardArrowDown />
              )}
            </span>
          </p>
        </button>
      </div>
    </div>
  )
}

export default Filter
