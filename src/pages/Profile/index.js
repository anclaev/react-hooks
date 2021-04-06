import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Repos } from "../../components/Repos";
import { GithubContext } from "../../context/Github";

export const Profile = ({ match }) => {
  const { getUser, getRepos, loading, user, repos } = useContext(GithubContext);
  const urlName = match.params.name;

  useEffect(() => {
    getUser(urlName);
    getRepos(urlName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <p className="text-center">Загрузка...</p>;

  const {
    name,
    company,
    avatar_url,
    location,
    blog,
    bio,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
  } = user;

  return (
    <>
      <Link to="/" className="btn btn-link">
        Назад
      </Link>
      <div className="card mb-4 mt-2">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-4 text-center flex">
              <img
                src={avatar_url}
                alt={name}
                style={{ width: "50%", minWidth: "100px", margin: "10px" }}
              />
              <h1>{name}</h1>
              {location && <p>Местоположение: {location}</p>}
            </div>
            {/* /.col-sm-3 */}
            <div className="col">
              {bio && (
                <>
                  <h3>BIO</h3>
                  <p>{bio}</p>
                </>
              )}
              <a
                href={html_url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-dark github-btn"
              >
                GitHub
              </a>
              <div>
                <ul>
                  {login && (
                    <li>
                      <strong>Логин — </strong> {login}
                    </li>
                  )}
                  {company && (
                    <li>
                      <strong>Компания —</strong> {company}
                    </li>
                  )}
                  {blog && (
                    <li>
                      <strong>Сайт —</strong>{" "}
                      <a
                        href={
                          blog.indexOf("http") !== -1 ? blog : `http://${blog}`
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        {blog}
                      </a>
                    </li>
                  )}
                </ul>
                <div className="badge badge-primary">
                  Подписчики: {followers}
                </div>
                <div className="badge badge-success">Подписан: {following}</div>
                <div className="badge badge-info">
                  Репозитории: {public_repos}
                </div>
                <div className="badge badge-dark">Гисты: {public_gists}</div>
              </div>
            </div>
          </div>
          {/* /.row */}
        </div>
        {/* /.card-body */}
      </div>
      {/* /.card */}
      <Repos repos={repos} />
    </>
  );
};
