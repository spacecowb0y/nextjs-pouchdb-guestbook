import React, { useState, useEffect } from "react";
import Moment from "react-moment";

const Comments = props => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getComments();
  }, [data]);

  const getComments = () => {
    console.log("Getting comments from database...");
    props.db
      .allDocs({
        include_docs: true
      })
      .then(result => {
        setData(result.rows);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <h1 className="title is-1" style={{ padding: "1.5em 0 0" }}>
        Guestbook <span className="has-text-grey">({data.length})</span>
      </h1>
      <p className="subtitle">
        This is a guestbook powered by React, Next.js, PouchDB as a local
        database and CouchDB as a remote dabatase. It means that works online
        and offline 😘.
      </p>

      <hr />

      {data.length ? (
        data.map(el => (
          <article key={el.id} className="media">
            <div className="media-content">
              <div className="content">
                <p>
                  {el.doc.email ? (
                    <a href={`mailto:${el.doc.email}`}><strong>{el.doc.author}</strong></a>
                  ) : (
                    <strong>{el.doc.author}</strong>
                  )}
                  <br />
                  {el.doc.comment}
                  <br />
                  <small className="has-text-grey">
                    <Moment fromNow>{el.id}</Moment>
                  </small>
                </p>
              </div>
            </div>
          </article>
        ))
      ) : (
        <article className="media">
          There are no comments, be the first to leave one!
        </article>
      )}
    </>
  );
};

export default Comments;
