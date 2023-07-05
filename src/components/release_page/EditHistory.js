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
            releaseHistory.map((el) => {
              return (
                <div>
                  <div>{el.author}</div>
                  <div>{el.date}</div>
                  <div>
                    {
                      el.changes.map((el) => {
                        return <div>{el}</div>
                      })
                    }
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
        <div className="section-header bolded" onClick={() => console.log(releaseHistory)}>History</div>
        {displayHistory()}
      </div>
    </div>
  );
}

export default EditHistory;
