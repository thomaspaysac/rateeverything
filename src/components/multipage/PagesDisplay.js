import React from 'react';

const PagesDisplay = ({items, range, loadPage}) => {
  if (items) {
    // Split ratings in n pages of 'range' items
    let pagesNumber;
    if (items.length % range === 0) {
      pagesNumber = items.length / range;
    } else {
      // Takes care of odd numbers + smaller items than range
      pagesNumber = Math.floor(items.length / range) + 1;
    }
    const pagesArray = Array(pagesNumber).fill('');
    
    return (
      pagesArray.map((el, i) => {
        return (
          <div key={`page-${i+1}`} className='page-number' onClick={() => loadPage(i, range)} >
            {i + 1}
          </div>
        )
      })
    )
  }
}

export default PagesDisplay;
