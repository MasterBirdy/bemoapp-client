import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebookF } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <footer>
            <div className="content">
                ©2013-2016 BeMo Academic Consulting Inc. All rights reserved.{" "}
                <a href="http://www.cdainterview.com/disclaimer-privacy-policy.html">
                    Disclaimer & Privacy Policy
                </a>{" "}
                <a href="mailto:info@bemoacademicconsulting.com">Contact Us</a>
            </div>
            <div>
                <a
                    href="https://www.facebook.com/bemoacademicconsulting"
                    className="icon"
                >
                    <FontAwesomeIcon
                        icon={faFacebookF}
                        size="sm"
                        style={{ marginRight: "1.5rem" }}
                    ></FontAwesomeIcon>
                </a>
                <a href="https://twitter.com/BeMo_AC" className="icon">
                    <FontAwesomeIcon
                        icon={faTwitter}
                        size="sm"
                    ></FontAwesomeIcon>
                </a>
            </div>
            <style jsx>{`
                footer {
                    background-color: #000066;
                    width: 100%;
                    bottom: 0;
                    left: 0;
                    padding: 2% 5% 2% 5%;
                    display: flex;
                    justify-content: space-between;
                }
                .content {
                    color: white;
                    font-family: "Arial", sans-serif;
                    font-size: 13px;
                }
                a,
                a:active,
                a:visited {
                    color: #ff6600;
                }
                a:hover {
                    color: grey;
                }

                a.icon {
                    color: white;
                    transition: 0.3s color ease;
                }
                a.icon:hover {
                    color: grey;
                }
            `}</style>
        </footer>
    );
};

export default Footer;
