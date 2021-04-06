import { useContext } from "react";
import { Card } from "../../components/Card";
import { Search } from "../../components/Search";
import { GithubContext } from "../../context/Github";

export const Home = () => {
  const { loading, users } = useContext(GithubContext);
  return (
    <>
      <Search />
      <div className="row">
        {loading ? (
          <p className="text-center">Загрузка...</p>
        ) : (
          users.map((user) => (
            <div className="col-sm-3 mb-4" key={user.id}>
              <Card user={user} />
            </div>
          ))
        )}
      </div>
    </>
  );
};
