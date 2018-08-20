import React, { Component } from 'react';
import './footer.css';

export default class footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-links">
          <a href="http://shakapps.net">http://shakapps.net</a><br/>
          <a href="http://shakapps.com">http://shakapps.com</a>
        </div>
      </div>
    )
  }
}
