import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Star Wars wikipedia</title>
        <meta name="description" content="a cool star wars wikipedia" />
        <link rel="icon" href="/star-wars.png" />
      </Head>

      <main className={styles.main}>
        <section className={styles.sectionTitle}>
          <img className={styles.yodaImage} src='/baby-yoda.png' />
          <h2 className={styles.title}>
            Films by title, character or planet search you can!
          </h2>
        </section>

        <p className={styles.description}>
          Instructions:
        </p>
      </main>

      <footer className={styles.footer}>
        <p>Made with 💜 by
          <a
            href="https://github.com/KoolTheba"
            target="_blank"
            rel="noopener noreferrer"
          >
          @KoolTheba
          </a>
        </p>
      </footer>
    </div>
  )
}
