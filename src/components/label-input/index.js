import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import './style.css';
import Input from '../input';

function LabelInput(props) {
  const cn = bem('LabelInput');

  return (
    <div className={cn()}>
      <label htmlFor={props.id}>{props.name}</label>
      <Input
        value={props.value}
        onChange={props.onChange}
        placeholder={props.name}
        delay={1}
        theme={'big'}
        id={props.id}
        type={props.type}
      />
    </div>
  );
}

LabelInput.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  theme: PropTypes.string,
  id: PropTypes.string,
};

LabelInput.defaultProps = {
  onChange: () => {},
  type: 'text',
  theme: '',
  id: 'input',
};

export default memo(LabelInput);
