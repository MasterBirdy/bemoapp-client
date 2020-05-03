import React, { useState } from "react";

const Form = ({ listedEmail }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [howCanWeHelp, setHowCanWeHelp] = useState("");
    const [submitMessage, setSubmitMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const resetHandler = (e) => {
        if (e) e.preventDefault();
        setName("");
        setEmail("");
        setHowCanWeHelp("");
    };

    const formHandler = (e) => {
        const API_URL = process.env.API_URL || "http://localhost:1337/graphql";
        e.preventDefault();
        if (name !== "" && (email !== "") & (howCanWeHelp !== "")) {
            fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: `mutation {
                    createResponse(input: {
                      data: {
                        email: "${email}",
                        name: "${name}",
                        how_can_we_help: "${howCanWeHelp}"
                      }
                    }) {
                      response {
                        email
                        name
                      }
                    }
                  }`,
                }),
            })
                .then((res) => {
                    if (res.status === 200) {
                        return res.json();
                    } else {
                        throw new Error("Error!");
                    }
                })
                .then((res) => {
                    resetHandler();
                    setIsError(false);
                    setSubmitMessage(
                        "Thanks! Your message was successfully submitted"
                    );
                })
                .catch((err) => {
                    setIsError(true);
                    setSubmitMessage(err.message);
                });
        } else {
            setIsError(true);
            setSubmitMessage("Oops! Make sure you input all values!");
        }
    };

    return (
        <form>
            <label>Name: *</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            ></input>
            <label>E-mail: *</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            ></input>
            <label>How can we help you? *</label>
            <textarea
                value={howCanWeHelp}
                rows="8"
                onChange={(e) => setHowCanWeHelp(e.target.value)}
                required
            ></textarea>
            <div className="buttons">
                <button onClick={resetHandler}>Reset</button>
                <button type="submit" onClick={formHandler} value="submit">
                    Submit
                </button>
            </div>
            <p className={[isError ? "error" : "", "notification"].join(" ")}>
                {submitMessage !== "" && submitMessage}
            </p>
            <p>
                <span className="note">Note:</span> If you are having
                difficulties with our contact us form above, send us an email to{" "}
                {listedEmail} (copy & paste the email address)
            </p>
            <style jsx>{`
                form {
                    text-align: center;
                }
                label {
                    display: block;
                    color: #373737;
                    font-family: arial;
                    letter-spacing: 1px;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    margin-bottom: 0.5rem;
                }

                input,
                textarea {
                    display: inline-block;
                    width: 70%;
                    font: 400 13.3333px Arial;
                    cursor: text;
                    background: #cccccc;
                    color: #333333;
                    border: 0;
                    outline: none;
                    padding: 9px;
                    margin-bottom: 1rem;
                }

                button {
                    margin-right: 1rem;
                    color: #000066;
                    background: #999999;
                    padding: 5px 28px 5px 28px;
                    font-size: 0.7rem;
                    cursor: pointer;
                    transition: all 450ms;
                    border: 0;
                    text-transform: uppercase;
                }
                p {
                    color: #373737;
                    font-size: 15px;
                }
                .note {
                    font-weight: 600;
                    text-decoration: underline;
                }
                .notification {
                    font-weight: 600;
                    font-size: 16px;
                }
                .error {
                    color: red;
                }

                @media only screen and (max-width: 960px) {
                    input,
                    textarea {
                        width: 85%;
                    }
                }
            `}</style>
        </form>
    );
};

export default Form;
