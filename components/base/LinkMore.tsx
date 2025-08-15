import React from 'react';
import Link from 'next/link';

import styles from './LinkMore.module.css';

const LinkMore = (href:string,text:string) => (
	<Link className={styles.link} href={href}>{text}</Link>
);

export default LinkMore;
