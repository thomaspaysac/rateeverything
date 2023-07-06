import {React, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getArtistByID } from '../../functions';

const EditHistoryArtist = () => {
  const [artistHistory, setArtistHistory] = useState();

  const urlParams = useParams();

  const fetchData = async () => {
    const data = await getArtistByID(+urlParams.id);
    setArtistHistory(data.editHistory);
  }

  const displayHistory = () => {
    if (!artistHistory) {
      return null;
    } else {
      return (
        <div>
          {
            artistHistory.toReversed().map((el, i) => {
              return (
                <div className='edit-history_item' key={`history-item-${i}`}>
                  <div>Edit by: <span className="bolded">{el.author}</span></div>
                  <div>{el.date}</div>
                  <div>
                    <ul><span className="bolded">Changes:</span>
                      {
                        el.changes.map((el, i) => {
                          return <li key={`change-${i}`}>{el}</li>
                        })
                      }
                    </ul>
                    
                    </div>
                </div>
              )
            })
          }
        </div>
      )
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className='content-page'>
      <div className='content-wrapper'>
        <div className="section-header bolded">Artist updates history</div>
        {displayHistory()}
      </div>
    </div>
  );
}

export default EditHistoryArtist;
