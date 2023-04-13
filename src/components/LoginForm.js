import {useState} from "react";

const LoginForm = ({handleLogin}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const connect = (event) => {
        event.preventDefault()
        handleLogin({
            username: username,
            password: password
        })

        setUsername('')
        setPassword('')
    }

    return (
    <form className={"form-group"} onSubmit={connect}>
        <h2>Log in to application</h2>
        <div>
            <label htmlFor={"username"} className="form-label">Username:</label>
            <input
                id="username"
                className={"form-control d-inline-block m-2"}
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
            <label htmlFor={"password"} className="form-label">Password:</label>
            <input id="password"
                   className={"form-control d-inline-block m-2"}
                type="password"
                value={password}
                name="Password"
                autoComplete={"on"}
                onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button className={'btn btn-primary m-2'} id="#login-button" type="submit">Login</button>
    </form>
)
};

export default LoginForm