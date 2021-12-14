import React from 'react'
import fetch from 'node-fetch'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Button, Link } from "@chakra-ui/react"
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Input } from "@chakra-ui/react"
import {Heading, Text} from '@chakra-ui/react'
import Script from 'next/script'

export const getServerSideProps = ({params}) => {
  const {slug} = params;
  return {
    props: {
      slug,
    }
  }
}

export default function Slug({slug}) {
  let todo = {
        name: slug,
    };

    fetch('/api/get/', {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
        .then(json => window.location.replace(json.url))

    return (<>
<div className={styles.container}>
      <Head>
        <title>please wait...</title>
        <meta name="description" content="please wait ......" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Heading color="teal">Please wait for ~5 seconds...</Heading>
        <Text fontSize='md'>
           Chill 🧊 <br />
             you&apos;ll be surely redirected if the link entered was correct!
        </Text>
      </main>

      <footer className={styles.footer}>
        <span className={styles.logo}>
          <Link color="teal" href="https://volcareso.js.org/">(c) volcareso</Link>
          <Link color="teal.500" href="https://twitter.com/volcareso">Twitter</Link>
          <Link color="teal.500" href="https://github.com/volcareso">GitHub</Link>
        </span>
      </footer>
    </div>
    </>)
}
