import React, { useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { fetchAllCity } from '../../store/actions/cityActions'
import { fetchBusResult } from '../../store/actions/bookingActions'
import InputAutoComplete from '../InputAutoComplete/InputAutoComplete'
import Spinner from '../Spinner/Spinner'
import { debounce } from '../../util/debounce'

const Search = (props) => {
  const [inputData, setInputData] = useState({ from: '', to: '' })
  const [searchFlag, setSearchFlag] = useState({ from: false, to: false })

  useEffect(() => {
    props.onAllCityFetch()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    props.onBusFetch(
      inputData?.from?.toLowerCase(),
      inputData?.to?.toLowerCase()
    )
  }

  const handleChange = (e) => {
    const newData = { ...inputData }

    newData[e.target.name] = e.target.value
    setSearchFlag({ [e.target.name]: true })
    setInputData(newData)
  }

  const setCity = (e, dataSet) => {
    const newData = { ...inputData }
    newData[dataSet] = e.target.innerText
    setInputData(newData)
    setSearchFlag({ from: false, to: false })
  }

  const optimizedFn = useCallback(debounce(handleChange), [])

  return (
    <div className='search_component'>
      <form onSubmit={handleSubmit}>
        <div className='input_group'>
          <label>From:</label>
          <input
            name='from'
            placeholder='type your location..'
            onChange={handleChange}
            value={inputData?.from}
          />
          {searchFlag?.from && inputData?.from !== '' && (
            <InputAutoComplete
              setCity={setCity}
              dataSet={'from'}
              cityData={props.cityDetails}
              typedValue={inputData?.from}
            />
          )}
        </div>
        <div className='input_group'>
          <label>To:</label>
          <input
            name='to'
            placeholder='type your location..'
            value={inputData?.to}
            onChange={handleChange}
          />
          {searchFlag?.to && inputData?.to !== '' && (
            <InputAutoComplete
              setCity={setCity}
              dataSet={'to'}
              typedValue={inputData?.to}
              cityData={props.cityDetails}
            />
          )}
        </div>
        <div className='form_button'>
          {props?.isLoading ? (
            <Spinner />
          ) : (
            <button type='submit' className='btn btn-blue'>
              Search
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    cityDetails: state?.cities?.cityDetails,
    isLoading: state?.cities?.loading,
    busDetails: state?.bus?.busDetails,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBusFetch: (from, to) => dispatch(fetchBusResult(from, to)),
    onAllCityFetch: () => dispatch(fetchAllCity()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
