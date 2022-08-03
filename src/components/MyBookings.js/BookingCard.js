import React from 'react'
import { TbReplace } from 'react-icons/tb'

const BookingCard = (props) => {
  const { to, from, bookingCategory, passangerName } = props?.data
  let bookingCatName, bookingCatPrice
  for (let cat in bookingCategory) {
    bookingCatName = cat
    bookingCatPrice = bookingCategory[cat]
  }
  return (
    <div className='booking_card'>
      <div className='booking_card--destination'>
        <h3>
          <span className='destination-icon'>
            <TbReplace />
          </span>
          {from} - {to}
        </h3>
      </div>
      <div className='booking_card--price'>
        <p>
          INR {bookingCatPrice} <span>( {bookingCatName} )</span>
        </p>
      </div>
      <div className='booking_card--children-data'>{passangerName}</div>
    </div>
  )
}

export default BookingCard
