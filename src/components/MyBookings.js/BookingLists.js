import React, { useState, useEffect } from 'react'
import Filter from '../Filter/Filter'

import BookingListItem from './BookingListItem'

const BookingLists = (props) => {
  const [data, setData] = useState([])

  useEffect(() => {
    setData(props?.data)
  }, [props?.data])
  const handleFilter = (filteredData, filterName) => {
    // filterName !== '' ? setData(filteredData) : setData(props?.data)
    setData(filteredData)
  }
  return (
    <div className='booking-lists'>
      <section className='booking-lists--heading'>Booking results</section>
      <section className='booking-lists--filter'>
        <Filter handleFilter={handleFilter} data={data} />
      </section>
      <section className='booking-lists--area'>
        {data?.map((el, index) => (
          <BookingListItem key={el.id} data={el} index={index + 1} />
        ))}
      </section>
    </div>
  )
}

export default BookingLists
