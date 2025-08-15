import React from 'react';
import Link from 'next/link';

import styles from './Link.module.css';
import { LinkType } from '@interfaces/Common';

const LinkComponent = ({href, text}:LinkType) => (
	<Link className={styles.link} href={href}>{text}</Link>
);

export default LinkComponent;
