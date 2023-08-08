import React from 'react';

const LatestReleases = ({releases}) => {
  return (
    <div>
      <h2 className='homepage_section-header' onClick={() => console.log(releases)}>Latest added releases</h2>
    </div>
  );
}

export default LatestReleases;
