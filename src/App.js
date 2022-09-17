import React, { useEffect, useState } from 'react';

import './App.css'

function App() {
  let [data, setData] = useState([]);

  const getMeta = async () => {
    var metaData = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo`).then((response) => {
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json()
    })
    setData(metaData)
  }
  useEffect(() => {
    if (data.length === 0) {
      getMeta()
    }
  }, [data]);
  return (
    <section className="App">
          {
            data.length !== 0 ?
              <>                
                  {
                    Object.keys(data).map((item, ind) => {
                      return (<>
                        {
                          ind === 0 ? 
                            <div>
                              {
                                Object.keys(data[item]).map((i) => {
                                  return (<h3>{i} :- {data[item][i]}</h3>)
                                })
                              }
                            </div>                           
                          : <table>                         
                              {
                                Object.keys(data[item]).map((i, index) => {            
                                  return (<>
                                    {  
                                      index === 0 ? 
                                      <thead>
                                          <tr>
                                            <th>DateTime</th>
                                            {
                                              Object.keys(data[item][i]).map((row) => {
                                                return (<th>{row.split(" ")[1]}</th>)
                                              })
                                            }
                                          </tr>
                                      </thead> : '' 
                                    }
                                    <tbody>
                                      <tr>
                                        <td>{i}</td>
                                        {
                                          Object.keys(data[item][i]).map((row) => {
                                            return (<td>{data[item][i][row]}</td>)
                                          })
                                        }
                                      </tr>
                                    </tbody> 
                                  </>
                                  )
                                })
                              } 
                          </table>
                        }
                      </>)
                    })
                  }
              </>
              : <div>Loading</div>
          }
    </section>
  );
}

export default App;
