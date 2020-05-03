import React, { useRef } from "react";
import ReactMarkdown from "react-markdown";
import styles from "../css/styles.module.css";

const Page = ({ title, content, image }) => {
    return (
        <div>
            <div className="image-holder">
                <img src={image} alt="image" />
                {title && <div className="title">{title}</div>}
            </div>
            <section>
                <div className={styles.test}>
                    <ReactMarkdown source={content}></ReactMarkdown>
                </div>
            </section>

            <style jsx>{`
                section {
                    padding: 3.5%;
                }
                img {
                    width: 100%;
                    height: auto;
                }

                .image-holder {
                    position: relative;
                }

                .test p {
                    color: red;
                }

                .title {
                    display: block;
                    position: absolute;
                    top: 54%;
                    left: 50%;
                    width: 100%;
                    transform: translate(-50%, -50%);
                    font-size: 46px;
                    color: white;
                    letter-spacing: 10px;
                    text-align: center;
                    white-space: nowrap;
                }
                .title::after {
                    display: block;
                    width: 60%;
                    height: 1px;
                    content: "";
                    border-bottom: 2px solid;
                    border-bottom-color: white;
                    padding-bottom: 6px;
                    margin: 0 auto;
                }

                @media only screen and (max-width: 568px) {
                    .title {
                        font-size: 32px;
                        line-height: 32px;
                        letter-spacing: 2.5px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Page;
