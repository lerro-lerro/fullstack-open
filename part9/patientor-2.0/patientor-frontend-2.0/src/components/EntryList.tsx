import { Entry } from "../types/entry";
import { Diagnosis } from "../types/diagnosis";
import EntryDetails from "./EntryDetails";

interface Props {
  entries: Entry[];
  diagnoses: { [code: string]: Diagnosis };
  onDeleteEntry: (entryId: string) => void;
}

const EntryList: React.FC<Props> = ({ entries, diagnoses, onDeleteEntry }) => {
  return (
    <div>
      {entries.map((entry) => (
        <EntryDetails
          key={entry.id}
          entry={entry}
          diagnoses={diagnoses}
          onDelete={() => onDeleteEntry(entry.id)}
        />
      ))}
    </div>
  );
};

export default EntryList;
