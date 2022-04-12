import styles from './Highlight.module.css'

/**
 * 文字を蛍光色で装飾するコンポーネント
 */
type Props = {
    children: React.ReactNode;
};

export const Highlight: React.VFC<Props> = (props) =>{
    return (
        <span className={styles.highlight}>
            {props.children}
        </span>
    )
}