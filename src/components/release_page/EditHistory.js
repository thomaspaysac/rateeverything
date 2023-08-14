import {React, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getReleaseByID } from '../../functions';

const EditHistory = () => {
  const [releaseHistory, setReleaseHistory] = useState();

  const urlParams = useParams();

  const fetchData = async () => {
    const data = await getReleaseByID(+urlParams.id);
    setReleaseHistory(data.editHistory);
  }

  const displayHistory = () => {
    if (!releaseHistory) {
      return null;
    } else {
      return (
        <div>
          {
            releaseHistory.toReversed().map((el, i) => {
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
        <div className="section-header bolded">Release edit history</div>
        {displayHistory()}
      </div>
    </div>
  );
}

export default EditHistory;
