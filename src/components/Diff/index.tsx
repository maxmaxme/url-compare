import React from 'react';
import cn from 'classnames';
import styles from './index.css';
import { getDiff } from '../../utils/diff';

type Props = {
  url1: string;
  url2: string;
}

export const Diff = ({
  url1,
  url2,
}: Props) => {
  try {
    const diff = getDiff(url1, url2);

    return <table className={styles.table}>
      <tbody>
        {Object.keys(diff).map((key) => {
          const value = diff[key];
          return <tr key={key} className={cn({
            [styles.rowEqual]: value.same === 'equal',
            [styles.rowEmpty]: value.same === 'empty',
            [styles.rowDifferent]: value.same === 'different',
          })}>
            <td>{value.description}</td>
            {value.values.map((v, i) => (
              <td key={`${key}_${i}`}>
                <input className={styles.input} readOnly value={v || ''} />
              </td>
            ))}
          </tr>;
        })}
      </tbody>
    </table>;
  } catch (e: any) {
    return <div>Error: {e.message}</div>;
  }
};
