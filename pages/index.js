import { useEffect } from "react";
import { initGA, logPageView } from "../utils/googleAnalytics";
import ReactPixel from "react-facebook-pixel";
import Head from "next/head";
import Page from "../components/Page";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import hash from "object-hash";
import Router from "next/router";
import ls from "local-storage";

export default function Home({ data }) {
    useEffect(() => {
        if (
            ls.get("password") === null &&
            ls.get("password") !== "8188739d9c64226d7f5e79ac13a73b9a2880089d"
        ) {
            Router.replace("/login");
        }
    });

    useEffect(() => {
        if (data.analytics[0].google_analytics) {
            if (!window.GA_INITIALIZED) {
                initGA(data.analytics[0].google_analytics);
                window.GA_INITIALIZED = true;
            }
            logPageView();
        }
    }, []);

    useEffect(() => {
        if (data.analytics[0].facebook_analytics) {
            ReactPixel.init(data.analytics[0].facebook_analytics);
            ReactPixel.pageView();
        }
    });

    if (
        ls.get("password") === null &&
        ls.get("password") !== "8188739d9c64226d7f5e79ac13a73b9a2880089d"
    ) {
        return (
            <div>
                <h1>Redirecting...</h1>
            </div>
        );
    }

    return (
        <div className="container">
            <Head>
                <title>{data.homes[0].title}</title>
                {data.homes[0].meta_title && (
                    <meta
                        name="title"
                        content={data.homes[0].meta_title}
                    ></meta>
                )}
                {data.homes[0].meta_description && (
                    <meta
                        name="description"
                        content={data.homes[0].meta_description}
                    ></meta>
                )}
                {data.homes[0].no_index_enabled && (
                    <meta name="robots" content="noindex"></meta>
                )}
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <NavBar></NavBar>
                <Page
                    title={data.homes[0].title}
                    content={data.homes[0].content}
                    image={data.homes[0].image.url}
                ></Page>
                <Footer></Footer>
            </main>

            <style global jsx>{`
                html,
                body {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                }

                * {
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    );
}

export async function getServerSideProps(context) {
    const API_URL = process.env.API_URL || "http://localhost:1337/graphql";
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `{
                homes 
                {
                  id,
                  title,
                  meta_title,
                  meta_description,
                  no_index_enabled,
                  content,
                  image {
                  url
                  }
                },
                analytics {
                  id,
                  google_analytics,
                  facebook_analytics
                  }
              }`,
        }),
    });

    const json = await res.json();
    if (json.errors) {
        console.error(json.errors);
        throw new Error("Failed");
    }

    return {
        props: {
            data: json.data,
        }, // will be passed to the page component as props
    };
}
