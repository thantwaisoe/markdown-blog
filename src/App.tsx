import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Routes, Route, Navigate } from 'react-router-dom'
import NewNote from './pages/NewNote'
import { useLocalStorage } from './hooks/useLocalStorage';
import { useMemo } from 'react';
import { v4 as uuidV4 } from 'uuid'

export type Note = {
  id: string
} & NoteData

export type NoteData = {
  title: string,
  markdown: string,
  tags: Tag[]
}

export type Tag = {
  id: string,
  label: string
}

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string,
  markdown: string,
  tagsIds: string[]
}

const App = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

  // TODO: Make to understand
  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(t => note.tagsIds.includes(t.id)) }
    })
  }, [notes, tags])

  //For Creating Notes
  const createNotes = ({ tags, ...data }: NoteData) => {
    setNotes(prevNotes => {
      return [...prevNotes,
        {
          ...data,
          id: uuidV4(),
          tagsIds: tags.map(t => t.id)
        }
      ]
    })
  }
  //* Adding new TAGS into LocalStorage
  const onAddTag = (tag: Tag) => {
    setTags(prev => [...prev, tag])
  }
  return (
    <Container className='my-4'>
      <Routes>
        <Route path='/' element={<h1>Home</h1>} />
        <Route path='/new' element={<NewNote onSubmit={createNotes} onAddTag={onAddTag} availableTags={tags} />} />
        <Route path='/:id' >
          <Route index element={<h1>Show</h1>} />
          <Route path='edit' element={<h1>Edit</h1>} />
        </Route>
        {/* Default Route */}
        <Route path='*' element={<Navigate to='/' />} />

      </Routes>
    </Container>
  )
}

export default App
