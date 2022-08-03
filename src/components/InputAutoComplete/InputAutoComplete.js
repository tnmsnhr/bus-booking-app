import React, { useEffect, useState } from 'react'

const InputAutoComplete = ({ setCity, dataSet, cityData, typedValue }) => {
  const [suggestedCity, setSuggestedCity] = useState([])

  useEffect(() => {
    const cityDataCopy = [...cityData]
    const newSuggestedCity = cityDataCopy?.filter((data) => {
      return data?.cityName?.toLowerCase()?.includes(typedValue.toLowerCase())
    })

    setSuggestedCity(newSuggestedCity)
  }, [typedValue])

  return (
    <div className='auto_complete-container'>
      {suggestedCity?.map((city) => (
        <h4
          className='city_suggestion'
          onClick={(e) => setCity(e, dataSet)}
          key={city?.cityName}
        >
          {city?.cityName}
        </h4>
      ))}
    </div>
  )
}

export default InputAutoComplete
