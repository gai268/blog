import Article from "../Article/Article";

function ArticleList(){
    return (
        <div>
            <Article title="タイトル1" createAt={new Date(2021, 0, 1)} body={null}/>
            <Article title="タイトル2" createAt={new Date(2021, 0, 1)} body={null}/>
            <Article title="タイトル3" createAt={new Date(2021, 0, 1)} body={null}/>
        </div>
    );
}
export default ArticleList;