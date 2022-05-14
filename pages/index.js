import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Button, Input, Link, Box } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Script from "next/script";
import { useState } from "react";
import swal from "sweetalert";
import copy from "copy-text-to-clipboard";

export default function Home() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  function registerUser(event) {
    event.preventDefault();
    if (url.trim() === "") return swal("Error!", "Please enter a url", "error");

    fetch("/api/create/", {
      method: "POST",
      body:
        name.trim() === ""
          ? JSON.stringify({ url })
          : JSON.stringify({ name, url }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message == "success") {
          swal(
            "congrats!",
            "link was copied!: https://9x.now.sh/" + json.name,
            "success"
          );
          copy("https://9x.now.sh/" + json.name);
        } else {
          swal("oops!", json.message, "warning");
        }
      });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>ThrowMe- A hassle free url shortner</title>
        <meta
          name="description"
          content="hassle free URL shortener which is totally free and ad free. Made by volcareso with nextjs and postgresql database operated with Prisma."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="google-site-verification"
          content="C6xnU6De7b5pwywkmMyctt0ljMz0CsD9FmbMF2b8oiI"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Throw-Me
          <div style={{ fontSize: "1rem" }}>( it&apos;s a url shortner )</div>
        </h1>
        <p className={styles.description}>
          don&apos;t worry we&apos;ll throw you well.
        </p>
        <form onSubmit={registerUser}>
          <div className={styles.input_cont}>
            <Input
              placeholder="google ( optional )"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              minLength="3"
              maxLength="20"
            />
            <Input
              placeholder="https://google.com/"
              id="url"
              name="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="url"
              required
              maxLength="200"
              minLength="5"
            />
          </div>
          <div className={styles.button_doiIt}>
            <Button
              id="button"
              type="submit"
              colorScheme="teal"
              rightIcon={<ArrowForwardIcon />}
              style={{ margin: "5px" }}
            >
              Do It!
            </Button>
          </div>
        </form>

        <Box boxShadow="xl" p="5" rounded="md">
          <span style={{ color: "#38B2AC" }}>Pro-Tip: </span> bookmark 🔖 this
          page for quick access!
        </Box>
      </main>

      <footer className={styles.footer}>
        <span className={styles.logo}>
          <Link m={3} color="teal.500" href="/about">
            About this site
          </Link>
          <Link m={3} color="teal.500" href="https://atordvairn.js.cool/">
            (c) atordvairn
          </Link>
          <Link m={3} color="teal.500" href="https://twitter.com/atordvairn">
            Twitter
          </Link>
          <Link m={3} color="teal.500" href="https://github.com/atordvairn">
            GitHub
          </Link>
        </span>
      </footer>
    </div>
  );
}
