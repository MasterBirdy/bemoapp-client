import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import bemoLogo from "../assets/bemoLogo.png";

const NavBar = () => {
    const scrollRef = useRef();
    const router = useRouter();
    const [mobileMenuOn, setMobileMenuOn] = useState(false);
    const [isFaded, setIsFaded] = useState(false);
    const dummyFunction = () => {
        if (window.scrollY > scrollRef.current.offsetHeight) {
            setIsFaded(true);
        } else {
            setIsFaded(false);
        }
    };

    const clickHandler = () => {
        setMobileMenuOn((prevState) => !prevState);
    };
    useEffect(() => {
        window.addEventListener("scroll", dummyFunction);
        return () => window.removeEventListener("scroll", dummyFunction);
    }, []);

    return (
        <header className={isFaded ? "faded" : ""}>
            <div className="titleLogo" ref={scrollRef}>
                <Link href="/">
                    <img src={bemoLogo} alt="logo" />
                </Link>
            </div>
            <nav className={mobileMenuOn ? "show" : ""}>
                <ul className="navigation">
                    <li>
                        <Link href="/">
                            <a
                                className={
                                    router.pathname == "/" ? "active " : ""
                                }
                            >
                                Main
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/contactus">
                            <a
                                className={
                                    router.pathname == "/contactus"
                                        ? "active "
                                        : ""
                                }
                            >
                                Contact Us
                            </a>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="test" onClick={clickHandler}>
                <div className="mwrap"></div>
            </div>
            <style jsx>{`
                header {
                    position: fixed;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    top: 0;
                    left: 0;
                    z-index: 3000;
                    width: 100%;
                    background-color: #ffffff;
                    transition: background 1s ease;
                    padding: 0 3%;
                }
                .faded {
                    background-color: rgba(255, 255, 255, 0.9);
                }
                .titleLogo {
                    width: 25%;
                }
                img {
                    width: 167px;
                    height: 100px;
                    margin-top: 0.25rem;
                    cursor: pointer;
                }
                ul {
                    display: inline-block;
                }
                li {
                    display: inline-block;
                    list-style: none;
                    padding: 0 21px;
                }
                a {
                    position: relative;
                    font-size: 17px;
                    color: black;
                    text-decoration: none;
                    padding-bottom: 30px;
                    font-family: Arial, sans-serif;
                    letter-spacing: 1px;
                }

                a:hover::after {
                    position: absolute;
                    content: "";
                    width: 100%;
                    bottom: 50%;
                    left: 0;
                    border-bottom: 1px solid #000066;
                }
                .active {
                    color: #000066;
                }
                .active::after {
                    position: absolute;
                    content: "";
                    width: 100%;
                    bottom: 50%;
                    left: 0;
                    border-bottom: 1px solid #000066;
                }

                .mwrap {
                    display: none;
                    content: "";
                    position: absolute;
                    background-color: black;
                    border-radius: 1px;
                    width: 20px;
                    height: 3px;
                }

                .mwrap::before {
                    position: absolute;
                    top: -6px;
                    content: "";
                    background-color: black;
                    border-radius: 1px;
                    width: 20px;
                    height: 3px;
                }

                .mwrap::after {
                    position: absolute;
                    top: 6px;
                    content: "";
                    background-color: black;
                    border-radius: 1px;
                    width: 20px;
                    height: 3px;
                }

                .test {
                    position: absolute;
                    top: 25px;
                    right: 35px;
                    padding: 25px;
                    pointer-events: none;
                }

                @media only screen and (max-width: 960px) {
                    .mwrap {
                        display: block;
                    }

                    header {
                        display: block;
                    }

                    nav {
                        display: none;
                        width: 100%;
                    }

                    nav.show {
                        display: block;
                    }

                    ul {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        padding: 0;
                    }

                    li {
                        padding: 10px 0;
                    }

                    a::after {
                        display: none;
                    }

                    .test {
                        pointer-events: auto;
                        cursor: pointer;
                    }
                }
            `}</style>
        </header>
    );
};

export default NavBar;
