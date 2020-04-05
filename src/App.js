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
  const [position, setPosition] = useState('RightTop');
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

  const getMainJustifyContent = (pos) => {
    if (pos === 'RightTop' || pos === 'RightCenter' || pos === 'RightBottom') {
      return 'flex-end';
    }
    if (pos === 'CentTop' || pos === 'CentCenter' || pos === 'CentBottom') {
      return 'center';
    }
    if (pos === 'LeftTop' || pos === 'LeftCenter' || pos === 'LeftBottom') {
      return 'flex-start';
    } else {
      return 'bla';
    }
  };

  const getColumnJustifyContent = (pos) => {
    if (pos === 'RightTop' || pos === 'CentTop' || pos === 'LeftTop')
      return 'flex-start';
    if (pos === 'RightCenter' || pos === 'CentCenter' || pos === 'LeftCenter')
      return 'center';
    if (pos === 'RightBottom' || pos === 'CentBottom' || pos === 'LeftBottom')
      return 'flex-end';
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

  const handleMainClick = (e) => {
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
  };

  const handleChange = (event) => {
    setPosition(event.target.value);
  };

  return (
    <div
      className="main"
      onClick={handleMainClick}
      style={{ justifyContent: getMainJustifyContent(position) }}
    >
      <div
        className="column"
        style={{ alignItems: getColumnJustifyContent(position) }}
      >
        <div>
          <p className="text" ref={textRef} onClick={handleMouseClick}>
            Groups:{' '}
            {groups.length < 3 ? groups[0] + ' ' + groups[1] : groups.length}
          </p>
          <div>
            <select onChange={handleChange}>
              <option value="RightTop">Right Top</option>
              <option value="RightCenter">Right Center</option>
              <option value="RightBottom">Right Bottom</option>
              <option value="CentTop">Center Top</option>
              <option value="CentCenter">Center Center</option>
              <option value="CentBottom">Center Bottom</option>
              <option value="LeftTop">Left Top</option>
              <option value="LeftCenter">Left Center</option>
              <option value="LeftBottom">Left Bottom</option>
            </select>
          </div>
        </div>
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
