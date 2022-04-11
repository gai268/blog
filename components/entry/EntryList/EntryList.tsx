import Entry from "../Entry/Entry";

function EntryList(){
    return (
        <div>
            <Entry title="タイトル1" createAt={new Date(2021, 0, 1)} body={null}/>
            <Entry title="タイトル2" createAt={new Date(2021, 0, 1)} body={null}/>
            <Entry title="タイトル3" createAt={new Date(2021, 0, 1)} body={null}/>
        </div>
    );
}
export default EntryList;