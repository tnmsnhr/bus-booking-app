import React, { useEffect, useState } from 'react'
import { dateFormatter } from '../../util/dateFormatter'

const SearchResult = (props) => {
  const { busDetails, onBusBook } = props
  const [categorySelected, setCategorySelected] = useState({})

  useEffect(() => {
    setCategorySelected({ economy: busDetails?.availableCategory?.economy })
  }, [props?.busDetails])

  const handleCategorySelect = (e) => {
    const value = e.target.innerText.toLowerCase()
    const price = busDetails?.availableCategory[value]
    setCategorySelected({ [e.target.innerText.toLowerCase()]: price })
  }

  const handleBooking = () => {
    const busData = {
      bookingCategory: { ...categorySelected },
      busId: busDetails.id,
      date: dateFormatter(),
      to: busDetails?.to,
      from: busDetails?.from,
      seatNumber: '14F',
    }
    onBusBook(busData)
  }

  return (
    <>
      <div className='search_result--content'>
        <div className='search_result'>
          <section className='search_result--left'>
            <div className='price'>
              <h3>{categorySelected[Object.keys(categorySelected)[0]]} INR</h3>
            </div>
            <div>
              <button
                className='btn book_now-btn btn-blue'
                onClick={handleBooking}
              >
                Book Now
              </button>
            </div>
            <div className='bus_number'>
              <p>{busDetails?.busNumber ? busDetails.busNumber : 'N/A'}</p>
            </div>
          </section>
          <section className='search_result--right'>
            <div className='top_row'>
              <ul className='category_selection'>
                {Object.keys(busDetails?.availableCategory)
                  ?.sort()
                  .map((el, index) => (
                    <li
                      key={index}
                      className={`category_item ${
                        categorySelected[el] ? 'category_item-selected' : ''
                      }`}
                      onClick={handleCategorySelect}
                    >
                      {el}
                    </li>
                  ))}
              </ul>
              <ul className='amenities'>
                {Object.keys(busDetails?.amenities)?.map((el, index) => {
                  return (
                    <li
                      key={index}
                      className={`amenity-item ${
                        busDetails?.amenities[el] &&
                        'amenity-item--not-available'
                      }`}
                    >
                      {el}
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className='mid_row'>
              <div className='destination_guide'>
                <h2>{busDetails?.from}</h2>
                <span className='destination_guide--arrow'></span>
                <h2>{busDetails?.to}</h2>
              </div>
              {/* <div className='duration'>
                <h2 className='duration-box '>
                  {busDetails?.duration?.split(':')[0]}
                  <span>H </span> {busDetails?.duration?.split(':')[1] ?? '00'}
                  <span>M</span>
                </h2>
              </div> */}
            </div>
            <div className='bottom_row'>
              <div className='bottom_row--info'>
                <p>{busDetails?.brandName}</p>
              </div>
              <div className='bottom_row--info'>
                <p>
                  Available seats:{' '}
                  <span>
                    {busDetails?.seatCapacity - busDetails?.seatBooked}
                  </span>
                </p>
              </div>
              <div className='bottom_row--info'>
                <p>
                  Total stop: <span>{busDetails?.totalStopped}</span>
                </p>
              </div>
              <div className='bottom_row--info'>
                <p>
                  Driver's Name: <span>{busDetails?.driverName}</span>
                </p>
              </div>
            </div>
          </section>
        </div>
        <div className='duration'>
          {/* <p className='duration-box'>
            {busDetails?.duration?.split(':')[0]}
            <span>H </span> {busDetails?.duration?.split(':')[1] ?? '00'}
            <span>M</span>
          </p> */}
          <div className='duration-box'>
            <p>
              {busDetails?.duration?.split(':')[0]}
              <span>: </span> {busDetails?.duration?.split(':')[1] ?? '00'}
              <span> hr</span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

// const mapStateToProps = (state) => {
//   return {
//     isLoading: state?.bus?.loading,
//     busDetails: state?.bus?.busDetails,
//     busDataLoaded: state?.bus?.busDataLoaded,
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onBusBook: (busData, passangerData) =>
//       dispatch(bookBus(busData, passangerData)),
//   }
// }

export default SearchResult
