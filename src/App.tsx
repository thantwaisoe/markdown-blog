import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { Routes, Route, Navigate } from 'react-router-dom'
import NewNote from './pages/NewNote'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useMemo } from 'react'
import { v4 as uuidV4 } from 'uuid'
import NoteList from './pages/NoteList'
import NoteLayout from './pages/NoteLayout'
import NoteDetail from './components/NoteDetail'
import EditNote from './pages/EditNote'

export type Note = {
  id: string
} & NoteData

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagsIds: string[]
}

const App = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((t) => note.tagsIds.includes(t.id)),
      }
    })
  }, [notes, tags])

  //For Creating Notes
  const createNotes = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        {
          ...data,
          id: uuidV4(),
          tagsIds: tags.map((t) => t.id),
        },
      ]
    })
  }
  //* Adding new TAGS into LocalStorage
  const onAddTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag])
  }
  const updateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            ...data,
            tagsIds: tags.map((t) => t.id),
          }
        } else {
          return note
        }
      })
    })
  }
  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <NoteList
              notes={notesWithTags}
              availableTags={tags}
              setTags={setTags}
            />
          }
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={createNotes}
              onAddTag={onAddTag}
              availableTags={tags}
            />
          }
        />
        <Route
          path="/:id"
          element={<NoteLayout notes={notesWithTags} />}
        >
          <Route index element={<NoteDetail setNotes={setNotes} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={updateNote}
                onAddTag={onAddTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        {/* Default Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App
