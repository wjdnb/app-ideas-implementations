import { GithubOne } from "@icon-park/react";

function Header() {
  const handleRepo = () => {
    window.open("https://github.com/wjdnb/app-ideas-implementations");
  };

  return (
    <div className="h-14 flex items-center justify-end border-b shadow">
      <div className="mr-10">
        <div className="cursor-pointer">
          <GithubOne
            theme="outline"
            size="22"
            fill="#333"
            onClick={handleRepo}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
