import React from 'react';
import PropTypes from 'prop-types';

class App extends React.Component {

  render() {

    return (
      <div>
        <div>template</div>
      </div>
    )
  }
}

App.propTypes = {
  data: PropTypes.array,
  config: PropTypes.object,
}
App.defaultProps = {
  data: [],
  config: {
    width: 600,
    height: 300,
  }
}

export default App;
