import styles from './Landing.module.css';

export default function Landing(){
    return (
        <div className={styles.app}>
            <div className={styles.container}>
                <h1>Countries...</h1>
                <h2>Touch HOME to start touring this fantastic project</h2>
            </div>
        </div>
    )
}