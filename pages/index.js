import React from "react";
import PouchDB from "pouchdb";

import Form from "../components/Form";
import Comments from "../components/Comments";

const LOCAL_DB = "guestbook";
const REMOTE_DB = `http://raspberrypi.local:5984/${LOCAL_DB}`;
const REMOTE_DB_HEARTBEAT = "http://raspberrypi.local:5984/_up";

const db = new PouchDB(LOCAL_DB);
const remoteDatabase = new PouchDB(REMOTE_DB);

PouchDB.sync(db, remoteDatabase, {
  live: true,
  heartbeat: false,
  timeout: false,
  retry: true
});

import "../styles/styles.scss";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = { online: true };
    this.heartBeat.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    this.heartBeat();
  }

  heartBeat = () => {
    if (!this.mounted) {
      return;
    }
    const fetchInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      cache: "default"
    };
    const fetchRequest = new Request(REMOTE_DB_HEARTBEAT, fetchInit);

    fetch(fetchRequest)
      .then(result => {
        if (!this.mounted) {
          return;
        }
        if (result.ok && !this.state.online) {
          this.setState({
            online: true
          });
        } else if (!result.ok && this.state.online) {
          this.setState({
            online: false
          });
        }
        setTimeout(this.heartBeat.bind(this), 2000);
      })
      .catch(() => {
        if (!this.mounted) {
          return;
        }
        if (this.state.online) {
          this.setState({
            online: false
          });
        }
        setTimeout(this.heartBeat.bind(this), 2000);
      });
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { online } = this.state;

    return (
      <section className="section has-background-light">
        {!online ? (
          <article className="navbar is-fixed-top message is-warning">
            <div className="message-body">
              The remote database is currently: <b>Offline</b> 🔌. Changes are
              being saved locally and will be pushed to the server when it gets
              online.
            </div>
          </article>
        ) : (
          <article className=" navbar is-fixed-top message is-success">
            <div className="message-body">
              The remote database is: <b>Online</b> 🛰. Changes are being synced.
            </div>
          </article>
        )}

        <div className="container">
          <Comments db={db} />
          <Form db={db} />
        </div>
      </section>
    );
  }
}

export default App;
