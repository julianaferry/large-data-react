import React, { useEffect, useRef, useState } from 'react';
import {List, AutoSizer, CellMeasurer, CellMeasurerCache} from 'react-virtualized';
import faker from 'faker';

export default function App() {


  const [user, setUser] = useState([]);
  const [time, setTime] = useState(new Date());

  const cache = useRef(
    new CellMeasurerCache({
      fixWidth: true,
      defaultHeight: 100
    })
  );

  useEffect(() => {
    setUser(
      [...Array(1000).keys()].map((key) => {
        return {
          id: key,
          name: `${faker.name.firstName()} ${faker.name.lastName()}`,
          bio: faker.lorem.lines(Math.random() * 100),
        };
      })
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h1>{time.toISOString()}</h1>

      <div style={{ width: "100%", height: "100vh" }}>
        <AutoSizer>
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              rowHeight={cache.current.rowHeight}
              deferredMeasurementCache={cache.current}
              rowCount={user.length}
              rowRenderer={({ key, index, style, parent }) => {
                const person = user[index];

                return (
                  <CellMeasurer
                    key={key}
                    cache={cache.current}
                    parent={parent}
                    columnIndex={0}
                    rowIndex={index}
                  >
                    <div style={style}>
                      <h2>{person.name}</h2>
                      <p>{person.bio}</p>
                    </div>
                  </CellMeasurer>
                );
              }}
            />
          )}
        </AutoSizer>
      </div>
    </>
  );
}