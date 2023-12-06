export default function Homepage() {
  return (
    <>
      <div id="sidebar">
        <h1>Api Fetching Task Versions</h1>
        <nav>
          <ul>
            <li>
              <a href={`/version1`}>Version 1</a>
            </li>
            <li>
              <a href={`/version2`}>Version 2</a>
            </li>
            <li>
              <a href={`/version3`}>Version 3</a>
            </li>
            <li>
              <a href={`/version4`}>Version 4</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail"></div>
    </>
  );
}
