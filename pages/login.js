import { useState } from "react";
import ls from "local-storage";
import hash from "object-hash";
import Router from "next/router";

export default function Login() {
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const buttonHandler = (e) => {
        e.preventDefault();
        if (hash(password) === "8188739d9c64226d7f5e79ac13a73b9a2880089d") {
            ls.set("password", "8188739d9c64226d7f5e79ac13a73b9a2880089d");
            setMessage("Welcome!");
            Router.push("/");
        } else {
            setMessage("Oops! That's not the correct password!");
        }
    };

    return (
        <div className="root">
            <div className="box">
                <h1>Welcome, please put in a password!</h1>
                <form>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <button
                        type="submit"
                        value="submit"
                        onClick={buttonHandler}
                    >
                        Submit
                    </button>
                    <p>{message}</p>
                </form>
            </div>
            <style global jsx>{`
                html,
                body {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                }

                .root {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 90vh;
                }

                .box {
                    padding: 10px 40px 10px;
                    border: 1px solid grey;
                    border-radius: 5px;
                    box-shadow: 2px 2px 4px 4px;
                    background-color: #e6e6e6;
                    box-shadow: 9px 11px 25px -8px rgba(163, 163, 163, 1);
                }

                h1 {
                    font-size: 1.55rem;
                }

                label {
                    display: block;
                    font-size: 0.9rem;
                    margin-bottom: 0.25rem;
                }

                input {
                    border-radius: 2px;
                    padding: 2px 7px;
                    border: 1px solid #1a1a1a;
                    margin-right: 0.5rem;
                    margin-bottom: 0.5rem;
                }

                button {
                    border: 1px solid #333333;
                    border-radius: 2px;
                    padding: 3px 10px;
                    background-color: #808080;
                    color: white;
                }

                * {
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    );
}
