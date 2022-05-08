import React, { useState } from 'react';
import { Diff } from '../Diff';
import styles from './index.css';

export const App = () => {
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');

  return (
    <div>
      <input className={styles.input} type="url" value={url1} onChange={({ target: { value } }) => setUrl1(value)} />
      <input className={styles.input} type="url" value={url2} onChange={({ target: { value } }) => setUrl2(value)} />
      <Diff url1={url1} url2={url2} />
    </div>
  );
};
