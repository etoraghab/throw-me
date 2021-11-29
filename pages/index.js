import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Button, Input, Link, Box } from "@chakra-ui/react"
import { ArrowForwardIcon } from '@chakra-ui/icons'
import Script from 'next/script'
import React from 'react'
import swal from 'sweetalert'
import copy from 'copy-text-to-clipboard'

export default function Home() {
  function registerUser(event){
    event.preventDefault() // don't redirect the page

   let todo = {
        name: event.target.name.value,
        url: event.target.url.value
    };

    fetch('/api/create/', {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
        .then(json => {
          if(json.message == "success"){
            swal("congrats!", "link was copied!: https://qop.now.sh/to?q="+event.target.name.value, "success")
            copy('https://qop.now.sh/to?q='+event.target.name.value);
          }else{
            swal("oops!", json.message, "warning")
          }
        })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>ThrowMe- A hassle free url shortner</title>
        <meta name="description" content="hassle free URL shortener which is totally free and ad free. Made by volcareso with nextjs and postgresql database operated with Prisma." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="google-site-verification" content="C6xnU6De7b5pwywkmMyctt0ljMz0CsD9FmbMF2b8oiI" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Throw-Me
          <div style={{ fontSize: '1rem' }}>
            ( it&apos;s a url shortner )
          </div>
        </h1>
        <p className={styles.description}>
          don&apos;t worry we&apos;ll throw you well.
        </p>
        <form onSubmit={registerUser}>
          
        <div className={styles.input_cont}>
          <Input placeholder="google" required id="name" name="name" type="text" minlength="3" maxlength="20" />
          <Input placeholder="https://google.com/" id="url" name="url" type="url" required maxlength="200" minlength="5"/>
        </div>
        <div className={styles.button_doiIt}>
          <Button id="button" type="submit" colorScheme="teal" rightIcon={<ArrowForwardIcon />} style={{ margin: "5px" }}>
            Do It!
          </Button>
        </div>

        </form>
        <Box boxShadow='md' p='6' rounded='md' bg='white'>
         <div style={{ fontSize: '1rem' }}>
           <span style={{ color: "#38B2AC" }}>Pro-Tip: </span> bookmark 🔖 this page for quick access!
        </div>
        </Box>
      </main>

      <footer className={styles.footer}>
        <span className={styles.logo}>
          <Link color="teal" href="https://volcareso.js.org/">(c) volcareso</Link>
          <Link color="teal.500" href="https://twitter.com/volcareso">Twitter</Link>
          <Link color="teal.500" href="https://github.com/volcareso">GitHub</Link>
        </span>
      </footer>
    </div>
  )
}
