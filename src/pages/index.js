import Head from 'next/head'
import Image from 'next/image'

import FilmSearch from '../components/FilmSearch'
import styles from '../styles/Home.module.css'

export default function Home () {
  return (
    <div className={styles.container}>
      <Head>
        <title>Star Wars wikipedia</title>
        <meta name='description' content="a cool star wars wikipedia" />
        <link rel="icon" href="/star-wars.png" />
      </Head>

      <main className={styles.main}>
        <section className={styles.sectionTitle}>
          <h2 className={styles.title}>
            Star Wars films search you can!
          </h2>
        </section>

        <FilmSearch />

        <div className={styles.bb8Image}>
          <Image width='192px' height='144px' src='/bb8.jpeg' alt={'bb8 character'}/>
        </div>
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
