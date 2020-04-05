import React, { useState, useRef } from 'react';
let timer;

function App() {
  const [groups, setGroups] = useState([
    '4ch',
    'SlivCh',
    'NationalGeographic',
    'AutoFromUSA',
    'NASA',
    'Mersedes-Benz',
    'Discovery',
    'Nike',
    'NewsIn',
  ]);
  const [click, setClick] = useState(false);
  const [clickData, setClickData] = useState(null);
  const [error, setError] = useState(false);
  const clientWidth = document.body.clientWidth;
  const clientHeight = document.body.clientHeight;
  const textRef = useRef();

  const handleMouseClick = () => {
    setError(false);
    setClick(true);
    setClickData(textRef.current.getBoundingClientRect());
    timer = setInterval(() => {
      setClickData(textRef.current.getBoundingClientRect());
    }, 100);
  };

  const getHintHeight = () => {
    return groups.length * 27.5;
  };

  const createHintPosition = (data) => {
    const toRightBorder = clientWidth - data.right;
    const toBottomBorder = clientHeight - data.bottom;
    const left = data.left;
    const height = data.height;

    if (left > 200 && toRightBorder > 200 && toBottomBorder > 150) {
      return { y: data.y + 5, x: data.x + 85 };
    }
    if (left < 200 && toRightBorder > 200 && toBottomBorder > 150) {
      return { y: data.y + 5, x: data.x + 85 };
    }
    if (toRightBorder < 200 && left > 200 && toBottomBorder > 150) {
      return { y: data.y + 5, x: data.x - 160 };
    }
    if (
      toBottomBorder < 150 &&
      height + toBottomBorder < clientHeight &&
      toRightBorder > 200
    ) {
      return { y: data.y - getHintHeight(), x: data.x + 85 };
    }
    if (
      toBottomBorder < 150 &&
      height + toBottomBorder < clientHeight &&
      left > 200
    ) {
      return { y: data.y - getHintHeight(), x: data.x - 150 };
    } else {
      setError(true);
    }
  };

  return (
    <div
      className="main"
      onClick={(e) => {
        if (e.target.className === 'main') {
          setClick(false);
          clearInterval(timer);
        }
        if (e.target.className === 'column') {
          setClick(false);
          clearInterval(timer);
        } else {
          return;
        }
      }}
    >
      <div className="column">
        <p className="text" ref={textRef} onClick={handleMouseClick}>
          Groups:{' '}
          {groups.length < 3 ? groups[0] + ' ' + groups[1] : groups.length}
        </p>
      </div>
      {click && error === false ? (
        <div
          className="hint"
          style={
            createHintPosition(clickData)
              ? {
                  top: createHintPosition(clickData).y,
                  left: createHintPosition(clickData).x,
                }
              : console.error('Error in prompt alert!')
          }
        >
          {groups.map((elem) => {
            return (
              <div className="elem" key={elem}>
                {elem}
              </div>
            );
          })}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default App;
