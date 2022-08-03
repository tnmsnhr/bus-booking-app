import React from 'react'

const CreateBusRoute = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className='create-bus-route'>
      <div className='create-bus-route--heading'>
        <h4>Creat Route for Bus</h4>
      </div>
      <div className='create-bus-route--form-area'>
        <form onSubmit={handleSubmit}>
          <div className='input_group--horizontals'>
            <div className='input_group'>
              <label>From</label>
              <input
                type='text'
                placeholder='Enter starting point'
                name='from'
                //   onChange={handleChange}
                required
                minLength={3}
              />
            </div>
            <div className='input_group'>
              <label>To</label>
              <input
                type='text'
                placeholder='Enter ending point'
                name='to'
                //   onChange={handleChange}
                required
                minLength={3}
              />
            </div>
            <div className='input_group--horizontals duration-input'>
              <div className='input_group'>
                <label>Hour</label>
                <input
                  type='number'
                  name='hour'
                  //   onChange={handleChange}
                  required
                  maxLength={2}
                  minLength={2}
                  min={0}
                  max={12}
                  defaultValue={0}
                />
              </div>
              <div className='input_group'>
                <label>Minute</label>
                <input
                  type='number'
                  name='minute'
                  //   onChange={handleChange}
                  required
                  maxLength={2}
                  minLength={2}
                  min={0}
                  max={60}
                  defaultValue={0}
                />
              </div>
            </div>
          </div>

          <div className='input_group--horizontals'>
            <div className='input_group'>
              <label>Bus Model</label>
              <input
                type='text'
                placeholder='Enter bus model'
                name='brandName'
                //   onChange={handleChange}
                minLength={3}
              />
            </div>
            <div className='input_group'>
              <label>Bus Number</label>
              <input
                type='text'
                placeholder='Enter Bus Number'
                name='busNumber'
                //   onChange={handleChange}
                minLength={3}
              />
            </div>
            <div className='input_group'>
              <label>Seat Capacity</label>
              <input
                type='number'
                name='seatCapacity'
                required
                //   onChange={handleChange}
                minLength={3}
                min={10}
                max={30}
                defaultValue={30}
              />
            </div>
            <div className='input_group'>
              <label>Total Stopped</label>
              <input
                type='number'
                name='totalStopped'
                required
                //   onChange={handleChange}
                minLength={3}
                min={0}
                max={10}
                defaultValue={0}
              />
            </div>
          </div>

          <div className='input_group--horizontals'>
            <div className='input_group'>
              <label>Economy Price</label>
              <input
                type='number'
                placeholder='Enter Economy Price'
                name='economy'
                //   onChange={handleChange}
                minLength={3}
                required
              />
            </div>

            <div className='input_group'>
              <label>Premium Price</label>
              <input
                type='number'
                placeholder='Enter Premium Price'
                name='premium'
                //   onChange={handleChange}
                minLength={3}
                required
              />
            </div>

            <div className='input_group'>
              <label>Economy Luxury</label>
              <input
                type='number'
                placeholder='Enter Luxury Price'
                name='luxury'
                //   onChange={handleChange}
                minLength={3}
                required
              />
            </div>
          </div>
          <div className='input_group--horizontals'>
            <h4>Amenities provided:</h4>
            <div className='checkbox-container--area'>
              <label className='checkbox-container'>
                Wifi
                <input type='checkbox' />
                <span className='checkmark'></span>
              </label>
              <label className='checkbox-container'>
                TV
                <input type='checkbox' />
                <span className='checkmark'></span>
              </label>
              <label className='checkbox-container'>
                WASHROOM
                <input type='checkbox' />
                <span className='checkmark'></span>
              </label>
              <label className='checkbox-container'>
                Food
                <input type='checkbox' />
                <span className='checkmark'></span>
              </label>
            </div>
          </div>
          <div>
            <button className='btn btn-blue' type='submit'>
              Creat Route
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateBusRoute
