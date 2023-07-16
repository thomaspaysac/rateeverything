import React from 'react';

const PagesDisplay = ({items, range}) => {

  //

  if (items) {
    const pagesNumber = items.length / range;
    const pagesArray = Array(pagesNumber).fill('');
    // Consider odd numbers + smaller items than range

    return (
      pagesArray.map((el, i) => {
        return (
          <div>
            {i + 1}
          </div>
        )
      })
    )
  }
}

export default PagesDisplay;
