import React from 'react';
import ReactDOM from 'react-dom';

import Router from 'src/pages';
import 'src/assets/theme/less/index.less';

const wrapper = document.getElementById('container');

ReactDOM.render(<Router />, wrapper);
