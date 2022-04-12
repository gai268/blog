
import { useAppSelector } from "../../../stores/hooks";
import { entriesSelector } from "../../../stores/entry/selectors";
import { EntryItem } from "../EntryItem/EntryItem";

export const EntryList = () => {
    const entries = useAppSelector(entriesSelector);
    return (
        <div>{
            Object.keys(entries).map(key => {
                const entry = entries[key];
                return entry ? <EntryItem key={key} entryKey={key} entry={entry} /> : null
            })
        }</div>
    );
}