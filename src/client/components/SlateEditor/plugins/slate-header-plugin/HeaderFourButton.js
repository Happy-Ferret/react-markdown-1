import React from 'react';
import { hasBlock, unwrapBlock, wrapBlock } from './HeaderUtils';
import classnames from 'classnames';

import './HeaderStyles.css';


const HeaderFourButton = ({ state, onChange }) => {
  const type = 'heading4';
  const active = hasBlock(state, type);
  return (
    <button className={classnames({ 'btn btn-default': true, active })}
      onClick={e => onChange(active ? unwrapBlock(state, type) : wrapBlock(state, type))}
    >
      <i className="fa fa-header heading4"/>
    </button>
  );
};

export default HeaderFourButton;
