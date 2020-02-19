# Guestbook app
Simple React.js application using Next.js, and PouchDB as a local database that syncs to a remote CouchDB. That means that works offline!

## Setup

On the file `pages/index.js` there are three variables related to the databases.

``` js
const LOCAL_DB = "guestbook";
const REMOTE_DB = `http://remote.couchdb.com/${LOCAL_DB}`;
const REMOTE_DB_HEARTBEAT = "http://remote.couchdb.com/_up";
```

## How to run it?

```
npm i -g
npm run dev
```