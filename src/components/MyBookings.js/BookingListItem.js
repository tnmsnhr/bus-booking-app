import React from 'react'
import { TbCircleCheck } from 'react-icons/tb'

const BookingListItem = (props) => {
  const { from, to, passangerName, bookingCategory, date } = props?.data

  let bookingCatName, bookingCatPrice
  for (let cat in bookingCategory) {
    bookingCatName = cat
    bookingCatPrice = bookingCategory[cat]
  }

  return (
    <div className='booking-list'>
      <div className='booking-list--passanger-name'>
        <h4>
          {/* <span className='booking-list--icon'>
            <TbCircleCheck />
          </span> */}
          {passangerName}
        </h4>
      </div>
      <div className='booking-list--date'>{date}</div>
      <div className='booking-list--destination'>
        <h5>
          {from} - {to}
        </h5>
      </div>
      <div className='booking-list--category'>
        <p>{bookingCatName}</p>
        <div className='booking-list--price'>
          <p>INR {bookingCatPrice}</p>
        </div>
      </div>
    </div>
  )
}

export default BookingListItem
