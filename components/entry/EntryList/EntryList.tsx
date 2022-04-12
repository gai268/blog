
import { useAppSelector } from "../../../stores/hooks";
import { entriesSelector } from "../../../stores/entry/selectors";
import Entry from "../Entry/Entry";

function EntryList(){
    const entries = useAppSelector(entriesSelector);
    return (
        <div>{
            Object.keys(entries).map(key => {
                const entry = entries[key];
                return entry ? <Entry key={key} title={entry.title} createAt={entry.createAt} body={entry.body}/> : null
            })
        }</div>
    );
}
export default EntryList;