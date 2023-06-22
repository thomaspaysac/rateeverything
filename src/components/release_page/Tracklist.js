import {React, useEffect, useState} from 'react';

const Tracklist = (props) => {
  return (
    <div className='release_tracklist'>
      <h2 className='component-title'>Track listing</h2>
      <div className='release_tracklist-table'>
        <table>
          <tbody>
            {
              props.tracks.map((el) => {
                return (
                  <tr key={el.title} className='tracklist-row'>
                    <td className='tracklist-number'>{el.number}</td>
                    <td className='tracklist-data'><span className='tracklist_track-title'>{el.title}</span> <span className='tracklist_track-time'>{el.time}</span></td>
                  </tr>
                )
              })
            }
            <tr className='tracklist-row' >
              <td></td>
              <td id='release_total-time'>Total length: {props.totalTime}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
    </div>
  );
}

export default Tracklist;
