
import { NoteData, Tag } from '../App'
import NoteForm from '../components/NoteForm'
import { useNote } from './NoteLayout'

type EditNoteProps = {
    onSubmit: (id: string, data: NoteData) => void,
    onAddTag: (tag: Tag) => void,
    availableTags: Tag[]
}

const EditNote = ({ onAddTag, onSubmit, availableTags }: EditNoteProps) => {
    const note = useNote()
    return (
        <div>
            <h1 className='mb-4'>Edit Note</h1>
            <NoteForm title={note.title} markdown={note.markdown} tags={note.tags} onSubmit={data => { onSubmit(note.id, data) }} onAddTag={onAddTag} availableTags={availableTags} />
        </div>
    )
}

export default EditNote
