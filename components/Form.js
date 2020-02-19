import React from "react";
import useInput from "../libs/hooks";

const Form = props => {
  const [comment, setComment] = useInput("");
  const [author, setAuthor] = useInput("");
  const [email, setEmail] = useInput("");


  const handleSubmit = e => {
    e.preventDefault();

    props.db.put({
      _id: new Date().toJSON(),
      comment: comment,
      author: author,
      email: email
    });
  };

  return (
    <article className="media">
      <div className="media-content">
        <div className="box">
          <h2 className="title is-4">Leave a comment</h2>
          <form onSubmit={handleSubmit}>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Name or Alias</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control">
                    <input
                      onChange={setAuthor}
                      value={author}
                      className="input"
                      type="text"
                      placeholder="Steve Jobs"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Email Address</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control">
                    <input
                      onChange={setEmail}
                      value={email}
                      className="input"
                      type="email"
                      placeholder="you@internet.com"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field">
              <p className="control">
                <textarea
                  onChange={setComment}
                  value={comment}
                  className="textarea"
                  placeholder="Add a comment..."
                ></textarea>
              </p>
              <p className="help">Please, be nice :)</p>
            </div>
            <nav className="level">
              <div className="level-left">
                <div className="level-item">
                  <button type="submit" value="submit" className="button is-info">
                    Send yout comment
                  </button>
                </div>
              </div>
              <div className="level-right">
                <div className="level-item">
                  <label className="checkbox">
                    <input type="checkbox" /> Press enter to submit
                  </label>
                </div>
              </div>
            </nav>
          </form>
        </div>
      </div>
    </article>
  );
};
export default Form;
