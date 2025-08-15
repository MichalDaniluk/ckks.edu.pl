import React from 'react';
import styles from './HeaderTitle.module.css';

export const HeaderTitle: React.FC<{title:string}> = ({title}) => {
  return (
	<div className={styles.title}>
        <h2>{title}</h2>
      </div>
  );
};
