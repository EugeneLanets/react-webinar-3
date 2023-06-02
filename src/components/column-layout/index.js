import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ColumnLayout({ children, side, padding, gap }) {
  const cn = bem('ColumnLayout');
  return (
    <div className={cn({ side, padding, gap })}>
      {React.Children.map(children, (child) => {
        if (child === null) return null;
        return (
          <div key={child.key} className={cn('item')}>
            {child}
          </div>
        );
      })}
    </div>
  );
}

ColumnLayout.propTypes = {
  children: PropTypes.node,
  side: PropTypes.oneOf(['start', 'end', 'between']),
  padding: PropTypes.oneOf(['small', 'medium', 'none']),
  gap: PropTypes.oneOf(['small', 'medium', 'none']),
};

ColumnLayout.defaultProps = {};

export default memo(ColumnLayout);
